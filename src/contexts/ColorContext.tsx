import React, { createContext, useContext, useState } from 'react';

interface ColorContextType {
  accentColor: string;
  setAccentColor: (color: string) => void;
  brightness: number;
  setBrightness: (value: number) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const colors = {
  blue: '#0066FF',
  emerald: '#10B981',
  purple: '#8B5CF6',
  pink: '#EC4899',
  amber: '#F59E0B',
} as const;

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [accentColor, setAccentColor] = useState(colors.blue);
  const [brightness, setBrightness] = useState(50); // 0-100 range

  return (
    <ColorContext.Provider value={{ accentColor, setAccentColor, brightness, setBrightness }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
}