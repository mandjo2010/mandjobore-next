import { GetStaticProps } from 'next'
import Head from 'next/head'
import * as React from 'react'

import ArticleListView from '@/components/blog/ArticleListView'
import CategoryFilterPanel from '@/components/filters/CategoryFilterPanel'
import ProfileSidebar from '@/components/layout/ProfileSidebar'
import RightRail from '@/components/layout/RightRail'

import { getAllPostsForList, adaptPostForGatsbyView } from '../lib/posts'
import MainLayout from '../src/components/layout/MainLayout'

type Post = {
  slug: string
  title: string
  excerpt: string
  image: string
  category?: string
}

interface HomeProps {
	posts: Post[]
	categories: string[]
}

export default function Home({ categories, posts }: HomeProps) {
	const [selectedCategory, setSelectedCategory] = React.useState<string>('')
	const [filterOpen, setFilterOpen] = React.useState(false)

	// Filter posts by category if one is selected
	const visiblePosts = React.useMemo(() => {
		if (!selectedCategory || selectedCategory === 'all posts') return posts
		return posts.filter(post => post.category === selectedCategory)
	}, [posts, selectedCategory])

	const handleCategoryChange = React.useCallback((c?: string) => {
		setSelectedCategory(c ?? '')
	}, [])

	const handleCategoryPick = React.useCallback((category: string) => {
		setSelectedCategory(category === 'all posts' ? '' : category)
	}, [])

	const handleOpenFilter = React.useCallback(() => {
		setFilterOpen(true)
	}, [])

	const handleOpenSearch = React.useCallback(() => {
		// TODO: Connect to existing search overlay
		console.log('Open search')
	}, [])

	return (
		<>
			<Head>
				<title>mandjobore.com</title>
				<meta name="description" content="Blog personnel de développement et technologies" />
			</Head>

			<MainLayout
				left={<ProfileSidebar />}
				right={<RightRail onOpenSearch={handleOpenSearch} onOpenFilter={handleOpenFilter} />}
				categories={categories}
				activeCategory={selectedCategory || undefined}
				onCategoryChange={handleCategoryChange}
			>
				<ArticleListView posts={visiblePosts} />
			</MainLayout>

			{filterOpen && (
				<CategoryFilterPanel
					categories={categories}
					active={selectedCategory || 'all posts'}
					onPick={handleCategoryPick}
					onClose={() => setFilterOpen(false)}
				/>
			)}
		</>
	)
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const rawPosts = getAllPostsForList()
	
	// Use adapter to ensure consistent data format
	const posts: Post[] = rawPosts.map(adaptPostForGatsbyView)
	
	// Extract unique categories from posts
	const categorySet = new Set<string>()
	posts.forEach(post => {
		if (post.category) {
			categorySet.add(post.category)
		}
	})
	const categories = Array.from(categorySet).sort()
	
	return { 
		props: { 
			categories,
			posts 
		} 
	}
}
