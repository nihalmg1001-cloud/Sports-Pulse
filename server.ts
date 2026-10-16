import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_PROMPT = `You are the AI Sports Concierge for "Sports Pulse", Bengaluru's premier sports discovery and court booking platform.
Your personality is friendly, energetic, knowledgeable, and distinctly local to Bengaluru.
You can handle casual talk, greetings, banter, and sports questions naturally.

When relevant to sports, courts, booking, coaching, localities, or prices, actively recommend matching venues from this verified Bengaluru database:
- Velocity Sports Arena (ID: "pulse-arena-yelahanka"): Yelahanka, North Bengaluru. Sports: Badminton, Pickleball. 8 BWF-approved synthetic courts with glare-free LED lighting. Price: ₹450/hr.
- Apex Sky Turf & Arena (ID: "rooftop-turf-indiranagar"): Indiranagar, East Bengaluru. Sports: Football, Cricket. Rooftop 5-a-side FIFA Quality Pro 50mm turf with city views. Price: ₹1,100/hr (approx ₹110/person for 10 players).
- Grand Slam Tennis Club (ID: "grand-slam-tennis-koramangala"): Koramangala, South Bengaluru. Sports: Tennis, Pickleball. 4 US Open DecoTurf acrylic hard courts with automated ball machines. Price: ₹750/hr.
- BlueZone Aquatics Center (ID: "olympic-aquatics-sahakar-nagar"): Sahakar Nagar, North Bengaluru. Sports: Swimming. Heated semi-Olympic 25m ozone-purified pool (chlorine-free). Price: ₹300/hr.
- Strikers Box Cricket & Nets (ID: "whitefield-cricket-hub"): Whitefield, East Bengaluru. Sports: Cricket, Football. High-speed automated bowling machines, heavy-density astroturf pitch. Price: ₹800/hr.
- Pulse Pickleball & Padel Hub (ID: "hsr-pickleball-sanctuary"): HSR Layout, South-East Bengaluru. Sports: Pickleball, Badminton. 6 tournament-regulation cushioned polymer tile courts. Price: ₹550/hr.
- Jayanagar Elite Badminton Club (ID: "jayanagar-smash-badminton"): Jayanagar, South Bengaluru. Sports: Badminton. 6-court teak wood sprung flooring. Price: ₹400/hr.
- Sankey Multi-Sport Arena (ID: "malleshwaram-hoops-basketball"): Malleshwaram, West Bengaluru. Sports: Basketball, Badminton, Tennis. FIBA certified maple hardwood surface near Sankey Tank. Price: ₹600/hr.

Instructions:
1. Speak naturally and warmly. If user sends casual greetings ("hi", "hey", "how are you"), reply warmly and casually.
2. When mentioning or recommending venues, give helpful context like neighborhood tips (e.g. traffic near Silk Board or Outer Ring Road, morning vs evening slots) and pricing in INR (₹).
3. If recommending venues, return structured JSON:
   - "reply": your conversational answer string
   - "recommendedVenueIds": an array of matching venue IDs (e.g. ["pulse-arena-yelahanka"]) that are relevant to recommend. If no specific venues are recommended (e.g. for casual greetings or general chit-chat), return an empty array [].`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set in environment.');
      res.json({
        reply: `Namaskara! I'm here to help you find and book the best courts and academies across Bengaluru. Let me know what sport or locality you are interested in!`,
        recommendedVenueIds: ['pulse-arena-yelahanka', 'rooftop-turf-indiranagar'],
      });
      return;
    }

    // Build contents with optional chat history
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const turn of history.slice(-6)) {
        if (turn.role && turn.text) {
          contents.push({
            role: turn.role === 'ai' ? 'model' : 'user',
            parts: [{ text: turn.text }],
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    let outputText = '';
    
    // Attempt with primary model, retry once on transient failure
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: {
                type: Type.STRING,
                description: 'The natural conversational response to the user',
              },
              recommendedVenueIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'IDs of recommended venues from the database, if any',
              },
            },
            required: ['reply', 'recommendedVenueIds'],
          },
        },
      });
      outputText = response.text || '';
    } catch (primaryErr: any) {
      console.warn('Primary Gemini call error, retrying:', primaryErr?.message || primaryErr);
      try {
        const retryResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                reply: {
                  type: Type.STRING,
                  description: 'The natural conversational response to the user',
                },
                recommendedVenueIds: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'IDs of recommended venues from the database, if any',
                },
              },
              required: ['reply', 'recommendedVenueIds'],
            },
          },
        });
        outputText = retryResponse.text || '';
      } catch (retryErr: any) {
        console.error('Gemini retry also encountered error:', retryErr?.message || retryErr);
      }
    }

    if (outputText) {
      try {
        const parsed = JSON.parse(outputText);
        res.json({
          reply: parsed.reply || outputText,
          recommendedVenueIds: Array.isArray(parsed.recommendedVenueIds) ? parsed.recommendedVenueIds : [],
        });
        return;
      } catch (parseErr) {
        res.json({
          reply: outputText,
          recommendedVenueIds: [],
        });
        return;
      }
    }

    // Graceful contextual fallback if model is temporarily unavailable due to demand
    const lower = message.toLowerCase();
    let reply = "Namaskara! I'm your Sports Pulse concierge. I can help with court reservations, turf availability, coaching academies, or match rates around Bengaluru.";
    let fallbackVenues: string[] = [];

    if (lower.includes('badminton') || lower.includes('shuttle')) {
      reply = "For badminton, Velocity Sports Arena in Yelahanka has 8 BWF synthetic courts at ₹450/hr, and Jayanagar Elite Badminton Club features 6 sprung teak wood courts at ₹400/hr.";
      fallbackVenues = ['pulse-arena-yelahanka', 'jayanagar-smash-badminton'];
    } else if (lower.includes('football') || lower.includes('turf') || lower.includes('soccer')) {
      reply = "Looking for football? Apex Sky Turf in Indiranagar is a 5-a-side rooftop turf with LED floodlights (₹1,100/hr, ~₹110/person for 10 players).";
      fallbackVenues = ['rooftop-turf-indiranagar'];
    } else if (lower.includes('tennis')) {
      reply = "Grand Slam Tennis Club in Koramangala features 4 US Open DecoTurf acrylic courts with ball machines (₹750/hr).";
      fallbackVenues = ['grand-slam-tennis-koramangala'];
    } else if (lower.includes('pickleball')) {
      reply = "Pulse Pickleball Hub in HSR Layout has 6 tournament regulation polymer deck courts at ₹550/hr.";
      fallbackVenues = ['hsr-pickleball-sanctuary'];
    } else if (lower.includes('swim') || lower.includes('pool')) {
      reply = "BlueZone Aquatics Center in Sahakar Nagar features a heated semi-Olympic ozone pool at ₹300/hr.";
      fallbackVenues = ['olympic-aquatics-sahakar-nagar'];
    } else if (lower.includes('yelahanka')) {
      reply = "In Yelahanka, Velocity Sports Arena offers premier BWF badminton and pickleball courts from ₹450/hr.";
      fallbackVenues = ['pulse-arena-yelahanka'];
    } else if (lower.includes('indiranagar')) {
      reply = "In Indiranagar, Apex Sky Turf offers a rooftop 5-a-side football turf overlooking 100ft road.";
      fallbackVenues = ['rooftop-turf-indiranagar'];
    }

    res.json({
      reply,
      recommendedVenueIds: fallbackVenues,
    });
  } catch (error: any) {
    console.error('Error generating response from Gemini:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error?.message || 'Unknown error',
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
