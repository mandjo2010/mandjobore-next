import React, { useEffect } from 'react';
import { useScrollAnimations, useParallaxEffect, useTangibleNavigation } from '@/hooks/useScrollAnimations';
import animations from '@/styles/AdvancedAnimations.module.css';

/**
 * Page de démonstration des animations avancées 
 * Reproduit fidèlement l'expérience dynamique du GIF Gatsby original
 */
export default function AdvancedAnimationsDemo() {
  const { elementRef: heroRef, isVisible: heroVisible, triggerLoadAnimation } = useScrollAnimations();
  const { elementRef: parallaxRef, offset } = useParallaxEffect(0.3);
  const { tangibleProps, isPressed, rippleCoords } = useTangibleNavigation();

  useEffect(() => {
    if (heroVisible) {
      triggerLoadAnimation();
    }
  }, [heroVisible, triggerLoadAnimation]);

  return (
    <div className={`${animations.customScrollContainer} ${animations.themeTransition}`}>
      
      {/* Section héro avec apparition progressive */}
      <section 
        ref={heroRef}
        className={`${animations.lazyLoadElement} ${heroVisible ? 'loaded' : ''}`}
        style={{ 
          height: '100vh', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}
      >
        <div className={animations.navigationFeatured}>
          <h1 className={animations.responsiveTypography}>
            Interface Dynamique Gatsby → Next.js
          </h1>
          <p className={animations.interactiveElement}>
            Reproduction fidèle de l'expérience originale
          </p>
        </div>
      </section>

      {/* Section avec effet parallaxe */}
      <section 
        ref={parallaxRef}
        className={animations.parallaxElement}
        style={{ 
          transform: `translateY(${offset}px)`,
          padding: '100px 0',
          backgroundColor: '#f8f9fa'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <h2 className={animations.responsiveTypography}>
            Navigation Tangible et Immersive
          </h2>
          
          {/* Éléments interactifs avec feedback */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '40px' }}>
            {['Articles', 'Portfolio', 'Contact', 'À propos'].map((item, index) => (
              <div
                key={item}
                className={`${animations.articleInteractive} ${animations.feedbackElement} ${animations.tangibleNavigation}`}
                {...tangibleProps}
                style={{
                  padding: '30px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  textAlign: 'center',
                  animationDelay: `${index * 0.1}s`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Effet ripple personnalisé */}
                {isPressed && (
                  <div
                    style={{
                      position: 'absolute',
                      left: rippleCoords.x,
                      top: rippleCoords.y,
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(102, 126, 234, 0.3)',
                      transform: 'translate(-50%, -50%)',
                      animation: 'ripple 0.6s linear'
                    }}
                  />
                )}
                <h3 className={animations.positionIndicator}>{item}</h3>
                <p>Interaction fluide avec feedback visuel</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section avec chargement paresseux */}
      <section style={{ padding: '100px 0', backgroundColor: '#343a40', color: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <h2 className={animations.responsiveTypography}>
            Chargement Progressif des Éléments
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '40px' }}>
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={`${animations.lazyLoadElement} loaded`}
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  animationDelay: `${i * 0.2}s`
                }}
              >
                <h4>Élément {i + 1}</h4>
                <p>Apparition avec délai progressif pour créer un effet de cascade</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section finale avec avatar interactif */}
      <section style={{ padding: '100px 0', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
        <h2 className={animations.responsiveTypography}>
          Avatar Interactif
        </h2>
        
        <div 
          className={animations.avatarInteractive}
          style={{
            width: '120px',
            height: '120px',
            backgroundColor: '#667eea',
            margin: '40px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px',
            cursor: 'pointer'
          }}
        >
          👨‍💻
        </div>
        
        <p className={animations.interactiveElement}>
          Survol pour voir l'animation morphologique
        </p>
      </section>

      {/* Styles CSS inline pour l'effet ripple */}
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
