import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  MapPin,
  AlertCircle,
  CalendarCheck,
  Maximize2,
  Minimize2,
  RotateCcw,
  Copy,
  Check
} from 'lucide-react';
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

const WELCOME_MESSAGE: Message = {
  id: 'welcome-1',
  sender: 'ai',
  text: "Namaskara! I'm Pulse AI — ask me anything at all! Coding, science, travel itineraries, recipes, fitness, career prep, or booking Bengaluru's best courts — no topic or length limits.",
  timestamp: 'Just now'
};

const QUICK_PROMPTS = [
  'Explain how black holes form simply',
  'Write a Python binary search function',
  'Plan a 2-day Coorg trip from Bengaluru',
  'High-protein vegetarian meal plan',
  'Best badminton courts near Sahakar Nagar'
];

// Lightweight inline formatting helper (bold, italic, inline code)
const renderInlineMarkdown = (text: string): React.ReactNode[] => {
  const tokenRegex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*\n]+\*)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-100 text-indigo-700 font-mono text-[11px] border border-slate-200/80"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-slate-900">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={match.index} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <div className="my-2 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 text-slate-100">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 border-b border-slate-700 text-[10px] font-mono text-slate-300">
        <span className="uppercase tracking-wider">{language || 'code'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-[11px] leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const FormattedMessage: React.FC<{ text: string; isUser: boolean }> = ({ text, isUser }) => {
  if (isUser) {
    return <p className="whitespace-pre-wrap break-words">{text}</p>;
  }

  const segments = text.split(/(```[\w-]*\n[\s\S]*?```)/g);

  return (
    <div className="space-y-2 break-words">
      {segments.map((segment, segIdx) => {
        if (segment.startsWith('```') && segment.endsWith('```')) {
          const firstNewline = segment.indexOf('\n');
          const language = firstNewline !== -1 ? segment.slice(3, firstNewline).trim() : '';
          const code =
            firstNewline !== -1 ? segment.slice(firstNewline + 1, -3).replace(/\n$/, '') : segment.slice(3, -3);
          return <CodeBlock key={segIdx} language={language} code={code} />;
        }

        if (!segment.trim()) return null;

        const lines = segment.split('\n');
        const elements: React.ReactNode[] = [];
        let listItems: { ordered: boolean; items: string[] } | null = null;

        const flushList = (keyPrefix: string) => {
          if (!listItems) return;
          if (listItems.ordered) {
            elements.push(
              <ol key={`${keyPrefix}-ol`} className="list-decimal pl-4 space-y-1">
                {listItems.items.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {renderInlineMarkdown(item)}
                  </li>
                ))}
              </ol>
            );
          } else {
            elements.push(
              <ul key={`${keyPrefix}-ul`} className="list-disc pl-4 space-y-1">
                {listItems.items.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {renderInlineMarkdown(item)}
                  </li>
                ))}
              </ul>
            );
          }
          listItems = null;
        };

        lines.forEach((line, lineIdx) => {
          const trimmed = line.trim();
          const key = `${segIdx}-${lineIdx}`;

          if (!trimmed) {
            flushList(key);
            return;
          }

          const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
          if (headingMatch) {
            flushList(key);
            const level = headingMatch[1].length;
            const headingText = headingMatch[2];
            elements.push(
              <div
                key={key}
                className={`font-extrabold text-slate-900 pt-1 ${
                  level === 1 ? 'text-sm' : level === 2 ? 'text-[13px]' : 'text-xs'
                }`}
              >
                {renderInlineMarkdown(headingText)}
              </div>
            );
            return;
          }

          const bulletMatch = trimmed.match(/^[-*•]\s+(.+)$/);
          if (bulletMatch) {
            if (listItems && listItems.ordered) {
              flushList(key);
            }
            if (!listItems) {
              listItems = { ordered: false, items: [] };
            }
            listItems.items.push(bulletMatch[1]);
            return;
          }

          const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
          if (orderedMatch) {
            if (listItems && !listItems.ordered) {
              flushList(key);
            }
            if (!listItems) {
              listItems = { ordered: true, items: [] };
            }
            listItems.items.push(orderedMatch[1]);
            return;
          }

          flushList(key);
          elements.push(
            <p key={key} className="leading-relaxed">
              {renderInlineMarkdown(line)}
            </p>
          );
        });

        flushList(`${segIdx}-end`);

        return <React.Fragment key={segIdx}>{elements}</React.Fragment>;
      })}
    </div>
  );
};

