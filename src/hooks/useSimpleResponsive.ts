'use client';

import { useState, useEffect } from 'react';

/**
 * Hook responsive ULTRA-SIMPLIFIÉ
 * Pas de store, pas de dépendances circulaires, pas de boucles !
 * Version minimale juste pour éviter les erreurs
 */
export const useSimpleResponsive = () => {
  const [windowWidth, setWindowWidth] = useState(1024); // Valeur par défaut desktop
  
  useEffect(() => {
    // Initialisation sécurisée côté client uniquement
    if (typeof window === 'undefined') return;
    
    const updateWidth = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(prevWidth => {
        // Seulement mettre à jour si différence > 100px pour éviter les micro-updates
        if (Math.abs(newWidth - prevWidth) > 100) {
          return newWidth;
        }
        return prevWidth;
      });
    };
    
    // Initialisation
    updateWidth();
    
    // Listener avec throttling agressif
    let ticking = false;
    const throttledResize = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateWidth();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('resize', throttledResize);
    
    return () => {
      window.removeEventListener('resize', throttledResize);
    };
  }, []); // AUCUNE dépendance
  
  // Calculs simples basés sur windowWidth
  return {
    windowWidth,
    isWideScreen: windowWidth >= 1024,
    isMobile: windowWidth < 768,
    isTablet: windowWidth >= 768 && windowWidth < 1024,
    isDesktop: windowWidth >= 1024,
  };
}; 