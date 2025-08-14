import { useCallback, useState } from 'react'

export default function useSearchOverlay(initial = false) {
  const [isOpen, setIsOpen] = useState<boolean>(initial)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  return { close, isOpen, open, toggle }
}
