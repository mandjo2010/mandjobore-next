import Head from 'next/head'
import * as React from 'react'
import { GetStaticProps } from 'next'
import { getAll, getAllCategories } from '@/lib/content'
import type { MDEntry, Post } from '@/types'
import Layout from '@/components/layout/Layout'
import ProfileSidebar from '@/components/layout/ProfileSidebar'
import ArticleListView from '@/components/blog/ArticleListView'
import { useRouter } from 'next/router'
import { normalizeCategory } from '@/lib/categories'

export default function Home({
	posts,
	categories,
}: {
	posts: MDEntry[]
	categories: string[]
}) {
	const router = useRouter()
	const [selectedCategory, setSelectedCategory] = React.useState<string>('')

	// Build a stable set of valid category slugs from provided categories
	const validSlugs = React.useMemo(() => {
		return new Set(categories.map((c) => normalizeCategory(c)).filter(Boolean))
	}, [categories])

	// Initialize selectedCategory from URL query (?cat=...), accepting legacy labels and unknowns
	React.useEffect(() => {
		if (!router.isReady) return
		const q = router.query.cat
		let next = ''
		if (typeof q === 'string') {
			const normalized = normalizeCategory(q)
			next = validSlugs.has(normalized) ? normalized : ''
		}
		setSelectedCategory(next)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.isReady])

	// Keep the URL in sync when selectedCategory changes
	React.useEffect(() => {
		if (!router.isReady) return
		const query = { ...router.query }
		if (selectedCategory) {
			(query as Record<string, string>).cat = selectedCategory
		} else {
			delete (query as Record<string, string>).cat
		}
		router.replace({ pathname: router.pathname, query }, undefined, { shallow: true })
	}, [selectedCategory, router])

	// Adapt MDEntry -> Post for the list
	const mapToPost = (e: MDEntry): Post => ({
		slug: e.slug,
		title: e.data?.title ?? e.slug,
		date: e.data?.date ?? '',
		excerpt: e.data?.subTitle ?? e.data?.description ?? '',
		content: e.content,
		coverImage: e.data?.cover
			? `/content/posts/${e.slug}/${e.data.cover}`
			: undefined,
		category: e.data?.category ?? '',
		tags: Array.isArray(e.data?.tags) ? (e.data!.tags as string[]) : [],
		readingTime: 0,
		author: undefined,
	})

	const allCategories = React.useMemo(() => {
		const set = new Set<string>(categories)
		return Array.from(set)
	}, [categories])

	const visiblePosts = React.useMemo(() => {
		const all = posts.map(mapToPost)
		if (!selectedCategory) return all
		return all.filter((p) => normalizeCategory(p.category || '') === selectedCategory)
	}, [posts, selectedCategory])

	const allAsPosts = React.useMemo(() => posts.map(mapToPost), [posts])

	const handleCategoryChange = React.useCallback((c?: string) => {
		setSelectedCategory(c ?? '')
	}, [])

	return (
		<>
			<Head>
				<title>mandjobore.com</title>
			</Head>

			<Layout
				left={<ProfileSidebar />}
				categories={allCategories}
				activeCategory={selectedCategory || undefined}
				onCategoryChange={handleCategoryChange}
				searchPosts={allAsPosts}
			>
				<ArticleListView posts={visiblePosts} />
			</Layout>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const posts = getAll('posts')
	const categories = getAllCategories(posts)
	return { props: { posts, categories } }
}
