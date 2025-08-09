import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import type { Post } from '@/types'

interface ArticleCardProps {
  post: Post
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
      <Link href={`/blog/${post.slug}`}>
        {/* Image en haut - ratio 16:9 */}
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={post.coverImage || '/images/test-cover.svg'}
            alt={post.title}
            fill
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          />
          {/* Badge catégorie en overlay top-left */}
          <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            {post.category}
          </span>
        </div>

        {/* Contenu card */}
        <div className="p-4">
          {/* Meta info */}
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</span>
            <span className="mx-2">•</span>
            <Clock className="w-3 h-3 mr-1" />
            <span>{post.readingTime || '5 min'} de lecture</span>
          </div>

          {/* Titre - 2 lignes max */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {post.title}
          </h3>

          {/* Extrait - 3 lignes max */}
          <p className="text-gray-600 text-sm line-clamp-3 mb-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Link */}
          <div className="flex items-center justify-between">
            <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Lire l'article →
            </span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
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
