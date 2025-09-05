import React from 'react';

/**
 * Utilitaires pour la gestion responsive adaptée au zoom
 */

/**
 * Détecte si l'écran est "large" en tenant compte du zoom
 * Utilise une combinaison de window.innerWidth et devicePixelRatio
 */
export function isWideScreenZoomTolerant(): boolean {
  if (typeof window === 'undefined') return false;
  
  const actualWidth = window.innerWidth;
  const deviceRatio = window.devicePixelRatio || 1;
  
  // Si le ratio est très différent de 1, l'utilisateur a probablement zoomé
  const isZoomed = deviceRatio < 0.8 || deviceRatio > 1.5;
  
  if (isZoomed) {
    // Pour les écrans zoomés, utiliser un seuil plus bas
    return actualWidth >= 800;
  } else {
    // Pour les écrans normaux, utiliser le seuil standard
    return actualWidth >= 1200;
  }
}

/**
 * Détecte si l'écran est "medium" en tenant compte du zoom
 */
export function isMediumScreenZoomTolerant(): boolean {
  if (typeof window === 'undefined') return false;
  
  const actualWidth = window.innerWidth;
  const deviceRatio = window.devicePixelRatio || 1;
  
  const isZoomed = deviceRatio < 0.8 || deviceRatio > 1.5;
  
  if (isZoomed) {
    return actualWidth >= 600;
  } else {
    return actualWidth >= 960;
  }
}

/**
 * Détecte si l'utilisateur est à 200% de zoom ou plus (mode horizontal pour sidebars)
 * À 200% de zoom, un écran de 1920px apparaît comme 960px
 */
export function isHighZoomHorizontalMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  const actualWidth = window.innerWidth;
  const deviceRatio = window.devicePixelRatio || 1;
  
  // À 200% de zoom, devicePixelRatio est généralement autour de 2
  // Et la largeur visible diminue proportionnellement
  const isHighZoom = deviceRatio >= 1.8;
  const isNarrowWidth = actualWidth <= 960; // Équivalent à 1920px à 200% zoom
  
  // Mode horizontal si zoom élevé ET largeur réduite, OU très petite largeur
  return (isHighZoom && isNarrowWidth) || actualWidth <= 600;
}

/**
 * Hook React pour détecter les breakpoints avec tolérance au zoom
 */
export function useZoomTolerantBreakpoints() {
  const [isWide, setIsWide] = React.useState(false);
  const [isMedium, setIsMedium] = React.useState(false);
  const [isHorizontalMode, setIsHorizontalMode] = React.useState(false);
  
  React.useEffect(() => {
    const updateBreakpoints = () => {
      setIsWide(isWideScreenZoomTolerant());
      setIsMedium(isMediumScreenZoomTolerant());
      setIsHorizontalMode(isHighZoomHorizontalMode());
    };
    
    updateBreakpoints();
    window.addEventListener('resize', updateBreakpoints);
    
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);
  
  return { isHorizontalMode, isMedium, isWide };
}

// Export par défaut pour compatibility
export default {
  isHighZoomHorizontalMode,
  isMediumScreenZoomTolerant,
  isWideScreenZoomTolerant,
  useZoomTolerantBreakpoints,
};
