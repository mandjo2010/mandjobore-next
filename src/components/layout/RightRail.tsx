'use client'

import { Home, Filter, Search, Maximize2, ArrowUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function RightRail({
  onOpenFilter,
  onOpenSearch,
}: {
  onOpenSearch: () => void
  onOpenFilter: () => void
}) {
  const router = useRouter()
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error)
    } else {
      document.exitFullscreen().catch(console.error)
    }
  }

  return (
    <aside className="rightRail" aria-label="Quick actions">
      <div className="rightRailTop">
        <button aria-label="Home" onClick={() => router.push('/')}>
          <Home size={18} />
        </button>
        <button aria-label="Filter" onClick={onOpenFilter}>
          <Filter size={18} />
        </button>
        <button aria-label="Search" onClick={onOpenSearch}>
          <Search size={18} />
        </button>
      </div>
      <div className="rightRailBottom">
        <button aria-label="Fullscreen" onClick={toggleFullscreen}>
          <Maximize2 size={18} />
        </button>
        <button
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </aside>
  )
}
