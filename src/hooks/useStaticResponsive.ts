'use client';

/**
 * Hook responsive STATIQUE
 * Valeurs fixes pour éliminer TOUTE possibilité de boucle infinie
 * Version de test pour diagnostiquer le problème
 */
export const useStaticResponsive = () => {
  // Valeurs fixes desktop par défaut
  return {
    windowWidth: 1280,
    isWideScreen: true,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  };
}; 