'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import ProfileSidebar from '@/components/layout/ProfileSidebar'
import ActionsSidebar from '@/components/layout/ActionsSidebar'
import SearchOverlay from '@/components/ui/SearchOverlay'
import type { Post } from '@/types'

interface MobileMenuProps {
  posts: Post[]
  showPostsList: boolean
  onPostsListToggle: () => void
}

function MobileMenu({ posts, showPostsList, onPostsListToggle }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-md"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative w-80 h-full bg-gray-50 border-r border-gray-200 overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
            >
              <X size={20} />
            </button>
            
            {/* Profile Sidebar Content */}
            <div className="pt-12">
              <ProfileSidebar 
                posts={posts}
                showPostsList={showPostsList}
                onPostsListToggle={onPostsListToggle}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

interface ResponsiveLayoutProps {
  children: React.ReactNode
  posts: Post[]
  showSearch?: boolean
  showFilter?: boolean
}

export default function ResponsiveLayout({ 
  children, 
  posts, 
  showSearch = true, 
  showFilter = true 
}: ResponsiveLayoutProps) {
  const [showPostsList, setShowPostsList] = useState(false)
  const [showSearchOverlay, setShowSearchOverlay] = useState(false)

  const handlePostsListToggle = () => {
    setShowPostsList(!showPostsList)
  }

  const handleSearchClick = () => {
    setShowSearchOverlay(true)
  }

  const handleSearchClose = () => {
    setShowSearchOverlay(false)
  }

  const handleFilterClick = () => {
    setShowSearchOverlay(true)
  }

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile Menu */}
      <MobileMenu 
        posts={posts}
        showPostsList={showPostsList}
        onPostsListToggle={handlePostsListToggle}
      />

      {/* Desktop Sidebar - Profile */}
      <div className="hidden lg:block">
        <ProfileSidebar 
          onPostsListToggle={handlePostsListToggle}
          showPostsList={showPostsList}
          posts={posts}
        />
      </div>
      
      {/* Main Content */}
      <main className="lg:ml-80 lg:mr-16 flex-1 pt-16 lg:pt-0">
        {children}
      </main>

      {/* Desktop Sidebar - Actions */}
      <div className="hidden lg:block">
        <ActionsSidebar 
          showFilter={showFilter}
          onHomeClick={handleHomeClick}
          onSearchClick={handleSearchClick}
          onFilterClick={handleFilterClick}
        />
      </div>

      {/* Mobile Action Buttons */}
      <div className="lg:hidden fixed bottom-4 right-4 flex flex-col space-y-2">
        {showSearch && (
          <button
            onClick={handleSearchClick}
            className="w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900"
          >
            <Menu size={20} />
          </button>
        )}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900"
        >
          ↑
        </button>
      </div>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={showSearchOverlay}
        onClose={handleSearchClose}
        posts={posts}
      />
    </div>
  )
}
