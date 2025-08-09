import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { Post, PostMatter, Page } from '@/types'
import { parseMarkdown, extractExcerpt } from './markdown'

const postsDirectory = path.join(process.cwd(), 'content/posts')
const pagesDirectory = path.join(process.cwd(), 'content/pages')

export function getPostSlugs() {
	if (!fs.existsSync(postsDirectory)) {
		return []
	}
	return fs.readdirSync(postsDirectory)
}

export function getPageSlugs() {
	if (!fs.existsSync(pagesDirectory)) {
		return []
	}
	return fs.readdirSync(pagesDirectory)
}

export function getPostBySlug(slug: string): Post | null {
	try {
		const realSlug = slug.replace(/\.md$/, '')
		const fullPath = path.join(postsDirectory, realSlug, 'index.md')

		if (!fs.existsSync(fullPath)) {
			return null
		}

		const fileContents = fs.readFileSync(fullPath, 'utf8')
		const { data, content } = matter(fileContents)
		const stats = readingTime(content)

		// Extraction du nom du dossier pour déterminer la catégorie et la date
		const folderName = realSlug
		const dateMatch = folderName.match(/^(\d{4}-\d{2}-\d{2})--/)
		const extractedDate = dateMatch
			? dateMatch[1]
			: new Date().toISOString().split('T')[0]

		return {
			slug: realSlug,
			title: data.title || 'Sans titre',
			date: data.date || extractedDate,
			excerpt: data.excerpt || extractExcerpt(content),
			content: parseMarkdown(content),
			coverImage: data.coverImage || null,
			category: data.category || 'General',
			tags: data.tags || [],
			readingTime: Math.ceil(stats.minutes),
			author: {
				name: data.author?.name || 'Mandjo Béa Boré',
				avatar: data.author?.avatar || '/images/avatar.jpg',
				bio: data.author?.bio || '',
			},
		}
	} catch (error) {
		console.error(`Error reading post ${slug}:`, error)
		return null
	}
}

export function getPageBySlug(slug: string) {
	try {
		const realSlug = slug.replace(/\.md$/, '')
		const fullPath = path.join(pagesDirectory, realSlug, 'index.md')

		if (!fs.existsSync(fullPath)) {
			return null
		}

		const fileContents = fs.readFileSync(fullPath, 'utf8')
		const { data, content } = matter(fileContents)

		return {
			slug: realSlug,
			title: data.title || '',
			subTitle: data.subTitle || '',
			menuTitle: data.menuTitle || data.title || '',
			content,
			...data,
		}
	} catch (error) {
		console.error(`Error reading page ${slug}:`, error)
		return null
	}
}

export function getAllPosts(): Post[] {
	const slugs = getPostSlugs()
	const posts = slugs
		.map((slug) => getPostBySlug(slug))
		.filter((post): post is Post => post !== null)
		.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

	return posts
}

export function getAllPages() {
	const slugs = getPageSlugs()
	const pages = slugs
		.map((slug) => getPageBySlug(slug))
		.filter((page) => page !== null)

	return pages
}

export function getPostsByCategory(category: string): Post[] {
	return getAllPosts().filter(
		(post) => post.category.toLowerCase() === category.toLowerCase()
	)
}

export function getAllCategories(): string[] {
	const posts = getAllPosts()
	const categories = [...new Set(posts.map((post) => post.category))]
	return categories.filter(Boolean)
}

export function getRelatedPosts(currentPost: Post, limit = 3): Post[] {
	return getAllPosts()
		.filter((post) => post.slug !== currentPost.slug)
		.filter(
			(post) =>
				post.category === currentPost.category ||
				post.tags.some((tag) => currentPost.tags.includes(tag))
		)
		.slice(0, limit)
}
