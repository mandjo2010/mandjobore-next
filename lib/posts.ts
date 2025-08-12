import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface PostData {
  slug: string
  date: string
  title: string
  cover: string | null
  description: string
  tags: string[]
  content: string
}

const postsDir = path.join(process.cwd(), 'content', 'posts')

export function getAllPosts() {
  const dirs = fs.readdirSync(postsDir)
  const posts = dirs.map((dir) => {
    const file = path.join(postsDir, dir, 'index.md')
    const source = fs.readFileSync(file, 'utf-8')
    const { data, content } = matter(source)
    return {
      slug: dir.split('--').slice(1).join('--'),
      date: data.date || dir.split('--')[0],
      title: data.title || 'Untitled',
      cover: data.cover || null,
      description: data.description || '',
      tags: data.tags || [],
      content,
    }
  })
  return posts.sort((a: PostData, b: PostData) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string) {
  const dir = fs.readdirSync(postsDir).find((d) => d.endsWith(`--${slug}`))
  if (!dir) return null
  const file = path.join(postsDir, dir, 'index.md')
  const source = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(source)
  return {
    slug,
    date: data.date || dir.split('--')[0],
    title: data.title || 'Untitled',
    cover: data.cover || null,
    description: data.description || '',
    tags: data.tags || [],
    content,
  }
}

export function getAllPostSlugs() {
  const dirs = fs.readdirSync(postsDir)
  return dirs.map((d) => d.split('--').slice(1).join('--'))
}
