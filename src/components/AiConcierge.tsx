import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MapPin, 
  AlertCircle,
  CalendarCheck,
  ExternalLink
} from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import { VENUES_DATA, Venue } from '../data/sportsData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedVenues?: Venue[];
  isError?: boolean;
  timestamp: string;
}

interface AiConciergeProps {
  onSelectVenue?: (venue: Venue) => void;
  onBookCourt?: (venue: Venue) => void;
}

// Client-side initialization using VITE_GEMINI_API_KEY
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Helper to detect 503 Service Unavailable / capacity errors
const is503CapacityError = (err: any): boolean => {
  if (!err) return false;
  const status = err?.status || err?.statusCode || err?.code;
  if (status === 503 || status === '503') return true;
  const msg = String(err?.message || err || '').toLowerCase();
  return (
    msg.includes('503') ||
    msg.includes('unavailable') ||
    msg.includes('overloaded') ||
    msg.includes('capacity') ||
    msg.includes('high demand') ||
    msg.includes('resource exhausted') ||
    msg.includes('temporarily unavailable')
  );
};

const SYSTEM_INSTRUCTION = `You are Sports Pulse AI, a quick Bengaluru sports concierge. Provide helpful, snappy answers strictly under 200 words.

Persona & Tone:
Friendly, energetic, distinctly local to Bengaluru. Keep answers snappy, clear, and strictly under 200 words.

Web Data Context (Verified Bengaluru Sports Venues & Academies):
1. Velocity Sports Arena (ID: "pulse-arena-yelahanka"): Yelahanka, North BLR. Badminton, Pickleball. 8 synthetic courts. ₹450/hr.
2. Apex Sky Turf & Arena (ID: "rooftop-turf-indiranagar"): Indiranagar, East BLR. Football, Cricket. 5-a-side rooftop turf. ₹1,100/hr (~₹110/player).
3. Grand Slam Tennis Club (ID: "grand-slam-tennis-koramangala"): Koramangala, South BLR. Tennis, Pickleball. 4 DecoTurf courts. ₹750/hr.
4. BlueZone Aquatics Center (ID: "olympic-aquatics-sahakar-nagar"): Sahakar Nagar, North BLR. Heated semi-Olympic ozone pool. ₹300/hr.
5. Strikers Box Cricket & Nets (ID: "whitefield-cricket-hub"): Whitefield, East BLR. Automated bowling machines, turf pitch. ₹800/hr.
6. Pulse Pickleball & Padel Hub (ID: "hsr-pickleball-sanctuary"): HSR Layout, South BLR. 6 tournament courts. ₹550/hr.
7. Jayanagar Elite Badminton Club (ID: "jayanagar-smash-badminton"): Jayanagar, South BLR. 6 teak wood courts. ₹400/hr.
8. Sankey Multi-Sport Arena (ID: "malleshwaram-hoops-basketball"): Malleshwaram, West BLR. FIBA maple hardwood basketball. ₹600/hr.

Reasoning:
- Interpret indirect sports queries naturally (e.g. "hitting a green ball" = Tennis, "small rooftop nets" = 5v5 Football, "swimming without chlorine" = BlueZone ozone pool).
- Match sports to fitness goals or recovery.

Output Format:
Always return a structured JSON object containing:
- "reply": helpful, snappy conversational answer strictly under 200 words.
- "recommendedVenueIds": an array of matching venue IDs (e.g. ["pulse-arena-yelahanka"]) or [] if none.`;

