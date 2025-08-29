import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationsOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Hook personnalisé pour gérer les animations au scroll et le lazy loading
 * Reproduit l'expérience dynamique du Gatsby original
 */
export function useScrollAnimations({
  threshold = 0.1,
  rootMargin = '0px',
  once = true
}: UseScrollAnimationsOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  // Intersection Observer pour l'apparition progressive des éléments
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  // Progression du scroll pour les animations
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  // Fonction pour déclencher l'animation de chargement
  const triggerLoadAnimation = () => {
    if (elementRef.current) {
      elementRef.current.classList.add('loaded');
    }
  };

  return {
    elementRef,
    isVisible,
    scrollProgress,
    triggerLoadAnimation
  };
}

/**
 * Hook pour gérer le parallaxe et les déplacements coordonnés
 */
export function useParallaxEffect(intensity: number = 0.5) {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      setOffset(scrollY * intensity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [intensity]);

  return { elementRef, offset };
}

/**
 * Hook pour la navigation tangible avec feedback visuel
 */
export function useTangibleNavigation() {
  const [isPressed, setIsPressed] = useState(false);
  const [rippleCoords, setRippleCoords] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setRippleCoords({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setTimeout(() => setIsPressed(false), 200);
  };

  return {
    isPressed,
    rippleCoords,
    handleMouseDown,
    handleMouseUp,
    tangibleProps: {
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp
    }
  };
}

/**
 * Hook pour gérer l'indicateur de progression du scroll
 */
export function useScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return scrollProgress;
}
