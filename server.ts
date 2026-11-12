import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '2mb' }));

const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      timeout: 20000,
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const is429QuotaError = (err: any): boolean => {
  if (!err) return false;
  const status = err?.status || err?.statusCode || err?.code;
  if (status === 429 || status === '429') return true;
  const msg = String(err?.message || err || '').toLowerCase();
  return (
    msg.includes('429') ||
    msg.includes('quota') ||
    msg.includes('resource has been exhausted') ||
    msg.includes('resource_exhausted') ||
    msg.includes('rate limit') ||
    msg.includes('too many requests')
  );
};

const isTransientCapacityError = (err: any): boolean => {
  if (!err) return false;
  const status = err?.status || err?.statusCode || err?.code;
  if (status === 503 || status === '503' || status === 504 || status === '504') return true;
  const msg = String(err?.message || err || '').toLowerCase();
  return (
    msg.includes('503') ||
    msg.includes('504') ||
    msg.includes('unavailable') ||
    msg.includes('overloaded') ||
    msg.includes('capacity') ||
    msg.includes('high demand') ||
    msg.includes('timeout') ||
    msg.includes('deadline_exceeded') ||
    msg.includes('deadline expired') ||
    msg.includes('failed to fetch')
  );
};

const SYSTEM_PROMPT = `You are Pulse AI, an unrestricted, intelligent, and friendly general-purpose AI assistant built into the Sports Pulse platform in Bengaluru.

Core Capabilities — Answer Anything:
- You have NO topic restrictions and NO word-count or length limits. Answer ANY kind of question across any domain thoroughly, accurately, and naturally.
- Handle everything from software engineering, debugging, code generation, math, science, history, philosophy, writing, recipes, study guides, finance, travel planning, and creative brainstorming to fitness, nutrition, casual conversation, and Bengaluru local life.
- Never decline non-sports questions and never awkwardly force sports references into unrelated topics. Address the user's actual question directly and completely.
- Adapt response length to fit the question: crisp and direct for quick questions; comprehensive, well-structured, and detailed for complex tutorials, explanations, itineraries, code examples, or analyses.
- Use clean Markdown formatting (headings, bullet lists, numbered steps, bold emphasis, inline code, and fenced code blocks with language tags) whenever helpful for readability.

Persona & Tone:
- Polished, warm, witty, and approachable with subtle modern Bengaluru energy when greeting or chatting casually.
- Strictly avoid rural/halli colloquialisms and never use street slang like "macha", "da", or "guru".

Optional Bengaluru Sports Venue Context (Use ONLY when the user asks about sports venues, courts, turfs, pools, or places to play in Bengaluru):
- Velocity Sports Arena (ID: "pulse-arena-yelahanka"): Yelahanka, North Bengaluru. Badminton, Pickleball. 8 BWF-approved synthetic courts with glare-free LED lighting. ₹450/hr.
- Apex Sky Turf & Arena (ID: "rooftop-turf-indiranagar"): Indiranagar, East Bengaluru. Football, Cricket. Rooftop 5-a-side FIFA Quality Pro 50mm turf. ₹1,100/hr (~₹110/person for 10 players).
- Grand Slam Tennis Club (ID: "grand-slam-tennis-koramangala"): Koramangala, South Bengaluru. Tennis, Pickleball. 4 US Open DecoTurf acrylic hard courts with ball machines. ₹750/hr.
- BlueZone Aquatics Center (ID: "olympic-aquatics-sahakar-nagar"): Sahakar Nagar, North Bengaluru. Swimming. Heated semi-Olympic 25m chlorine-free ozone pool. ₹300/hr.
- Strikers Box Cricket & Nets (ID: "whitefield-cricket-hub"): Whitefield, East Bengaluru. Cricket, Football. High-speed automated bowling machines, astroturf pitch. ₹800/hr.
- Pulse Pickleball & Padel Hub (ID: "hsr-pickleball-sanctuary"): HSR Layout, South-East Bengaluru. Pickleball, Badminton. 6 tournament-regulation cushioned courts. ₹550/hr.
- Jayanagar Elite Badminton Club (ID: "jayanagar-smash-badminton"): Jayanagar, South Bengaluru. Badminton. 6 teak wood sprung flooring courts. ₹400/hr.
- Sankey Multi-Sport Arena (ID: "malleshwaram-hoops-basketball"): Malleshwaram, West Bengaluru. Basketball, Badminton, Tennis. FIBA certified maple hardwood court near Sankey Tank. ₹600/hr.

Output Format:
Always return a structured JSON object with:
- "reply": your complete, well-formatted Markdown answer (any length needed to answer thoroughly).
- "recommendedVenueIds": matching venue IDs ONLY when the user is asking about sports venues, courts, bookings, or places to play in Bengaluru; otherwise strictly return [].`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    reply: {
      type: Type.STRING,
      description: 'Complete, unrestricted Markdown answer to the user query',
    },
    recommendedVenueIds: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Matching Bengaluru venue IDs ONLY when the query relates to finding or booking local sports venues; otherwise empty array []',
    },
  },
  required: ['reply', 'recommendedVenueIds'],
};

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Message is required.' });
      return;
    }

    const ai = getAiClient();
    if (!ai) {
      res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please add your Gemini API key in Settings > Secrets.',
      });
      return;
    }

    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const turn of history) {
        if (turn && typeof turn.text === 'string' && turn.text.trim()) {
          contents.push({
            role: turn.role === 'ai' || turn.role === 'model' ? 'model' : 'user',
            parts: [{ text: turn.text }],
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    const callModel = (model: string) => {
      const config: Record<string, any> = {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
      };
      if (model === 'gemini-3.8-flash') {
        config.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
      }
      return ai.models.generateContent({
        model,
        contents,
        config,
      });
    };

    let response: any = null;
    let lastError: any = null;

    // Try primary model gemini-3.8-flash with backoff retry on 429
    try {
      response = await callModel('gemini-3.8-flash');
      lastError = null;
    } catch (primaryErr: any) {
      lastError = primaryErr;
      if (is429QuotaError(primaryErr)) {
        console.warn('[Pulse AI] 429 Quota Exceeded on gemini-3.8-flash. Waiting 2000ms before retry...');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
          response = await callModel('gemini-3.8-flash');
          lastError = null;
        } catch (retryErr: any) {
          lastError = retryErr;
        }
      }
    }

    // Fallback to fast text models if primary encounters 429, transient timeout/503/504, or 404
    if (!response && lastError) {
      const errStatus = lastError?.status || lastError?.statusCode || lastError?.code;
      const errMsg = String(lastError?.message || '').toLowerCase();
      const shouldFallback =
        is429QuotaError(lastError) ||
        isTransientCapacityError(lastError) ||
        errStatus === 404 ||
        errMsg.includes('not found');

      if (shouldFallback) {
        for (const fallbackModel of ['gemini-3.1-flash-lite', 'gemini-flash-latest']) {
          try {
            console.warn(`[Pulse AI] Switching to fallback model ${fallbackModel}...`);
            response = await callModel(fallbackModel);
            lastError = null;
            break;
          } catch (fallbackErr: any) {
            lastError = fallbackErr;
          }
        }
      }
    }

    if (!response && lastError) {
      console.error('[Pulse AI] Gemini API error:', {
        message: lastError?.message,
        status: lastError?.status || lastError?.statusCode || lastError?.code,
      });

      if (is429QuotaError(lastError) || isTransientCapacityError(lastError)) {
        res.status(is429QuotaError(lastError) ? 429 : 503).json({
          isQuotaError: true,
          error: 'Pulse AI is currently handling heavy traffic. Please wait a moment and try again!',
        });
        return;
      }

      let cleanMessage = lastError?.message || 'Failed to generate AI response.';
      if (typeof cleanMessage === 'string' && cleanMessage.trim().startsWith('{')) {
        try {
          const parsedErr = JSON.parse(cleanMessage);
          cleanMessage = parsedErr?.error?.message || parsedErr?.message || cleanMessage;
        } catch {
          // Keep original string if not valid JSON
        }
      }

      const status = Number(lastError?.status || lastError?.statusCode) || 500;
      const safeStatus = status >= 400 && status < 600 ? status : 500;
      res.status(safeStatus).json({
        error: cleanMessage,
      });
      return;
    }

    const rawText = response?.text || '';
    try {
      const parsed = JSON.parse(rawText);
      res.json({
        reply: parsed.reply || rawText,
        recommendedVenueIds: Array.isArray(parsed.recommendedVenueIds) ? parsed.recommendedVenueIds : [],
      });
    } catch {
      const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      res.json({
        reply: cleaned || rawText,
        recommendedVenueIds: [],
      });
    }
  } catch (error: any) {
    console.error('[Pulse AI] Unexpected server error:', error);
    res.status(500).json({
      error: error?.message || 'Unexpected error while processing your request.',
    });
  }
});

// Setup Vite middlewares for dev or static files for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { 
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sports Pulse server listening on http://0.0.0.0:${PORT}`);
});
