import React from 'react';
import { useScrollIndicator } from '@/hooks/useScrollAnimations';
import animations from '@/styles/AdvancedAnimations.module.css';

/**
 * Indicateur de progression du scroll - barre rouge en haut de page
 * Reproduit l'expérience visuelle du Gatsby original
 */
export default function ScrollProgressIndicator() {
  const scrollProgress = useScrollIndicator();

  return (
    <div 
      className={animations.scrollIndicator}
      style={{ 
        width: `${scrollProgress}%`,
        transform: `scaleX(${scrollProgress / 100})`
      }}
      aria-label={`Progression de lecture: ${Math.round(scrollProgress)}%`}
    />
  );
}
