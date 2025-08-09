import { getAllPosts } from '@/lib/posts'
import ArticleGrid from '@/components/blog/ArticleGrid'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <div>
      {/* Header de la page */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          All Posts
        </h1>
        <p className="text-gray-600">
          {posts.length} articles published
        </p>
      </div>

      {/* Grid des articles */}
      <ArticleGrid posts={posts} />
    </div>
  )
}AllPosts } from '@/lib/posts'
import ArticleGrid from '@/components/blog/ArticleGrid'

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-7xl">
      <ArticleGrid posts={posts} title="Tous les articles" />
    </div>
  )
}
