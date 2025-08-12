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
	toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
	togglePostsList: () => set((s) => ({ showPostsList: !s.showPostsList })),
}))
