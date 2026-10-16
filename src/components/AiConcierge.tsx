import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  CalendarCheck,
  Activity,
  Layers,
  HelpCircle
} from 'lucide-react';
import { VENUES_DATA, COACHES_DATA, Venue } from '../data/sportsData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedVenues?: Venue[];
  quickActions?: { label: string; action: () => void }[];
  timestamp: string;
}

interface AiConciergeProps {
  onSelectVenue?: (venue: Venue) => void;
  onBookCourt?: (venue: Venue) => void;
}

export const AiConcierge: React.FC<AiConciergeProps> = ({
  onSelectVenue,
  onBookCourt
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "Namaskara! I'm your Sports Pulse Bengaluru Concierge 🏸. Need recommendations for BWF badminton courts, rooftop football turfs, coaching academies, or match rates around town?",
      timestamp: 'Just now'
    }
  ]);

  const quickPrompts = [
    'Best badminton courts in Sahakar Nagar',
    'Rooftop football turf for 10 players tonight',
    'Pickleball courts in HSR Layout or Indiranagar',
    'Coaching fees for junior tennis beginner'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
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

    try {
      // Gather recent message history to provide conversational context
      const history = messages.slice(-6).map((m) => ({
        role: m.sender,
        text: m.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history }),
      });

      if (!response.ok) {
        throw new Error(`API error ${response.status}`);
      }

      const data = await response.json();
      let matchedVenues: Venue[] = [];

      if (Array.isArray(data.recommendedVenueIds) && data.recommendedVenueIds.length > 0) {
        matchedVenues = data.recommendedVenueIds
          .map((id: string) => VENUES_DATA.find((v) => v.id === id))
          .filter((v: Venue | undefined): v is Venue => Boolean(v));
      }

      const aiMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: data.reply || "I'm here to help you find and book the best courts and academies in Bengaluru!",
        recommendedVenues: matchedVenues.length > 0 ? matchedVenues : undefined,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error contacting Sports Pulse AI endpoint:', err);

      // Intelligent local fallback matching Bengaluru courts
      const lower = query.toLowerCase();
      let reply = "Namaskara! I'm your Sports Pulse concierge. I'm ready to help you find courts, coach training, and match lobbies in Bengaluru!";
      let matchedVenues: Venue[] = [];

      if (lower.includes('badminton') || lower.includes('shuttle')) {
        matchedVenues = VENUES_DATA.filter((v) => v.sports.includes('Badminton'));
        reply = "Looking for badminton? Velocity Sports Arena in Yelahanka offers 8 BWF-approved synthetic courts with glare-free LED lighting at ₹450/hr, and Jayanagar Elite Badminton Club features 6 sprung wooden courts at ₹400/hr.";
      } else if (lower.includes('football') || lower.includes('turf') || lower.includes('soccer')) {
        matchedVenues = VENUES_DATA.filter((v) => v.sports.includes('Football'));
        reply = "For football, Apex Sky Turf in Indiranagar is a rooftop 5-a-side FIFA-standard turf under floodlights at ₹1,100/hr (fits 10 players, ~₹110 each).";
      } else if (lower.includes('pickleball') || lower.includes('padel')) {
        matchedVenues = VENUES_DATA.filter((v) => v.sports.includes('Pickleball'));
        reply = "Pickleball is popular in Bengaluru! Pulse Pickleball Hub in HSR Layout features 6 tournament-grade polymer tile courts at ₹550/hr, complete with paddle and ball rentals.";
      } else if (lower.includes('tennis')) {
        matchedVenues = VENUES_DATA.filter((v) => v.sports.includes('Tennis'));
        reply = "Grand Slam Tennis Club in Koramangala has 4 US Open DecoTurf acrylic hard courts with automated ball machines from ₹750/hr.";
      } else if (lower.includes('swim') || lower.includes('pool')) {
        matchedVenues = VENUES_DATA.filter((v) => v.sports.includes('Swimming'));
        reply = "BlueZone Aquatics Center in Sahakar Nagar features a heated semi-Olympic 25m ozone-purified pool (chlorine-free) at ₹300/hr.";
      }

      const aiMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: reply,
        recommendedVenues: matchedVenues.length > 0 ? matchedVenues.slice(0, 2) : undefined,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button (Vibrant & High-Contrast Light) */}
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

      {/* Light & Vibrant Chat Modal Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[580px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  Sports Pulse AI
                  <span className="text-[10px] font-bold text-orange-200 bg-white/20 px-1.5 py-0.5 rounded-full">BLR Concierge</span>
                </h3>
                <p className="text-[11px] text-blue-100">Powered by Gemini · Real Venue Recommendations</p>
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
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white font-medium rounded-tr-none shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Render Recommended Venue Mini-Cards */}
                  {msg.recommendedVenues && msg.recommendedVenues.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-slate-100">
                      {msg.recommendedVenues.map((v) => (
                        <div
                          key={v.id}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 transition-colors flex items-center justify-between gap-2 text-slate-900"
                        >
                          <div className="truncate">
                            <div className="font-bold text-slate-900 truncate">{v.name}</div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                              <MapPin className="w-3 h-3 text-orange-500" />
                              <span>{v.locality} · ₹{v.pricePerHour}/hr</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setIsOpen(false);
                              onBookCourt?.(v);
                            }}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shrink-0 shadow-2xs"
                          >
                            Book
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
                placeholder="Ask about courts, localities, pricing..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 placeholder:text-slate-400 font-medium"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
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
