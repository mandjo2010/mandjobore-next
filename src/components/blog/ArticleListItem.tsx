import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/types'

interface ArticleListItemProps {
  post: Post
}

export default function ArticleListItem({ post }: ArticleListItemProps) {
  return (
    <article className="group hover:bg-gray-25 transition-colors duration-200 cursor-pointer py-4">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex items-start space-x-4">
          {/* Thumbnail ovale penchée - Plus proche de la sidebar gauche */}
          <div className="flex-shrink-0 -ml-2">
            <div 
              className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 transform -rotate-[65deg] group-hover:rotate-[65deg] transition-transform duration-300 ease-out"
              style={{ clipPath: 'ellipse(38px 35px at 50% 50%)' }}
            >
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transform rotate-[65deg]"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg transform rotate-[65deg]">
                    {post.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Contenu textuel uniquement */}
          <div className="flex-1 min-w-0 pl-2">
            {/* Titre */}
            <h2 className="text-xl font-medium text-gray-900 mb-2 leading-tight">
              {post.title}
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed">
              {post.excerpt || post.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}
