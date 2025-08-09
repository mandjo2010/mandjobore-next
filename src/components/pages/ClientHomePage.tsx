'use client'

import { useState } from 'react'
import ArticleListView from '@/components/blog/ArticleListView'
import ProfileSidebar from '@/components/layout/ProfileSidebar'
import ActionsSidebar from '@/components/layout/ActionsSidebar'
import SearchOverlay from '@/components/ui/SearchOverlay'
import type { Post } from '@/types'

interface ClientHomePageProps {
  posts: Post[]
}

export default function ClientHomePage({ posts }: ClientHomePageProps) {
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
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* SIDEBAR GAUCHE - Profile */}
      <ProfileSidebar 
        onPostsListToggle={handlePostsListToggle}
        showPostsList={showPostsList}
        posts={posts}
      />
      
      {/* CONTENU PRINCIPAL - Sans scrollbar sur la homepage */}
      <main className="lg:ml-80 lg:mr-16 flex-1 h-screen overflow-hidden">
        {/* Liste articles - Sans header, design épuré, avec scroll interne si nécessaire */}
        <div className="h-full overflow-y-auto">
          <div className="py-8 px-6 max-w-4xl">
            <ArticleListView posts={posts} />
          </div>
        </div>
      </main>

      {/* SIDEBAR DROITE - Actions */}
      <ActionsSidebar 
        showFilter={true}
        onHomeClick={handleHomeClick}
        onSearchClick={handleSearchClick}
        onFilterClick={handleFilterClick}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={showSearchOverlay}
        onClose={handleSearchClose}
        posts={posts}
      />
    </div>
  )
}
