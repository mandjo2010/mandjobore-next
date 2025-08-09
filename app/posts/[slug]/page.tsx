import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import ArticleDetailView from '@/components/blog/ArticleDetailView'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const allPosts = getAllPosts()

  if (!post) {
    notFound()
  }

  return <ArticleDetailView post={post} allPosts={allPosts} />
}
