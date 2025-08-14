import { useEffect } from 'react'

export default function useScrollToTop(container?: HTMLElement | null) {
  useEffect(() => {
    const win: Window | undefined = typeof window !== 'undefined' ? window : undefined
    const target: Window | HTMLElement | undefined = container ?? win
    if (!target) return

    if (target === win) {
      win!.scrollTo({ behavior: 'smooth', top: 0 })
    } else {
      // HTMLElement has optional scrollTo in lib.dom
      ;(target as HTMLElement).scrollTo?.({ behavior: 'smooth', top: 0 })
    }
  }, [container])
}
