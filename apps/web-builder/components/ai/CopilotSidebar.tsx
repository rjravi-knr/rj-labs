'use client';

import { useChat } from '@ai-sdk/react';
import { Send, Bot, User, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useState } from 'react';

export const CopilotSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { messages, status, sendMessage } = useChat();
  const [input, setInput] = useState('');
  
  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    
    setInput('');
    // sendMessage accepts string in many cases, or we can pass an object.
    // Based on types, it accepts { text: string }.
    // But let's try passing the input string first as it's common.
    // If strict, we use { role: 'user', content: input }.
    // Actually, let's use the object format that is definitely supported or close to it.
    // The error suggested { text: string } is a valid option.
    await sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl border-l transform transition-transform duration-300 z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h2 className="font-bold">AI Copilot</h2>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Hi! I'm your AI assistant.</p>
            <p className="text-xs mt-1">Ask me to add components or change the design.</p>
          </div>
        )}
        
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              'flex gap-3 max-w-[90%]',
              m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            )}
          >
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                m.role === 'user' ? 'bg-primary-600 text-white' : 'bg-white border text-secondary-600'
              )}
            >
              {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div
              className={cn(
                'p-3 rounded-lg text-sm shadow-sm',
                m.role === 'user'
                  ? 'bg-primary-600 text-white rounded-tr-none'
                  : 'bg-white border text-gray-800 rounded-tl-none'
              )}
            >
              {m.parts ? m.parts.map((part, i) => {
                if (part.type === 'text') return <span key={i}>{part.text}</span>;
                return null;
              }) : (m as any).content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 mr-auto">
             <div className="w-8 h-8 rounded-full bg-white border text-secondary-600 flex items-center justify-center flex-shrink-0">
               <Bot className="w-4 h-4" />
             </div>
             <div className="bg-white border p-3 rounded-lg rounded-tl-none shadow-sm">
               <div className="flex gap-1">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
               </div>
             </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSubmit} className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to build..."
            className="w-full pl-4 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none shadow-sm"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
