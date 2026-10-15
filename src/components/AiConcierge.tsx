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
      text: "Namaskara! I'm your Sports Pulse Bengaluru Concierge 🏸. Looking for BWF-certified badminton courts, rooftop football turfs, coaching academies, or match rates around town?",
      timestamp: 'Just now'
    }
  ]);

  const quickPrompts = [
    'Best badminton courts in Sahakar Nagar',
    'Rooftop football turf for 10 players tonight',
    'Pickleball courts in HSR Layout or Indiranagar',
    'Budget coaching for junior tennis player'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
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

    // AI Logic processing query against Bengaluru sports dataset
    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply = '';
      let matchedVenues: Venue[] = [];

      if (lower.includes('badminton') || lower.includes('shuttle')) {
        matchedVenues = VENUES_DATA.filter(v => v.sports.includes('Badminton'));
        if (lower.includes('sahakar') || lower.includes('yelahanka')) {
          matchedVenues = matchedVenues.filter(v => v.locality === 'Yelahanka' || v.locality === 'Sahakar Nagar');
          reply = "I found top-rated badminton courts in North Bengaluru! Velocity Sports Arena in Yelahanka has 8 BWF-approved synthetic courts with glare-free lighting at ₹450/hr.";
        } else {
          reply = "Here are premier badminton arenas across Bengaluru with BWF wooden and synthetic cushion flooring. Hourly rates start at ₹400/hr in Jayanagar and ₹450/hr in Yelahanka.";
        }
      } else if (lower.includes('football') || lower.includes('turf') || lower.includes('soccer')) {
        matchedVenues = VENUES_DATA.filter(v => v.sports.includes('Football'));
        reply = "For football, Apex Sky Turf in Indiranagar is a favorite! It's a rooftop FIFA-quality 50mm monofilament turf with floodlights and skyline views at ₹1,100/hr (fits 10 players comfortably, so ~₹110/person).";
      } else if (lower.includes('pickleball') || lower.includes('padel')) {
        matchedVenues = VENUES_DATA.filter(v => v.sports.includes('Pickleball'));
        reply = "Pickleball is booming in Bengaluru! Pulse Pickleball Hub in HSR Layout features 6 tournament-grade polymer tile courts at ₹550/hr, with paddle & ball rentals included.";
      } else if (lower.includes('tennis')) {
        matchedVenues = VENUES_DATA.filter(v => v.sports.includes('Tennis'));
        reply = "Grand Slam Tennis Club in Koramangala has 4 US Open DecoTurf acrylic hard courts with automated ball machines from ₹750/hr. We also have certified ITF coach Ananya Rao available for private drills.";
      } else if (lower.includes('coach') || lower.includes('academy') || lower.includes('junior') || lower.includes('fee')) {
        reply = "We have 6 accredited academies in Bengaluru with NIS and BWF/ITF certified trainers. Badminton coaching starts at ₹3,200/month with Coach Manjunath Gowda in Sahakar Nagar, and swimming at ₹2,500/month with Priya Sundaram in Yelahanka. All include a complimentary trial session!";
      } else if (lower.includes('cost') || lower.includes('budget') || lower.includes('price')) {
        reply = "On average in Bengaluru, badminton court sharing costs ~₹100-₹150 per person for an hour. Football turfs split among 10 players come out to ~₹110 per person. You can use our interactive Cost Estimator page to model monthly sports expenses!";
      } else {
        reply = `I searched our Bengaluru sports database for "${query}". Here are verified multi-sport venues with available slots today:`;
        matchedVenues = VENUES_DATA.slice(0, 2);
      }

      const aiMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: reply,
        recommendedVenues: matchedVenues.length > 0 ? matchedVenues.slice(0, 2) : undefined,
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all cursor-pointer border border-emerald-300/40"
          aria-label="Ask Sports Pulse AI Concierge"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-slate-950" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-300 rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-300 rounded-full" />
          </div>
          <span className="text-xs sm:text-sm font-extrabold tracking-tight">
            Ask Sports Pulse AI 🤖
          </span>
        </button>
      </div>

      {/* Glassmorphism Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[580px] h-[520px] glass-modal rounded-2xl shadow-2xl border border-slate-700/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Sports Pulse AI
                  <span className="text-[10px] font-normal text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">BLR Live</span>
                </h3>
                <p className="text-[11px] text-slate-400">Bengaluru Venues & Coaching Concierge</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-800/60 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-emerald-500/20 hover:text-emerald-300 text-slate-300 border border-slate-700/50 whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Render Recommended Venue Mini-Cards */}
                  {msg.recommendedVenues && msg.recommendedVenues.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-slate-800">
                      {msg.recommendedVenues.map((v) => (
                        <div
                          key={v.id}
                          className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition-colors flex items-center justify-between gap-2"
                        >
                          <div className="truncate">
                            <div className="font-semibold text-white truncate">{v.name}</div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-emerald-400" />
                              <span>{v.locality} · ₹{v.pricePerHour}/hr</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setIsOpen(false);
                              onBookCourt?.(v);
                            }}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 shrink-0"
                          >
                            Book
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 w-24">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-200" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/90">
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
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-slate-950 transition-colors cursor-pointer"
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
