"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const faqResponses: Record<string, string> = {
  "services": "We offer Digital Marketing, SEO, PPC Advertising, Social Media Marketing, Content Marketing, and Web Development. Check our Services page for details!",
  "pricing": "Our pricing varies based on your needs. Contact us for a custom quote!",
  "contact": "You can reach us at rohansakha343@gmail.com or call +977 9765564056. Or simply fill out our contact form!",
  "location": "We're based in Bhaktapur, Nepal, but serve clients worldwide!",
  "hours": "We're available Monday-Friday, 9am-6pm Nepal Time. Weekend support available on call.",
  "seo": "Yes! We offer comprehensive SEO services including on-page optimization, technical SEO, content strategy, and link building.",
  "social media": "We manage social media for all platforms including Facebook, Instagram, LinkedIn, and TikTok. Ask about our packages!",
  "timeline": "Project timelines vary: Landing pages take 1-2 weeks, full websites 4-8 weeks, and comprehensive marketing campaigns 1-3 months.",
  "portfolio": "Check our website for case studies or contact us to see examples of our recent work!",
  "process": "Our process: 1) Discovery & Strategy, 2) Design & Development, 3) Testing, 4) Launch & Support. We keep you updated throughout!",
};

function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  for (const [keyword, response] of Object.entries(faqResponses)) {
    if (message.includes(keyword)) {
      return response;
    }
  }
  
  const generalGreetings = ["hi", "hello", "hey", "good morning", "good afternoon"];
  if (generalGreetings.some(g => message.includes(g))) {
    return "Hello! Welcome to Smart Edge Solutions. How can I help you today? I can answer questions about our services, pricing, location, contact info, and more!";
  }
  
  const thankYou = ["thank", "thanks", "appreciate"];
  if (thankYou.some(t => message.includes(t))) {
    return "You're welcome! Is there anything else you'd like to know?";
  }
  
  const goodbye = ["bye", "goodbye", "see you", "talk"];
  if (goodbye.some(g => message.includes(g))) {
    return "Thank you for chatting with us! Feel free to reach out anytime. Have a great day!";
  }
  
  return "Thanks for your question! I'd love to help. For specific pricing or project details, please contact us directly at rohansakha343@gmail.com or use our contact form. Is there something else I can help you with?";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! Welcome to Smart Edge Solutions. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getBotResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        zIndex: 9999
      }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(31, 41, 55, 0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            transition: 'all 0.2s'
          }}
          aria-label="Scroll to top"
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(55, 65, 81, 0.9)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(31, 41, 55, 0.9)';
            e.currentTarget.style.color = '#9ca3af';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'relative',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FDCB00 0%, #F39C12 100%)',
            border: 'none',
            boxShadow: '0 10px 25px rgba(253, 203, 0, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            animation: 'chatbot-bounce 2s ease-in-out infinite'
          }}
          aria-label="Open chat"
        >
          <MessageCircle size={32} color="white" />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '0px',
            width: '12px',
            height: '12px',
            backgroundColor: '#4ade80',
            borderRadius: '50%',
            border: '2px solid #0a0a0f',
            animation: 'chatbot-pulse 1.5s ease-in-out infinite'
          }} />
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '380px',
      maxWidth: 'calc(100vw - 48px)',
      maxHeight: 'calc(100vh - 100px)',
      background: 'linear-gradient(to bottom, #111827, #1f2937, #111827)',
      border: '1px solid rgba(253, 203, 0, 0.3)',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      animation: 'chatbot-slide-up 0.3s ease-out forwards'
    }}>
      <div style={{
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(253,203,0,0.1), transparent, rgba(0,206,201,0.1))' }} />
        <div style={{
          position: 'relative',
          background: 'rgba(31, 41, 55, 0.95)',
          backdropFilter: 'blur(8px)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FDCB00 0%, #F39C12 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(253, 203, 0, 0.3)'
              }}>
                <Bot size={20} color="white" />
              </div>
              <span style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '12px',
                height: '12px',
                backgroundColor: '#4ade80',
                borderRadius: '50%',
                border: '2px solid #1f2937'
              }} />
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'white', fontSize: '14px' }}>Smart Edge Bot</p>
              <p style={{ fontSize: '12px', color: 'rgba(253,203,0,0.8)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', backgroundColor: '#FDCB00', borderRadius: '50%' }} />
                Always here to help
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#9ca3af',
              transition: 'all 0.2s'
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        background: 'rgba(17, 24, 39, 0.5)',
        minHeight: 0
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"} chatbot-message-appear`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-md ${
                msg.role === "user"
                  ? "gradient-bg text-white rounded-br-md"
                  : "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-100 rounded-bl-md border border-white/5"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl px-4 py-3 border border-white/5">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-amber-400 rounded-full chatbot-bounce-dot" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-amber-400 rounded-full chatbot-bounce-dot" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-amber-400 rounded-full chatbot-bounce-dot" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-gray-800/50 border-t border-white/5 flex-shrink-0">
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="w-full bg-gray-900/80 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-2xl gradient-bg text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}