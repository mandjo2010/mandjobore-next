'use client'

import { useState } from 'react'
import { Search, Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Navigation principale */}
          <nav className="flex items-center space-x-8">
            <span className="text-sm font-medium text-gray-900 border-b-2 border-blue-600 pb-1">
              all posts
            </span>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-md hover:bg-gray-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-md hover:bg-gray-100"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsSearchOpen(false)}>
          <div className="flex items-start justify-center pt-16 px-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 py-3 text-gray-900 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
