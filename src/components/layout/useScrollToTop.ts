import { useEffect } from 'react'

export default function useScrollToTop(container?: HTMLElement | null) {
  useEffect(() => {
    const win: Window | undefined = typeof window !== 'undefined' ? window : undefined
    const target: Window | HTMLElement | undefined = container ?? win
    if (!target) return

    if (target === win) {
      win!.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // HTMLElement has optional scrollTo in lib.dom
      ;(target as HTMLElement).scrollTo?.({ top: 0, behavior: 'smooth' })
    }
  }, [container])
}
