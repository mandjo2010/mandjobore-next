/**
 * NavigatorBorderScrollbar - Barre de défilement auto-hide authentique Gatsby v1
 * Positionnée sur la ligne de démarcation Navigator/ActionsBar
 * Version optimisée avec propriétés fidèles à l'original
 */
'use client'

import React, { useRef, useEffect, useCallback } from 'react'

interface NavigatorBorderScrollbarProps {
  targetElementRef: React.RefObject<HTMLElement | null>
  className?: string
  forceCheckOnScroll?: boolean
  isNavigator?: boolean
}

export default function NavigatorBorderScrollbar({ 
  className = '',
  forceCheckOnScroll: _forceCheckOnScroll = true,
  isNavigator: _isNavigator = true,
  targetElementRef
}: NavigatorBorderScrollbarProps) {
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const hideTimeoutRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Calcul des dimensions et position du thumb (authentique Gatsby v1)
  const updateScrollbar = useCallback(() => {
    if (!targetElementRef.current || !scrollbarRef.current || !thumbRef.current) return

    const target = targetElementRef.current
    const scrollbar = scrollbarRef.current
    const thumb = thumbRef.current

    const scrollHeight = target.scrollHeight
    const clientHeight = target.clientHeight
    const scrollTop = target.scrollTop

    // Si pas de scroll nécessaire, cacher la barre (authentique Gatsby v1)
    if (scrollHeight <= clientHeight) {
      scrollbar.style.opacity = '0'
      return
    }

    // Calculer la taille et position du thumb avec proportions adaptées
    const thumbHeight = Math.max(24, (clientHeight / scrollHeight) * clientHeight) // Min 24px pour visibilité
    const maxScrollTop = scrollHeight - clientHeight
    const thumbTop = maxScrollTop > 0 ? (scrollTop / maxScrollTop) * (clientHeight - thumbHeight) : 0

    thumb.style.height = `${thumbHeight}px`
    thumb.style.transform = `translateY(${thumbTop}px)`
    
    // Auto-show pendant le scroll
    showScrollbar()
  }, [targetElementRef]) // eslint-disable-line react-hooks/exhaustive-deps

  // AutoHide authentique (timing Gatsby v1)
  const showScrollbar = useCallback(() => {
    if (!scrollbarRef.current) return
    
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
    scrollbarRef.current.style.opacity = '1'
  }, [])

  const hideScrollbar = useCallback(() => {
    if (!scrollbarRef.current || isDraggingRef.current) return
    
    // Délai exact de Gatsby v1 pour l'auto-hide
    hideTimeoutRef.current = window.setTimeout(() => {
      if (scrollbarRef.current && !isDraggingRef.current) {
        scrollbarRef.current.style.opacity = '0'
      }
    }, 1000)
  }, [])

  // Animation fluide avec requestAnimationFrame (authentique Gatsby v1)
  const smoothScrollTo = useCallback((targetScrollTop: number) => {
    if (!targetElementRef.current) return
    
    const target = targetElementRef.current
    const start = target.scrollTop
    const distance = targetScrollTop - start
    const duration = 300 // Durée animation comme Gatsby v1
    let startTime: number | null = null

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out) comme Gatsby v1
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      target.scrollTop = start + (distance * easeOut)
      updateScrollbar()
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateScroll)
      }
    }
    
    animationFrameRef.current = requestAnimationFrame(animateScroll)
  }, [targetElementRef, updateScrollbar])

  // Gestion du drag avec animation fluide
  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isDraggingRef.current = true
    showScrollbar()

    const startY = e.clientY
    const target = targetElementRef.current
    const thumb = thumbRef.current
    
    if (!target || !thumb) return

    const clientHeight = target.clientHeight
    const scrollHeight = target.scrollHeight
    const thumbHeight = parseFloat(thumb.style.height || '24') // Nouvelle taille minimum
    const maxScrollTop = scrollHeight - clientHeight

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return

      const deltaY = e.clientY - startY
      const maxThumbTop = clientHeight - thumbHeight
      
      if (maxThumbTop > 0 && maxScrollTop > 0) {
        const thumbTop = Math.max(0, Math.min(deltaY, maxThumbTop))
        const scrollRatio = thumbTop / maxThumbTop
        const newScrollTop = scrollRatio * maxScrollTop
        
        // Animation fluide pendant le drag
        smoothScrollTo(newScrollTop)
      }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      hideScrollbar()
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [targetElementRef, smoothScrollTo, showScrollbar, hideScrollbar])

  // Écouter les événements (authentique Gatsby v1)
  useEffect(() => {
    const target = targetElementRef.current
    if (!target) return

    const handleScroll = () => {
      updateScrollbar()
      showScrollbar()
      hideScrollbar()
    }

    const handleMouseEnter = showScrollbar
    const handleMouseLeave = hideScrollbar

    target.addEventListener('scroll', handleScroll, { passive: true })
    target.addEventListener('mouseenter', handleMouseEnter)
    target.addEventListener('mouseleave', handleMouseLeave)

    // Initial update
    updateScrollbar()

    return () => {
      target.removeEventListener('scroll', handleScroll)
      target.removeEventListener('mouseenter', handleMouseEnter)
      target.removeEventListener('mouseleave', handleMouseLeave)
      
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [targetElementRef, updateScrollbar, showScrollbar, hideScrollbar])

  return (
    <div
      ref={scrollbarRef}
      className={`navigator-border-scrollbar ${className}`}
      role="scrollbar"
      aria-orientation="vertical"
      tabIndex={0}
      style={{
        backgroundColor: 'transparent',
        bottom: '20px',  // Marge de 20px en bas pour éviter les bords
        opacity: '0',  // AutoHide par défaut
        pointerEvents: 'none', // Permet le survol du Navigator derrière
        position: 'fixed',
        right: '60px', // Décalé de 4px pour plus de visibilité
        top: '20px',   // Marge de 20px en haut pour éviter les bords
        transition: 'opacity 0.2s ease', // Animation douce comme Gatsby v1
        width: '8px',  // Plus large pour visibilité (malvoyants)
        zIndex: 1000
      }}
      onMouseEnter={showScrollbar}
      onMouseLeave={hideScrollbar}
    >
      {/* Track transparent - invisible (seul le thumb est visible) */}
      <div
        style={{
          backgroundColor: 'transparent', // Complètement transparent
          border: 'none', // Pas de bordure visible
          borderRadius: '4px',
          bottom: 0,
          boxShadow: 'none', // Pas d'ombre
          left: 0,
          pointerEvents: 'auto',
          position: 'absolute',
          right: 0,
          top: 0
        }}
      />
      
      {/* Thumb volumineux avec relief */}
      <div
        ref={thumbRef}
        role="button"
        aria-label="Scrollbar thumb"
        tabIndex={0}
        style={{
          backgroundColor: '#d0d0d0', // Plus clair et doux
          border: '1px solid #c0c0c0', // Bordure plus claire
          borderRadius: '3px', // Forme cylindrique
          boxShadow: `
            0 1px 2px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.5)
          `, // Effet relief 3D plus doux
          cursor: 'pointer',
          left: '1px',  // Marge interne
          minHeight: '24px', // Plus haut pour visibilité
          pointerEvents: 'auto',
          position: 'absolute',
          right: '1px',
          transition: isDraggingRef.current ? 'none' : 'all 0.2s ease'
        }}
        onMouseDown={handleThumbMouseDown}
        onMouseEnter={() => {
          if (thumbRef.current) {
            thumbRef.current.style.backgroundColor = '#b8b8b8' // Hover plus clair
            thumbRef.current.style.borderColor = '#a8a8a8'
            thumbRef.current.style.boxShadow = `
              0 2px 4px rgba(0,0,0,0.15),
              inset 0 1px 0 rgba(255,255,255,0.6)
            `
          }
        }}
        onMouseLeave={() => {
          if (thumbRef.current && !isDraggingRef.current) {
            thumbRef.current.style.backgroundColor = '#d0d0d0' // Retour normal plus clair
            thumbRef.current.style.borderColor = '#c0c0c0'
            thumbRef.current.style.boxShadow = `
              0 1px 2px rgba(0,0,0,0.1),
              inset 0 1px 0 rgba(255,255,255,0.5)
            `
          }
        }}
      />
    </div>
  )
}
