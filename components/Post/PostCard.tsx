import Link from 'next/link'
import React from 'react'
import animations from '@/styles/AdvancedAnimations.module.css'

interface PostSummary {
  slug: string
  title: string
  date: string
  cover?: string | null
  description?: string
}

export default function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className={`p-6 border-b border-gray-200 ${animations.articleInteractive} ${animations.lazyLoadElement} ${animations.themeTransition}`}>
      {post.cover && (
        <img 
          src={post.cover} 
          alt={post.title} 
          className={`mb-6 mt-2 w-full h-32 object-cover rounded ${animations.interactiveElement}`}
        />
      )}
      <h3 className={`text-xl font-semibold ${animations.responsiveTypography}`}>
        <Link 
          href={`/posts/${post.slug}`} 
          className={`hover:underline ${animations.interactiveElement}`}
        >
          {post.title}
        </Link>
      </h3>
      <p className="text-gray-600 text-sm">{post.date}</p>
      {post.description && <p className="mt-2 text-gray-800">{post.description}</p>}
      <div className="mt-3">
        <Link 
          href={`/posts/${post.slug}`} 
          className={`text-blue-600 hover:underline ${animations.interactiveElement}`}
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
