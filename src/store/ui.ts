import { create } from 'zustand'

type UIState = {
	isSearchOpen: boolean
	showPostsList: boolean
	toggleSearch: () => void
	togglePostsList: () => void
}

export const useUIStore = create<UIState>((set) => ({
	isSearchOpen: false,
	showPostsList: false,
	togglePostsList: () => set((s) => ({ showPostsList: !s.showPostsList })),
	toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
}))
