import ArticleCard from './ArticleCard'
import type { Post } from '@/types'

export default function ArticleGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Aucun article trouvé
        </h2>
        <p className="text-gray-600">
          Essayez d'ajuster vos filtres ou revenez plus tard pour du nouveau contenu.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Grid articles - 3 colonnes sur desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
