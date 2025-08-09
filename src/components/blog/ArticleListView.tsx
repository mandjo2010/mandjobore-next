import ArticleListItem from './ArticleListItem'
import type { Post } from '@/types'

interface ArticleListViewProps {
  posts: Post[]
}

export default function ArticleListView({ posts }: ArticleListViewProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500 text-lg">Aucun article trouvé.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Liste verticale d'articles SANS séparateurs - Design épuré */}
      <div className="space-y-0">
        {posts.map((post) => (
          <ArticleListItem 
            key={post.slug} 
            post={post}
          />
        ))}
      </div>
    </div>
  )
}
