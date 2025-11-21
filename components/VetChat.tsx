import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Stethoscope, Info } from 'lucide-react';
import { getPetCareAdvice } from '../services/aiService';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export const VetChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi! I'm your AI Vet Assistant. Ask me anything about pet care, nutrition, or behavior!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await getPetCareAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] md:h-[600px] flex flex-col p-4">
        <div className="bg-white rounded-t-2xl border-x border-t border-orange-100 p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-full">
                    <Stethoscope className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                    <h2 className="font-bold text-gray-800">Vet Assistant</h2>
                    <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Online
                    </p>
                </div>
            </div>
            <div title="AI Advice is not a substitute for professional veterinary care.">
                <Info className="w-5 h-5 text-gray-400 cursor-help" />
            </div>
        </div>

        <div className="flex-1 bg-gray-50 border-x border-gray-200 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-orange-500 text-white rounded-tr-none' 
                        : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            {loading && (
                <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={bottomRef} />
        </div>

        <div className="bg-white p-4 rounded-b-2xl border-x border-b border-gray-200 shadow-sm">
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about diet, exercise, or symptoms..."
                    className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">
                AI can make mistakes. Always consult a real vet for emergencies.
            </p>
        </div>
    </div>
  );
};