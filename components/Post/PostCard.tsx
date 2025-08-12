import React from 'react'
import Link from 'next/link'

interface PostSummary {
  slug: string
  title: string
  date: string
  cover?: string | null
  description?: string
}

export default function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="p-4 border-b border-gray-200">
      {post.cover && (
        <img src={post.cover} alt={post.title} className="mb-3 w-full h-40 object-cover rounded" />
      )}
      <h3 className="text-xl font-semibold">
        <Link href={`/posts/${post.slug}`} className="hover:underline">{post.title}</Link>
      </h3>
      <p className="text-gray-600 text-sm">{post.date}</p>
      {post.description && <p className="mt-2 text-gray-800">{post.description}</p>}
      <div className="mt-3">
        <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">Read more →</Link>
      </div>
    </article>
  )
}
