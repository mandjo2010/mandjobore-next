import ArticleListItem from './ArticleListItem'

export default function ArticleListView({
  posts,
}: { posts: Array<{ slug: string; title: string; excerpt: string; image: string }> }) {
  return (
    <ul className="postList">
      {posts.map(p => (
        <ArticleListItem
          key={p.slug}
          href={`/posts/${p.slug}`}
          title={p.title}
          excerpt={p.excerpt}
          image={p.image || '/images/placeholder.jpg'}
        />
      ))}
    </ul>
  )
}
