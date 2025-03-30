'use client';

import React, { createContext, useState, useContext, useCallback } from 'react';

interface TypingAnimationContextType {
  registerCard: (index: number, callback: () => void) => void;
  signalCompletion: (index: number) => void;
  currentIndex: number;
}

const TypingAnimationContext = createContext<TypingAnimationContextType | undefined>(undefined);

export const TypingAnimationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [callbacks, setCallbacks] = useState<Record<number, () => void>>({});

  const registerCard = useCallback((index: number, callback: () => void) => {
    setCallbacks(prev => ({...prev, [index]: callback}));
    // If this is the first card (index 0), start typing immediately
    if (index === 0) {
      callback();
    }
  }, []);

  const signalCompletion = useCallback((index: number) => {
    // When a card finishes typing, increment the current index
    const nextIndex = index + 1;
    setCurrentIndex(nextIndex);
    
    // Trigger the next card to start typing
    if (callbacks[nextIndex]) {
      callbacks[nextIndex]();
    }
  }, [callbacks]);

  const value = {
    registerCard,
    signalCompletion,
    currentIndex
  };

  return (
    <TypingAnimationContext.Provider value={value}>
      {children}
    </TypingAnimationContext.Provider>
  );
};

export const useTypingAnimation = () => {
  const context = useContext(TypingAnimationContext);
  if (context === undefined) {
    throw new Error('useTypingAnimation must be used within a TypingAnimationProvider');
  }
  return context;
};
