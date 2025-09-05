/**
 * SpringScrollbars - Reproduction fidèle du scroll inertiel de Gatsby
 * Correspondance avec src/components/SpringScrollbars/springScrollbars.js
 * Utilise Framer Motion au lieu de Rebound pour la compatibilité React 19
 */
'use client'

import { Box, styled } from '@mui/material'
import { motion, useSpring, useMotionValue, PanInfo } from 'framer-motion'
import React, { useRef, useEffect, useCallback, ReactNode } from 'react'

import { useUIPreferences } from '@/store/gatsby-ui-store'

interface SpringScrollbarsProps {
  children: ReactNode
  className?: string
  isNavigator?: boolean
  onScrollFrame?: (values: { top: number; scrollTop: number; scrollHeight: number; clientHeight: number }) => void
}

// Styled components reproduisant les styles Gatsby
const ScrollContainer = styled(Box)({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
})

const ScrollContent = styled(motion.div)({
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  willChange: 'transform',
})

export default function SpringScrollbars({ 
  children, 
  className = '',
  isNavigator: _isNavigator = false,
  onScrollFrame 
}: SpringScrollbarsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollToTop, setScrollToTop } = useUIPreferences()
  
  // Motion values pour le scroll spring avec paramètres optimisés
  const y = useMotionValue(0)
  const springY = useSpring(y, {
    damping: 30,
    mass: 0.3,
    restDelta: 0.001, // Plus précis pour les positions exactes
    stiffness: 500
  })
  
  // Référence pour les dimensions
  const scrollMetrics = useRef({
    clientHeight: 0,
    scrollHeight: 0,
    scrollTop: 0
  })

  // API publique reproduisant l'interface Gatsby avec sync scrollbar
  const scrollTop = useCallback((targetY: number) => {
    const container = containerRef.current
    if (!container) return
    
    const { clientHeight, scrollHeight } = container
    const maxScroll = Math.max(0, scrollHeight - clientHeight)
    const clampedY = Math.max(0, Math.min(targetY, maxScroll))
    
    // Animation spring vers la position cible
    y.set(-clampedY)
    
    // Synchroniser avec la scrollbar native si elle existe
    const scrollableElement = container.querySelector('[style*="overflow"]') as HTMLElement
    if (scrollableElement) {
      scrollableElement.scrollTop = clampedY
    }
  }, [y])

  // Gestion du scrollToTop depuis le store (comme dans Gatsby)
  // Safe implementation to prevent infinite loops
  useEffect(() => {
    if (scrollToTop) {
      const timeoutId = setTimeout(() => {
        scrollTop(0)
        setScrollToTop(false)
        
        // Forcer la vérification lazy load comme dans l'original
        if (typeof window !== 'undefined' && (window as any).forceCheck) {
          setTimeout(() => (window as any).forceCheck(), 100)
        }
      }, 0) // Use timeout to prevent sync state updates
      
      return () => clearTimeout(timeoutId)
    }
  }, [scrollToTop]) // Only depend on scrollToTop, not setScrollToTop or scrollTop

  // Gestion du scroll wheel
  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault()
    
    const container = containerRef.current
    if (!container) return
    
    const { clientHeight, scrollHeight } = container
    const maxScroll = Math.max(0, scrollHeight - clientHeight)
    
    // Si pas de contenu à défiler, ne rien faire
    if (maxScroll <= 0) return
    
    const currentY = y.get()
    const deltaY = event.deltaY
    let newY = currentY - deltaY
    
    // Contraintes de défilement avec élasticité aux bords améliorée
    if (newY > 0) {
      // Résistance très légère en haut pour permettre d'atteindre exactement le top
      newY = newY * 0.05
    } else if (newY < -maxScroll) {
      // Résistance en bas (au-dessous du contenu)
      newY = -maxScroll + (newY + maxScroll) * 0.1
    }
    
    y.set(newY)
    
    // Mettre à jour les métriques
    const scrollTop = Math.max(0, Math.min(-newY, maxScroll))
    scrollMetrics.current = { clientHeight, scrollHeight, scrollTop }
    
    // Callback comme dans l'original avec normalisation corrigée
    if (onScrollFrame) {
      // Normalisation 0-1 au lieu de 0.01-0.99 pour permettre les extrêmes
      const normalizedTop = scrollHeight > clientHeight 
        ? Math.max(0, Math.min(1, scrollTop / maxScroll))
        : 0
      onScrollFrame({ 
        clientHeight, 
        scrollHeight, 
        scrollTop, 
        top: normalizedTop 
      })
    }
  }, [y, onScrollFrame])

  // Gestion tactile (pan gesture)
  const handlePanStart = useCallback(() => {
    // Arrêter toute animation en cours
    y.stop()
  }, [y])

  const handlePan = useCallback((_: any, info: PanInfo) => {
    const container = containerRef.current
    if (!container) return
    
    const { clientHeight, scrollHeight } = container
    const maxScroll = Math.max(0, scrollHeight - clientHeight)
    
    // Si pas de contenu à défiler, ne rien faire
    if (maxScroll <= 0) return
    
    const currentY = y.get()
    let newY = currentY + info.delta.y
    
    // Permettre un dépassement élastique mais avec contrainte douce
    if (newY > 0) {
      // Résistance en haut
      newY = newY * 0.3
    } else if (newY < -maxScroll) {
      // Résistance en bas
      newY = -maxScroll + (newY + maxScroll) * 0.3
    }
    
    y.set(newY)
  }, [y])

  const handlePanEnd = useCallback((_: any, info: PanInfo) => {
    const container = containerRef.current
    if (!container) return
    
    const { clientHeight, scrollHeight } = container
    const maxScroll = Math.max(0, scrollHeight - clientHeight)
    
    if (maxScroll <= 0) return
    
    const currentY = y.get()
    const velocity = info.velocity.y
    
    // Calculer la position finale avec inertie
    let targetY = currentY + velocity * 0.1
    
    // Ramener dans les limites avec un effet de ressort
    if (targetY > 0) {
      // Retour en position haute
      targetY = 0
    } else if (targetY < -maxScroll) {
      // Retour en position basse
      targetY = -maxScroll
    }
    
    // Animation vers la position finale
    y.set(targetY)
  }, [y])

  // Setup des event listeners
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    container.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  // Observer pour les changements de contenu
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const resizeObserver = new ResizeObserver(() => {
      const { clientHeight, scrollHeight } = container
      scrollMetrics.current = { 
        ...scrollMetrics.current,
        clientHeight, 
        scrollHeight 
      }
    })
    
    resizeObserver.observe(container)
    
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <ScrollContainer 
      ref={containerRef}
      className={`spring-scrollbars ${className}`}
    >
      <ScrollContent
        ref={contentRef}
        style={{ y: springY }}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        drag="y"
        dragConstraints={false}
        dragElastic={0.2}
        dragMomentum={true}
      >
        {children}
      </ScrollContent>
    </ScrollContainer>
  )
}

// Export des types pour compatibilité
export type { SpringScrollbarsProps }
