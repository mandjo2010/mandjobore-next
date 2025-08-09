'use client'

import { 
  Home, 
  Search, 
  Filter, 
  Type,
  Maximize, 
  ArrowUp 
} from 'lucide-react'

interface ActionsSidebarProps {
  onHomeClick?: () => void
  onSearchClick?: () => void
  onFilterClick?: () => void
  showFilter?: boolean
  showType?: boolean
}

export default function ActionsSidebar({ 
  onHomeClick, 
  onSearchClick,
  onFilterClick,
  showFilter = true, 
  showType = false 
}: ActionsSidebarProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <aside className="hidden lg:block fixed right-0 top-0 h-screen w-16 bg-white border-l border-gray-200 z-10">
      <div className="flex flex-col items-center py-4 h-full">
        {/* Actions du haut */}
        <div className="flex flex-col space-y-4 flex-1">
          <button
            onClick={onHomeClick}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            title="Home"
          >
            <Home size={20} />
          </button>
          
          {showFilter && (
            <button
              onClick={onFilterClick}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              title="Filter"
            >
              <Filter size={20} />
            </button>
          )}
          
          <button
            onClick={onSearchClick}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            title="Search"
          >
            <Search size={20} />
          </button>
        </div>
        
        {/* Actions du bas */}
        <div className="flex flex-col space-y-4">
          {showType && (
            <button
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              title="Change font size"
            >
              <Type size={20} />
            </button>
          )}
          
          <button
            onClick={toggleFullscreen}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            title="Toggle fullscreen"
          >
            <Maximize size={20} />
          </button>
          
          <button
            onClick={scrollToTop}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            title="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </aside>
  )
}
