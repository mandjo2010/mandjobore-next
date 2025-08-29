import React, { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PostDetail {
  slug: string
  title: string
  date: string
  content?: string
  cover?: string | null
}

export default function PostContent({ post }: { post: PostDetail }) {
  const [fontScale, _setFontScale] = useState(1)
  const content = useMemo(() => post.content || '', [post])

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-600">{post.date}</p>
      </header>

      {post.cover && (
        <img src={post.cover} alt={post.title} className="mb-6 w-full max-h-80 object-cover rounded" />
      )}

      <div style={{ fontSize: `${fontScale}rem` }} className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>

      <div className="mt-8 text-sm text-gray-500">{/* TODO: share actions */}</div>
    </div>
  )
}
