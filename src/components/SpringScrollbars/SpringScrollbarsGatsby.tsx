/**
 * SpringScrollbars - Version simplifiée focalisée sur l'auto-hide
 * Test direct de react-custom-scrollbars-2 avec autoHide
 */
'use client'

import React, { useRef, useEffect, useCallback, ReactNode } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

import { useUIPreferences } from '@/store/gatsby-ui-store'

interface SpringScrollbarsProps {
  children: ReactNode
  className?: string
  isNavigator?: boolean
  onScrollFrame?: (values: { scrollTop: number; scrollLeft: number; scrollHeight: number; scrollWidth: number; clientHeight: number; clientWidth: number }) => void
  forceCheckOnScroll?: boolean
}

/**
 * SpringScrollbars - Version simplifiée pour tester l'auto-hide
 */
export default function SpringScrollbarsGatsby({ 
  children, 
  className = '',
  forceCheckOnScroll: _forceCheckOnScroll = true
}: SpringScrollbarsProps) {
  const scrollbarsRef = useRef<Scrollbars>(null)
  const { scrollToTop, setScrollToTop } = useUIPreferences()

  // Gestion du scroll automatique vers le haut
  useEffect(() => {
    if (scrollToTop && scrollbarsRef.current) {
      scrollbarsRef.current.scrollTop(0)
      setScrollToTop(false)
    }
  }, [scrollToTop, setScrollToTop])

  // Gestion du scroll simple
  const handleScroll = useCallback(() => {
    // Simple gestion du scroll sans dépendances complexes
    console.log('📜 Scroll détecté dans Navigator')
  }, [])

  return (
    <Scrollbars
      autoHide                              // ← COMPORTEMENT AUTO-HIDE NATIF 
      autoHideTimeout={1000}                // ← Masquage après 1 seconde
      autoHideDuration={200}                // ← Animation de 200ms
      universal={true}                      // ← Compatibilité universelle
      onScroll={handleScroll}               // ← Gestion scroll
      className={`spring-scrollbars ${className}`}
      ref={scrollbarsRef}
      style={{
        height: '100%',
        width: '100%'
      }}
      // Styles personnalisés pour la barre
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: '#c1c1c1',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        />
      )}
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: '#f1f1f1',
            borderRadius: '3px',
            bottom: '2px',
            right: '2px',
            top: '2px',
            width: '8px'
          }}
        />
      )}
      // Désactiver les barres horizontales
      renderThumbHorizontal={() => <div style={{ display: 'none' }} />}
      renderTrackHorizontal={() => <div style={{ display: 'none' }} />}
    >
      {children}
    </Scrollbars>
  )
}
