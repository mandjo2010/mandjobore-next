'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react'
import ProfileSidebar from '@/components/layout/ProfileSidebar'
import ActionsSidebar from '@/components/layout/ActionsSidebar'
import SearchOverlay from '@/components/ui/SearchOverlay'
import type { Post } from '@/types'

interface ArticleDetailViewProps {
  post: Post
  allPosts?: Post[]
}

export default function ArticleDetailView({ post, allPosts = [] }: ArticleDetailViewProps) {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false)

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
    window.location.href = '/'
  }

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* SIDEBAR GAUCHE - Profile */}
      <ProfileSidebar 
        onPostsListToggle={() => {}}
        showPostsList={false}
        posts={allPosts}
      />
      
      {/* CONTENU PRINCIPAL - Article avec scrollbar */}
      <main className="lg:ml-80 lg:mr-16 flex-1 overflow-y-auto h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Navigation retour */}
          <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 z-10">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux articles
            </Link>
          </nav>

          {/* Contenu de l'article - Zone scrollable */}
          <article className="px-6 py-12">
            {/* En-tête de l'article */}
            <header className="mb-12">
              {/* Image de couverture */}
              {post.coverImage && (
                <div className="aspect-video mb-8 rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              )}

              {/* Titre */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Métadonnées */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                {post.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                )}
                
                {post.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime}</span>
                  </div>
                )}

                {post.category && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Description/Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-gray-700 leading-relaxed mb-12 border-l-4 border-blue-500 pl-6 italic">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Contenu de l'article */}
            <div className="prose prose-lg max-w-none">
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <div className="text-gray-600 space-y-6">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                    in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                    veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
                    sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
                    adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
                    dolore magnam aliquam quaerat voluptatem.
                  </p>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation vers l'article suivant/précédent */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <Link
                  href="/"
                  className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Tous les articles
                </Link>
                
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Haut de page ↑
                </button>
              </div>
            </div>
          </article>
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
        posts={allPosts}
      />
    </div>
  )
}
