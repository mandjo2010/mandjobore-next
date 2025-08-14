'use client';

import { useEffect } from 'react';

import { usePreferences } from '@/store/ui';

/**
 * Hook pour appliquer la taille de police globalement
 * S'utilise dans le layout principal ou _app.tsx
 */
export const useFontSizeController = () => {
  const { fontSize } = usePreferences();

  useEffect(() => {
    // Applique la taille de police au document
    const baseFontSize = 16; // Base de 16px
    const newFontSize = fontSize * baseFontSize;
    
    document.documentElement.style.fontSize = `${newFontSize}px`;
    
    // Stocke également dans une variable CSS pour d'autres utilisations
    document.documentElement.style.setProperty('--base-font-size', `${newFontSize}px`);
    document.documentElement.style.setProperty('--font-scale', fontSize.toString());
    
    // Déclenche un événement personnalisé pour les composants qui en ont besoin
    window.dispatchEvent(new CustomEvent('fontSizeChanged', { 
      detail: { fontSize: newFontSize, scale: fontSize } 
    }));
    
  }, [fontSize]);

  return { fontSize };
};

export default useFontSizeController;
