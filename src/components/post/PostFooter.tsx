import PostAuthor from './PostAuthor'
import PostShare from './PostShare'

export default function PostFooter({
  excerpt,
  slug,
  title,
}: {
  slug: string
  title: string
  excerpt?: string
}) {
  const url = typeof window === 'undefined' ? '' : window.location.origin + slug
  return (
    <footer style={{ color: 'var(--title)' }}>
      <PostShare url={url} title={title} excerpt={excerpt} />
      <PostAuthor />
    </footer>
  )
}
