import { create } from 'zustand'

interface UIState {
  fontSize: number
  setFontSize: (size: number) => void
}

export const useUIStore = create<UIState>((set) => ({
  fontSize: 1.0,
  setFontSize: (size) => set({ fontSize: size }),
}))

// Hook de convenance
export const usePreferences = () => {
  const fontSize = useUIStore((state) => state.fontSize)
  const setFontSize = useUIStore((state) => state.setFontSize)
  
  return {
    fontSize,
    setFontSize
  }
}
