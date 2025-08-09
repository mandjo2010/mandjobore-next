import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { Post } from '@/types'

interface ArticleCardProps {
  post: Post
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <Link href={`/blog/${post.slug}`}>
        {/* Image de couverture - Style image de test bleue */}
        <div className="relative h-48">
          <div className="bg-blue-600 h-full flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-sm font-medium mb-2">{post.category}</div>
              <div className="text-lg font-semibold mb-1">Image de test</div>
              <div className="text-sm opacity-75">400 x 200</div>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4">
          {/* Meta informations */}
          <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{post.readingTime || '1 de lecture'}</span>
            </div>
          </div>

          {/* Titre */}
          <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
            {post.title}
          </h2>

          {/* Extrait */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Lien */}
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 transition-colors mb-4">
            <span>Lire l'article</span>
            <ArrowRight size={16} />
          </button>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