export const AiConcierge: React.FC<AiConciergeProps> = ({
  onBookCourt
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 110)}px`;
  }, [inputText]);

  const handleResetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInputText('');
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend ?? inputText).trim();
    if (!query || isTyping) return;

    const userMessageId = 'user-' + Date.now();
    const newMsg: Message = {
      id: userMessageId,
      sender: 'user',
      text: query,
      timestamp: 'Now'
    };

    const history = messages
      .filter((m) => m.id !== 'welcome-1' && !m.isError)
      .map((m) => ({
        role: m.sender,
        text: m.text
      }));

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) {
      setInputText('');
    }
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 429 || data?.isQuotaError) {
          setMessages((prev) => [
            ...prev,
            {
              id: 'ai-' + Date.now(),
              sender: 'ai',
              text: data?.error || 'Pulse AI is currently handling heavy traffic. Please wait a moment and try again!',
              isError: false,
              timestamp: 'Just now'
            }
          ]);
          return;
        }

        throw new Error(data?.error || `Request failed (${response.status})`);
      }

      const replyText = typeof data.reply === 'string' ? data.reply : '';
      const recommendedIds = Array.isArray(data.recommendedVenueIds) ? data.recommendedVenueIds : [];

      const matchedVenues: Venue[] = recommendedIds
        .map((id: string) => VENUES_DATA.find((v) => v.id === id))
        .filter((v: Venue | undefined): v is Venue => Boolean(v));

      const aiMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: replyText || "I'm ready to help with any question you have!",
        recommendedVenues: matchedVenues.length > 0 ? matchedVenues : undefined,
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('[Pulse AI] Chat error:', err);
      const outcomeMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: err?.message || 'Unable to reach Pulse AI right now. Please try again in a moment.',
        isError: true,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, outcomeMsg]);
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
          aria-label="Ask Pulse AI"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-400 rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-400 rounded-full" />
          </div>
          <span className="text-xs sm:text-sm font-extrabold tracking-tight">
            Ask Pulse AI 🤖
          </span>
        </button>
      </div>

      {/* Chat Modal Drawer */}
      {isOpen && (
        <div
          className={`fixed bottom-20 right-4 sm:right-6 z-50 bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 transition-all ${
            isExpanded
              ? 'w-[calc(100vw-2rem)] sm:w-[600px] md:w-[680px] h-[82vh] max-h-[820px]'
              : 'w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[82vh]'
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <span>Pulse AI</span>
                  <span className="text-[10px] font-bold text-orange-200 bg-white/20 px-1.5 py-0.5 rounded-full">
                    Gemini
                  </span>
                </h3>
                <p className="text-[11px] text-blue-100 truncate">
                  Ask Anything · Sports, Tech, Life &amp; Bengaluru
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Reset conversation"
                title="New conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:inline-flex p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={isExpanded ? 'Compact view' : 'Expand view'}
                title={isExpanded ? 'Compact view' : 'Expand view'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Pulse AI"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 whitespace-nowrap transition-colors font-medium shadow-2xs cursor-pointer"
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
                  className={`max-w-[90%] rounded-2xl p-3.5 leading-relaxed ${
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
                      <span>Error</span>
                    </div>
                  )}

                  <FormattedMessage text={msg.text} isUser={msg.sender === 'user'} />

                  {/* Render Recommended Venue Mini-Cards when relevant */}
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
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shrink-0 shadow-2xs flex items-center gap-1 cursor-pointer"
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
          <div className="p-3 border-t border-slate-200 bg-white shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-end gap-2"
            >
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask Pulse AI anything (code, travel, science, sports...)..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 placeholder:text-slate-400 font-medium resize-none max-h-28"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition-colors cursor-pointer shadow-xs shrink-0"
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