export const AiConcierge: React.FC<AiConciergeProps> = ({
  onBookCourt
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [keyMissingError, setKeyMissingError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "Namaskara! I'm Sports Pulse AI, your intelligent Bengaluru sports concierge 🏸. Ask me anything about courts, turfs, pricing, sports recommendations for your fitness level, or indirect sports questions!",
      timestamp: 'Just now'
    }
  ]);

  const quickPrompts = [
    'Best badminton courts near Sahakar Nagar',
    'Where can I hit a green ball with a racket?',
    'Rooftop 5v5 football turf tonight with prices',
    'Low-impact sport recommendation for knee recovery',
    'How do court rates work around Indiranagar?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (!apiKey) {
        setKeyMissingError(true);
      }
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMessageId = 'user-' + Date.now();
    const newMsg: Message = {
      id: userMessageId,
      sender: 'user',
      text: query,
      timestamp: 'Now'
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // If API key is missing, display clear inline alert directly
    if (!apiKey) {
      setKeyMissingError(true);
      const missingKeyMsg: Message = {
        id: 'error-' + Date.now(),
        sender: 'ai',
        text: 'Missing VITE_GEMINI_API_KEY: Please set VITE_GEMINI_API_KEY in your environment variables (e.g. in Vercel Project Settings > Environment Variables) to enable live Gemini AI chat.',
        isError: true,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, missingKeyMsg]);
      setIsTyping(false);
      return;
    }

    try {
      // Initialize Gemini directly in client passing import.meta.env.VITE_GEMINI_API_KEY
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

      // Build conversation contents including previous messages for multi-turn context
      const contents = [
        ...messages.slice(-8).map((m) => ({
          role: m.sender === 'ai' ? 'model' : 'user',
          parts: [{ text: m.text }]
        })),
        {
          role: 'user',
          parts: [{ text: query }]
        }
      ];

      // Call Gemini 1.5 Flash strictly with temperature: 0.7 and maxOutputTokens: 300
      const generateModelResponse = () =>
        ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            maxOutputTokens: 300,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                reply: {
                  type: Type.STRING,
                  description: 'Snappy response strictly under 200 words'
                },
                recommendedVenueIds: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Exact venue IDs matching the user query from the database'
                }
              },
              required: ['reply', 'recommendedVenueIds']
            }
          }
        });

      // Silent auto-retry loop for 503 capacity errors (retries in background)
      let response: any = null;
      const MAX_RETRIES = 2;
      let attempt = 0;

      while (attempt <= MAX_RETRIES) {
        try {
          response = await generateModelResponse();
          break;
        } catch (callErr: any) {
          if (is503CapacityError(callErr) && attempt < MAX_RETRIES) {
            attempt++;
            const backoffMs = attempt * 1000;
            console.warn(`[Sports Pulse AI] 503 capacity detected (attempt ${attempt}/${MAX_RETRIES}). Retrying silently in ${backoffMs}ms...`);
            await new Promise((resolve) => setTimeout(resolve, backoffMs));
            continue;
          }

          // Log and propagate error to main error-handling block
          throw callErr;
        }
      }

      const rawText = response?.text || '';
      let replyText = '';
      let recommendedIds: string[] = [];

      try {
        const parsed = JSON.parse(rawText);
        replyText = parsed.reply || rawText;
        recommendedIds = Array.isArray(parsed.recommendedVenueIds) ? parsed.recommendedVenueIds : [];
      } catch {
        // Gracefully clean up any raw output instead of throwing JSON errors
        const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        replyText = cleaned || "Here are some top sports venues across Bengaluru matching your search!";
      }

      // Map matching venue IDs to actual venue items
      const matchedVenues: Venue[] = recommendedIds
        .map((id: string) => VENUES_DATA.find((v) => v.id === id))
        .filter((v: Venue | undefined): v is Venue => Boolean(v));

      const aiMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: replyText || "I'm here to help you discover and book Bengaluru's finest courts!",
        recommendedVenues: matchedVenues.length > 0 ? matchedVenues : undefined,
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      // Log the exact error to the console for thorough debugging
      console.error('[AiConcierge] Gemini API Exception / Quota Error Details:', {
        message: err?.message,
        status: err?.status || err?.statusCode || err?.code,
        name: err?.name,
        error: err?.error || err,
        stack: err?.stack,
      });

      const status = err?.status || err?.statusCode || err?.code;
      const errorMsgText = String(err?.message || '');
      const isQuotaError =
        status === 429 ||
        errorMsgText.includes('429') ||
        errorMsgText.toLowerCase().includes('quota') ||
        errorMsgText.toLowerCase().includes('resource has been exhausted') ||
        errorMsgText.toLowerCase().includes('rate limit');

      let userFacingText = '';
      if (isQuotaError) {
        userFacingText = `⚠️ Gemini API Quota Limit (429): Your Gemini API quota has been temporarily exhausted. Please verify your quota in Google AI Studio or try again shortly. (Full error logged to browser console)`;
      } else {
        userFacingText = `⚠️ Gemini API Error: ${errorMsgText || 'Failed to complete AI request'}. (Full error logged to browser console for debugging)`;
      }

      const debugErrorMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: userFacingText,
        isError: true,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, debugErrorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-extrabold shadow-xl shadow-blue-500/25 hover:scale-105 transition-all cursor-pointer border border-white/30"
          aria-label="Ask Sports Pulse AI Concierge"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-400 rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-400 rounded-full" />
          </div>
          <span className="text-xs sm:text-sm font-extrabold tracking-tight">
            Ask Sports Pulse AI 🤖
          </span>
        </button>
      </div>

      {/* Chat Modal Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[580px] h-[540px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  Sports Pulse AI
                  <span className="text-[10px] font-bold text-orange-200 bg-white/20 px-1.5 py-0.5 rounded-full">Gemini</span>
                </h3>
                <p className="text-[11px] text-blue-100">Intelligent Bengaluru Sports & Fitness Concierge</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Missing Key Inline Warning Banner */}
          {keyMissingError && (
            <div className="p-3 bg-amber-50 border-b border-amber-200 flex items-start gap-2.5 text-xs text-amber-900 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="font-bold text-amber-950">VITE_GEMINI_API_KEY is not set</div>
                <div className="text-[11px] text-amber-800 leading-snug">
                  To enable Gemini AI responses, please set <span className="font-mono font-bold bg-amber-100 px-1 py-0.5 rounded">VITE_GEMINI_API_KEY</span> in Vercel (Project Settings &gt; Environment Variables).
                </div>
              </div>
            </div>
          )}

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 whitespace-nowrap transition-colors font-medium shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed ${
                    msg.isError
                      ? 'bg-rose-50 text-rose-900 border border-rose-200 rounded-tl-none shadow-xs'
                      : msg.sender === 'user'
                      ? 'bg-blue-600 text-white font-medium rounded-tr-none shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-xs'
                  }`}
                >
                  {msg.isError && (
                    <div className="flex items-center gap-1.5 font-bold text-rose-700 mb-1 text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>Configuration Alert</span>
                    </div>
                  )}

                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Render Recommended Venue Mini-Cards */}
                  {msg.recommendedVenues && msg.recommendedVenues.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Recommended Venues
                      </div>
                      {msg.recommendedVenues.map((v) => (
                        <div
                          key={v.id}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 transition-colors flex items-center justify-between gap-2 text-slate-900"
                        >
                          <div className="truncate">
                            <div className="font-bold text-slate-900 truncate">{v.name}</div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                              <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                              <span>{v.locality} · ₹{v.pricePerHour}/hr</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setIsOpen(false);
                              onBookCourt?.(v);
                            }}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shrink-0 shadow-2xs flex items-center gap-1"
                          >
                            <CalendarCheck className="w-3 h-3" />
                            <span>Book</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-200 text-slate-400 w-24 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce delay-200" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-slate-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Sports Pulse AI anything..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 placeholder:text-slate-400 font-medium"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition-colors cursor-pointer shadow-xs"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
