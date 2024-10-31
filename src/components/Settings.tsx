import React from 'react';
import { Settings as SettingsIcon, X, Sun } from 'lucide-react';
import { colors, useColor } from '../contexts/ColorContext';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Settings({ isOpen, onClose }: SettingsProps) {
  const { accentColor, setAccentColor, brightness, setBrightness } = useColor();

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 bg-[#1A1A1A] rounded-xl shadow-lg p-4 w-64 border border-[#262626]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-semibold">Settings</h2>
        <button
          onClick={onClose}
          className="text-[#666666] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm text-[#666666] mb-2">Preset Colors</h3>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(colors).map(([name, color]) => (
              <button
                key={name}
                onClick={() => setAccentColor(color)}
                className={`w-8 h-8 rounded-full transition-all ${
                  accentColor === color
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1A1A1A]'
                    : 'hover:scale-110'
                }`}
                style={{ backgroundColor: color }}
                title={name.charAt(0).toUpperCase() + name.slice(1)}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm text-[#666666] mb-2">Custom Color</h3>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div 
                className="w-full h-8 rounded-lg border border-[#262626] cursor-pointer"
                style={{ backgroundColor: accentColor }}
              />
            </div>
            <input
              type="text"
              value={accentColor}
              onChange={(e) => {
                const color = e.target.value;
                if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                  setAccentColor(color);
                }
              }}
              className="w-20 bg-[#0D0D0D] text-white text-sm rounded-lg px-2 border border-[#262626]"
              placeholder="#000000"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-[#666666]">Glow Brightness</h3>
            <span className="text-sm text-[#666666]">{brightness}%</span>
          </div>
          <div className="flex items-center gap-3">
            <Sun className="w-4 h-4 text-[#666666]" />
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-1 bg-[#262626] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              style={{
                background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${brightness}%, #262626 ${brightness}%, #262626 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}