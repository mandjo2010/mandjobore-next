import Link from 'next/link'
import React from 'react'

import useSearchOverlay from '../../hooks/useSearchOverlay'
import SearchOverlay from '../Search/SearchOverlay'

export default function RightSidebar({ context = 'home', posts = [] }: { context?: 'home' | 'post'; posts?: Array<{ slug: string; title: string; description?: string }> }) {
  const isPost = context === 'post'
  const { close, isOpen, open } = useSearchOverlay(false)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen()
    else document.exitFullscreen()
  }

  return (
    <>
      <div className="p-2 flex flex-col items-center gap-2 text-xs">
        <Link href="/" className="w-10 h-10 grid place-items-center rounded hover:bg-gray-100" title="Back to list" aria-label="Back to home">🏠</Link>
        <button className="w-10 h-10 grid place-items-center rounded hover:bg-gray-100" title="Filter" aria-label="Filter">🔎</button>
        <button className="w-10 h-10 grid place-items-center rounded hover:bg-gray-100" title="Search" aria-label="Open search" onClick={open}>🔍</button>
        <button className="w-10 h-10 grid place-items-center rounded hover:bg-gray-100" title="Fullscreen" aria-label="Toggle fullscreen" onClick={toggleFullscreen}>⛶</button>
        <button className="w-10 h-10 grid place-items-center rounded hover:bg-gray-100" title="Scroll to top" aria-label="Scroll to top" onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}>⬆</button>
        <button className="w-10 h-10 grid place-items-center rounded hover:bg-gray-100 disabled:opacity-40" disabled={!isPost} title="Change font size" aria-label="Change font size">A↕</button>
      </div>

      <SearchOverlay isOpen={isOpen} onClose={close} posts={posts} />
    </>
  )
}
