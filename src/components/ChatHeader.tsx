import React, { useState } from 'react';
import { Gem, Settings as SettingsIcon } from 'lucide-react';
import { Settings } from './Settings';
import { useColor } from '../contexts/ColorContext';

export function ChatHeader() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { accentColor, brightness } = useColor();
  const glowColor = `${accentColor}${Math.round(brightness * 2.55).toString(16).padStart(2, '0')}`;

  return (
    <div className="bg-[#1A1A1A] rounded-t-2xl p-4 flex items-center justify-between border-b border-[#262626] relative">
      <div className="flex items-center gap-3">
        <div 
          className="bg-[#0D0D0D] p-2 rounded-lg"
          style={{ 
            boxShadow: brightness > 0 ? `0 4px 15px -3px ${glowColor}` : 'none',
            transition: 'box-shadow 0.3s ease'
          }}
        >
          <Gem 
            className="w-6 h-6" 
            style={{ 
              color: accentColor,
              filter: brightness > 0 ? `drop-shadow(0 0 ${brightness * 0.1}px ${accentColor})` : 'none',
              transition: 'filter 0.3s ease'
            }} 
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Ruby</h1>
          <p className="text-sm text-[#666666]">Powered by Llama 2</p>
        </div>
      </div>
      
      <button
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        className="text-[#666666] hover:text-white transition-colors p-2 rounded-lg hover:bg-[#262626]"
      >
        <SettingsIcon className="w-5 h-5" />
      </button>

      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}