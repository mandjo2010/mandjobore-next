/**
 * SpringScrollbars - Reproduction fidèle du scroll inertiel de Gatsby
 * Correspondance avec src/components/SpringScrollbars/springScrollbars.js
 * Utilise Framer Motion au lieu de Rebound pour la compatibilité React 19
 */
'use client'

import React, { useRef, useEffect, useCallback, ReactNode, forwardRef, useImperativeHandle } from 'react'
import { motion, useSpring, useMotionValue, PanInfo } from 'framer-motion'
import { Box, styled } from '@mui/material'
import { useGatsbyUIStore, useUIPreferences } from '@/store/gatsby-ui-store'

interface SpringScrollbarsProps {
  children: ReactNode
  className?: string
  isNavigator?: boolean
  onScrollFrame?: (values: { top: number; scrollTop: number; scrollHeight: number; clientHeight: number }) => void
}

// Styled components reproduisant les styles Gatsby
const ScrollContainer = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
})

const ScrollContent = styled(motion.div)({
  willChange: 'transform',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
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
  isNavigator = false,
  onScrollFrame 
}: SpringScrollbarsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollToTop, setScrollToTop } = useUIPreferences()
  
  // Motion values pour le scroll spring
  const y = useMotionValue(0)
  const springY = useSpring(y, {
    stiffness: 300,
    damping: 30,
    mass: 0.8
  })
  
  // Référence pour les dimensions
  const scrollMetrics = useRef({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0
  })

  // API publique reproduisant l'interface Gatsby
  const getScrollTop = useCallback(() => {
    return Math.abs(springY.get())
  }, [springY])

  const scrollTop = useCallback((targetY: number) => {
    const container = containerRef.current
    if (!container) return
    
    const { scrollHeight, clientHeight } = container
    const maxScroll = Math.max(0, scrollHeight - clientHeight)
    const clampedY = Math.max(0, Math.min(targetY, maxScroll))
    
    // Animation spring vers la position cible
    y.set(-clampedY)
  }, [y])

  // Gestion du scrollToTop depuis le store (comme dans Gatsby)
  useEffect(() => {
    if (scrollToTop) {
      scrollTop(0)
      setScrollToTop(false)
      
      // Forcer la vérification lazy load comme dans l'original
      if (typeof window !== 'undefined' && window.forceCheck) {
        setTimeout(() => window.forceCheck(), 100)
      }
    }
  }, [scrollToTop, scrollTop, setScrollToTop])

  // Gestion du scroll wheel
  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault()
    
    const container = containerRef.current
    if (!container) return
    
    const { scrollHeight, clientHeight } = container
    const maxScroll = Math.max(0, scrollHeight - clientHeight)
    
    const currentY = y.get()
    const deltaY = event.deltaY
    const newY = Math.max(-maxScroll, Math.min(0, currentY - deltaY))
    
    y.set(newY)
    
    // Mettre à jour les métriques
    const scrollTop = Math.abs(newY)
    scrollMetrics.current = { scrollTop, scrollHeight, clientHeight }
    
    // Callback comme dans l'original
    if (onScrollFrame) {
      const normalizedTop = scrollHeight > clientHeight 
        ? mapValueInRange(scrollTop, 0, maxScroll, 0.01, 0.99)
        : 0
      onScrollFrame({ 
        top: normalizedTop, 
        scrollTop, 
        scrollHeight, 
        clientHeight 
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
    
    const { scrollHeight, clientHeight } = container
    const maxScroll = Math.max(0, scrollHeight - clientHeight)
    
    const currentY = y.get()
    const newY = Math.max(-maxScroll, Math.min(0, currentY + info.delta.y))
    
    y.set(newY)
  }, [y])

  const handlePanEnd = useCallback((_: any, info: PanInfo) => {
    const container = containerRef.current
    if (!container) return
    
    const { scrollHeight, clientHeight } = container
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
      const { scrollHeight, clientHeight } = container
      scrollMetrics.current = { 
        ...scrollMetrics.current,
        scrollHeight, 
        clientHeight 
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
