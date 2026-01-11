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
    // Aggressive application to both HTML and Body
    document.documentElement.setAttribute('data-brand', brand);
    document.body.setAttribute('data-brand', brand);
    console.log('DOM updated with brand:', brand);
  }, [brand]);

  return (
    <ModeContext.Provider value={{ mode, setMode, brand, setBrand }}>
      <div 
        key={brand}
        data-brand={brand} 
        className="relative min-h-screen font-sans overflow-x-hidden"
      >
        {children}
        
        {/* Winter Mode: High-Fidelity Ground Snow Effect */}
        {mode === 'winter' && (
            <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-[100] select-none h-40">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full h-full drop-shadow-[0_-5px_15px_rgba(255,255,255,0.4)]">
                    <path 
                        d="M0 120L1440 120V60C1200 40 1000 80 720 60C440 40 240 80 0 60V120Z" 
                        fill="white" 
                        className="opacity-95"
                    />
                    <path 
                        d="M0 120L1440 120V85C1100 65 900 105 720 85C540 65 300 105 0 85V120Z" 
                        fill="#f8fafc" 
                        className="opacity-80"
                    />
                    {/* Add some sparkly bits */}
                    <circle cx="200" cy="70" r="2" fill="white" className="animate-pulse" />
                    <circle cx="600" cy="90" r="1.5" fill="white" className="animate-pulse" />
                    <circle cx="1100" cy="65" r="2.5" fill="white" className="animate-pulse" />
                </svg>
            </div>
        )}

        {/* Dirty Mode: Mud Splatter Overlay */}
        {mode === 'dirty' && (
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-30 mix-blend-multiply overflow-hidden">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="absolute bg-[#3e2723] rounded-full blur-2xl"
                        style={{
                            width: `${Math.random() * 300 + 100}px`,
                            height: `${Math.random() * 200 + 50}px`,
                            left: `${Math.random() * 110 - 5}%`,
                            top: `${Math.random() * 110 - 5}%`,
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