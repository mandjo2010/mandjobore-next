/**
 * Hook responsive isolé pour éviter les boucles infinies avec le store
 */
import { useState, useEffect } from 'react'

const isWideScreen = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 1024 // breakpoint L
}

export const useResponsiveDetector = () => {
  const [isWide, setIsWide] = useState(false)

  useEffect(() => {
    // État initial
    setIsWide(isWideScreen())

    const handleResize = () => {
      setIsWide(isWideScreen())
    }

    // Throttler simple
    let timeoutId: NodeJS.Timeout
    const throttledResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 150)
    }

    window.addEventListener('resize', throttledResize)
    
    return () => {
      window.removeEventListener('resize', throttledResize)
      clearTimeout(timeoutId)
    }
  }, []) // Pas de dépendances

  return isWide
}
