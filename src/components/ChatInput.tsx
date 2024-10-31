import React, { useState } from 'react';
import { Send, Terminal } from 'lucide-react';
import { useColor } from '../contexts/ColorContext';
import { OllamaWizard } from './OllamaWizard';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: (e: React.FormEvent) => Promise<void>;
}

export function ChatInput({ input, setInput, handleSend }: ChatInputProps) {
  const { accentColor, brightness } = useColor();
  const [showWizard, setShowWizard] = useState(false);
  const glowColor = `${accentColor}${Math.round(brightness * 2.55).toString(16).padStart(2, '0')}`;

  return (
    <>
      <form
        onSubmit={handleSend}
        className="bg-[#1A1A1A] rounded-b-2xl p-4 flex gap-2 items-center border-t border-[#262626]"
      >
        <button
          type="button"
          onClick={() => setShowWizard(true)}
          className="text-[#666666] hover:text-white transition-colors p-2 rounded-lg hover:bg-[#262626]"
          title="Ollama Connection"
        >
          <Terminal className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message or use / for commands..."
          className="flex-1 bg-[#0D0D0D] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 transition-all placeholder-[#666666] font-mono"
          style={{ 
            '--tw-ring-color': accentColor,
            '--tw-ring-opacity': '0.5',
            boxShadow: brightness > 0 ? `0 4px 15px -3px ${glowColor}` : 'none',
            transition: 'box-shadow 0.3s ease'
          } as React.CSSProperties}
        />
        <button
          type="submit"
          className="text-white p-2 rounded-xl transition-all hover:opacity-90"
          style={{ 
            backgroundColor: accentColor,
            boxShadow: brightness > 0 ? `0 4px 15px -3px ${glowColor}` : 'none',
            transition: 'box-shadow 0.3s ease'
          } as React.CSSProperties}
        >
          <Send 
            className="w-5 h-5"
            style={{
              filter: brightness > 0 ? `drop-shadow(0 0 ${brightness * 0.1}px ${accentColor})` : 'none',
              transition: 'filter 0.3s ease'
            }}
          />
        </button>
      </form>
      <OllamaWizard isOpen={showWizard} onClose={() => setShowWizard(false)} />
    </>
  );
}