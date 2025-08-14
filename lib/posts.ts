import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

import type { PostCard } from '@/types'

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
    const { content, data } = matter(source)
    return {
      content,
      cover: data.cover || null,
      date: data.date || dir.split('--')[0],
      description: data.description || '',
      slug: dir.split('--').slice(1).join('--'),
      tags: data.tags || [],
      title: data.title || 'Untitled',
    }
  })
  return posts.sort((a: PostData, b: PostData) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string) {
  const dir = fs.readdirSync(postsDir).find((d) => d.endsWith(`--${slug}`))
  if (!dir) return null
  const file = path.join(postsDir, dir, 'index.md')
  const source = fs.readFileSync(file, 'utf-8')
  const { content, data } = matter(source)
  return {
    content,
    cover: data.cover || null,
    date: data.date || dir.split('--')[0],
    description: data.description || '',
    slug,
    tags: data.tags || [],
    title: data.title || 'Untitled',
  }
}

export function getAllPostSlugs() {
  const dirs = fs.readdirSync(postsDir)
  return dirs.map((d) => d.split('--').slice(1).join('--'))
}

export function getAllPostsForList(): PostCard[] {
  const dirs = fs.readdirSync(postsDir)
  const posts = dirs.map((dir) => {
    const file = path.join(postsDir, dir, 'index.md')
    const source = fs.readFileSync(file, 'utf-8')
    const { data } = matter(source)

    return {
      category: data.category || '',
      cover: data.cover || '/images/placeholder.png',
      excerpt: data.description || data.excerpt || '',
      slug: dir.split('--').slice(1).join('--'),
      title: data.title || 'Untitled',
    } satisfies PostCard
  })

  return posts.sort((a, b) => {
    const dateA = dirs.find((d) => d.endsWith(`--${a.slug}`))?.split('--')[0] || ''
    const dateB = dirs.find((d) => d.endsWith(`--${b.slug}`))?.split('--')[0] || ''
    return dateA > dateB ? -1 : 1
  })
}

// Nouveau format pour la liste GatsbyJS minimaliste
export function getGatsbyStyleArticles() {
  return [
    { category: "Agro", id: 1, title: "Surveillance forestière par télédétection" },
    { category: "Data Viz", id: 2, title: "Cartographie web interactive avec Leaflet" },
    { category: "Satellite", id: 3, title: "Photogrammétrie par drone et traitement d'images" },
    { category: "Data Viz", id: 4, title: "Analyse de données climatiques avec Python" },
    { category: "Spatial Data", id: 5, title: "Automatisation QGIS avec PyQGIS" },
    { category: "Spatial Data", id: 6, title: "PostGIS : Base de données spatiales avec PostgreSQL" },
    { category: "Agro", id: 7, title: "Machine Learning appliqué à l'agriculture" },
    { category: "Data Viz", id: 8, title: "Tableau pour la visualisation de données" },
    { category: "Spatial Data", id: 9, title: "Analyse SIG avec Python et GeoPandas" },
    { category: "Technologie", id: 10, title: "Le futur de l'intelligence artificielle" },
    { category: "Design", id: 11, title: "Design thinking et innovation" },
    { category: "Développement", id: 12, title: "L'art de la programmation fonctionnelle" }
  ]
}

// Adapter to ensure we always have image and excerpt for Gatsby-style rendering
export function adaptPostForGatsbyView(post: PostCard): { 
  slug: string; title: string; excerpt: string; image: string; category?: string; 
} {
  return {
    category: post.category,
    excerpt: post.excerpt || 'Découvrez cet article sur les technologies modernes et leurs applications.',
    image: post.cover || '/images/placeholder.png',
    slug: post.slug,
    title: post.title,
  }
}
