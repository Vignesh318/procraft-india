import React, { useState } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'support'; text: string; time: string }[]>([
    {
      sender: 'support',
      text: 'Hi there! 👋 Welcome to Procraft India. How can we help you choose your musical gear today?',
      time: 'Just now'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userText = message;
    setMessage('');
    setChatLog((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: 'Just now' }
    ]);

    // Simulated quick support response
    setTimeout(() => {
      let reply = "Thanks for reaching out! Our gear specialists are checking stock and delivery for your request. You can also reach our direct hotline at +91 98200 12345.";
      if (userText.toLowerCase().includes('headphone') || userText.toLowerCase().includes('iem') || userText.toLowerCase().includes('m100')) {
        reply = "The Donner M100 and KZ IEMs are our top trending stage and monitoring picks! The JOYO JMH05 5-driver is currently in stock with free express shipping.";
      } else if (userText.toLowerCase().includes('guitar') || userText.toLowerCase().includes('acoustic')) {
        reply = "All our acoustic and electric guitars come with full factory inspection, truss rod adjustment, and secure hard-box packaging before dispatch.";
      } else if (userText.toLowerCase().includes('shipping') || userText.toLowerCase().includes('pincode') || userText.toLowerCase().includes('delivery')) {
        reply = "We offer FREE Shipping across India via BlueDart and Delhivery Express. Metro orders arrive in 2-3 business days!";
      }

      setChatLog((prev) => [
        ...prev,
        { sender: 'support', text: reply, time: 'Just now' }
      ]);
    }, 900);
  };

  return (
    <>
      {/* Floating Pill Button matching screenshots */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 bg-white hover:bg-zinc-50 text-zinc-900 px-4 py-2 rounded-full shadow-lg border border-zinc-200 transition-all hover:scale-105 select-none focus:outline-none"
          aria-label="Chat with us on WhatsApp"
        >
          {/* WhatsApp green circular icon */}
          <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-xs">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.954.557 3.782 1.523 5.336L2 22l4.781-1.508a10.007 10.007 0 0 0 5.25 1.488c5.535 0 10.031-4.496 10.031-10.031C22.062 6.496 17.566 2 12.031 2zm5.727 14.156c-.242.672-1.207 1.258-1.68 1.309-.445.047-1.023.078-3.023-.75-2.563-1.055-4.227-3.664-4.359-3.836-.125-.172-1.031-1.375-1.031-2.625 0-1.25.648-1.859.883-2.117.234-.258.516-.328.688-.328.172 0 .344 0 .492.008.156.008.367-.062.578.438.219.516.742 1.805.805 1.938.062.133.109.289.016.469-.094.18-.141.289-.281.445-.141.156-.297.352-.422.469-.141.133-.289.281-.125.562.164.281.727 1.195 1.562 1.938 1.07.953 1.977 1.25 2.258 1.391.281.141.445.117.609-.07.164-.188.703-.82.891-1.102.188-.281.375-.234.633-.141.258.094 1.648.773 1.93 1.055.281.281.469.422.539.539.07.117.07.672-.172 1.344z" />
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-tight text-zinc-800">
            Chat with us
          </span>
        </button>
      </div>

      {/* WhatsApp Chat Pop-up Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border border-zinc-200 z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center font-bold text-xs text-white">
                P
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">Procraft India Support</h4>
                <p className="text-[10px] text-emerald-200">Online | Typically replies in minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-64 p-3 overflow-y-auto bg-[#ECE5DD] space-y-2.5 text-xs">
            {chatLog.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg shadow-2xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#DCF8C6] text-zinc-900 rounded-tr-none'
                      : 'bg-white text-zinc-900 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-zinc-500 mt-0.5 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Quick FAQ Suggestion Pills */}
          <div className="bg-zinc-50 px-3 py-2 border-t border-zinc-100 flex gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => {
                setMessage('Is Donner M100 coming back in stock?');
              }}
              className="bg-white border border-zinc-200 hover:border-amber-400 px-2 py-1 rounded text-zinc-600 whitespace-nowrap"
            >
              Headphones Stock?
            </button>
            <button
              onClick={() => {
                setMessage('What is the delivery time to Mumbai?');
              }}
              className="bg-white border border-zinc-200 hover:border-amber-400 px-2 py-1 rounded text-zinc-600 whitespace-nowrap"
            >
              Shipping time?
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-zinc-200 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-xs border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:border-[#075E54]"
            />
            <button
              type="submit"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white p-2 rounded flex items-center justify-center transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
