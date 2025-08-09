import { getAllPosts } from '@/lib/posts'
import ClientHomePage from '@/components/pages/ClientHomePage'

export default async function HomePage() {
  const posts = getAllPosts()

  return <ClientHomePage posts={posts} />
}
