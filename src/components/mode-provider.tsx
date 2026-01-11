'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type VisualMode = 'normal' | 'winter' | 'dirty';

interface ModeContextType {
  mode: VisualMode;
  setMode: (mode: VisualMode) => void;
  brand: string;
  setBrand: (brand: string) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children, initialBrand = 'roosthub' }: { children: React.ReactNode, initialBrand?: string }) {
  const [mode, setMode] = useState<VisualMode>('normal');
  const [brand, setBrand] = useState(initialBrand);

  useEffect(() => {
    document.body.setAttribute('data-brand', brand);
  }, [brand]);

  return (
    <ModeContext.Provider value={{ mode, setMode, brand, setBrand }}>
      <div className="relative min-h-screen font-sans">
        {children}
        
        {/* Winter Mode: Ground Snow Effect */}
        {mode === 'winter' && (
            <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-[100] h-32 select-none">
                {/* Subtle Snow Drifts */}
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full drop-shadow-[0_-10px_30px_rgba(255,255,255,0.3)]">
                    <path 
                        d="M0 120L1440 120V60C1200 40 1000 80 720 60C440 40 240 80 0 60V120Z" 
                        fill="white" 
                        className="opacity-90"
                    />
                    <path 
                        d="M0 120L1440 120V80C1100 60 900 100 720 80C540 60 300 100 0 80V120Z" 
                        fill="white" 
                        className="opacity-60"
                    />
                </svg>
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
