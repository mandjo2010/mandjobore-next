import { GetStaticProps } from 'next'
import Head from 'next/head'
import * as React from 'react'

import GatsbyLayoutNew from '@/components/layout/GatsbyLayoutNew'
import { getAll } from '@/lib/content'

interface HomeProps {
	posts: Array<{
		slug: string;
		title: string;
		excerpt: string;
		category?: string | null;
		cover?: string | null;
		date: string;
	}>;
	pages: Array<{
		slug: string;
		title: string;
		menuTitle?: string;
	}>;
	parts: Array<{
		title: string;
		html: string;
	}>;
}

export default function Home({ posts, pages, parts }: HomeProps) {
	return (
		<>
			<Head>
				<title>mandjobore.com</title>
				<meta name="description" content="Blog personnel de développement et technologies" />
			</Head>

			<GatsbyLayoutNew
				posts={posts}
				pages={pages}
				parts={parts}
				seo={{
					title: 'Mandjo Béa Boré - Data Analyst & Developer',
					description: 'Design and build applications to support data including spatial & geospatial ones.',
					url: 'https://mandjobore.com',
				}}
			/>
		</>
	)
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const allPosts = getAll('posts')
	const allPages = getAll('pages')
	
	const posts = allPosts.map(post => ({
		slug: post.slug,
		title: post.data?.title || '',
		excerpt: post.content?.substring(0, 100) + '...' || '',
		category: post.data?.category || null,
		cover: post.data?.cover || null,
		date: post.data?.date || '',
	}))
	
	const pages = allPages.map(page => ({
		slug: page.slug,
		title: page.data?.title || '',
		menuTitle: page.data?.menuTitle || page.data?.title || '',
	}))
	
	const parts: Array<{ title: string; html: string }> = []
	
	return {
		props: {
			posts,
			pages,
			parts,
		},
	}
}
