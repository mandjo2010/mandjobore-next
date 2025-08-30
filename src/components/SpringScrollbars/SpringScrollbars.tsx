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

// Helper pour mapper les valeurs comme dans Rebound (MathUtil.mapValueInRange)
const mapValueInRange = (value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number => {
  const fromRangeSize = fromHigh - fromLow
  const toRangeSize = toHigh - toLow
  const valueScale = (value - fromLow) / fromRangeSize
  return toLow + (valueScale * toRangeSize)
}

export default function SpringScrollbars({ 
  children, 
  className = '',
  isNavigator: _isNavigator = false,
  onScrollFrame 
}: SpringScrollbarsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollToTop, setScrollToTop } = useUIPreferences()
  
  // Motion values pour le scroll spring
  const y = useMotionValue(0)
  const springY = useSpring(y, {
    damping: 30,
    mass: 0.8,
    stiffness: 300
  })
  
  // Référence pour les dimensions
  const scrollMetrics = useRef({
    clientHeight: 0,
    scrollHeight: 0,
    scrollTop: 0
  })

  // API publique reproduisant l'interface Gatsby
  // getScrollTop removed - was unused
  
  const scrollTop = useCallback((targetY: number) => {
    const container = containerRef.current
    if (!container) return
    
    const { clientHeight, scrollHeight } = container
    const maxScroll = Math.max(0, scrollHeight - clientHeight)
    const clampedY = Math.max(0, Math.min(targetY, maxScroll))
    
    // Animation spring vers la position cible
    y.set(-clampedY)
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
    
    const currentY = y.get()
    const deltaY = event.deltaY
    const newY = Math.max(-maxScroll, Math.min(0, currentY - deltaY))
    
    y.set(newY)
    
    // Mettre à jour les métriques
    const scrollTop = Math.abs(newY)
    scrollMetrics.current = { clientHeight, scrollHeight, scrollTop }
    
    // Callback comme dans l'original
    if (onScrollFrame) {
      const normalizedTop = scrollHeight > clientHeight 
        ? mapValueInRange(scrollTop, 0, maxScroll, 0.01, 0.99)
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
    
    const currentY = y.get()
    const newY = Math.max(-maxScroll, Math.min(0, currentY + info.delta.y))
    
    y.set(newY)
  }, [y])

  const handlePanEnd = useCallback((_: any, info: PanInfo) => {
    const container = containerRef.current
    if (!container) return
    
    const { clientHeight, scrollHeight } = container
    const maxScroll = Math.max(0, scrollHeight - clientHeight)
    
    // Appliquer l'inertie comme dans SpringScrollbars original
    const currentY = y.get()
    const velocity = info.velocity.y
    const targetY = Math.max(-maxScroll, Math.min(0, currentY + velocity * 0.1))
    
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
        dragConstraints={containerRef}
        dragElastic={0.1}
      >
        {children}
      </ScrollContent>
    </ScrollContainer>
  )
}

// Export des types pour compatibilité
export type { SpringScrollbarsProps }
