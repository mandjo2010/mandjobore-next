import { create } from 'zustand'

// Store minimal sans persist pour identifier le problème
interface SimpleUIState {
  test: string
  setTest: (value: string) => void
}

export const useSimpleUIStore = create<SimpleUIState>((set) => ({
  test: 'hello',
  setTest: (value) => set({ test: value })
}))

// Export temporaire pour remplacer useUIStore
export const useUIStore = useSimpleUIStore
