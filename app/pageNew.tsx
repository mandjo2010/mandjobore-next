import { getAllPosts } from '@/lib/posts'
import ArticleGrid from '@/components/blog/ArticleGrid'

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-6xl mx-auto">
      <ArticleGrid posts={posts} title="All Posts" />
    </div>
  )
}
