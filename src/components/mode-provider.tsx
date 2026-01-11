'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type VisualMode = 'normal' | 'winter' | 'dirty';

interface ModeContextType {
  mode: VisualMode;
  setMode: (mode: VisualMode) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<VisualMode>('normal');

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <div className="relative min-h-screen">
        {children}
        
        {/* Winter Mode: Snow Overlay */}
        {mode === 'winter' && (
            <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="snowflake text-white absolute animate-snow"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 10 + 5}s`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random(),
                            fontSize: `${Math.random() * 10 + 10}px`
                        }}
                    >
                        ❄
                    </div>
                ))}
            </div>
        )}

        {/* Dirty Mode: Mud Splatter Overlay */}
        {mode === 'dirty' && (
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-40 mix-blend-multiply">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="absolute bg-[#4a3721] rounded-full blur-xl"
                        style={{
                            width: `${Math.random() * 200 + 50}px`,
                            height: `${Math.random() * 150 + 30}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() + 0.5})`,
                        }}
                    />
                ))}
            </div>
        )}
      </div>
    </ModeContext.Provider>
  );
}

export const useVisualMode = () => {
  const context = useContext(ModeContext);
  if (!context) throw new Error('useVisualMode must be used within ModeProvider');
  return context;
};
