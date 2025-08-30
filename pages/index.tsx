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

export default function Home({ pages, parts, posts }: HomeProps) {
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
					description: 'Design and build applications to support data including spatial & geospatial ones.',
					title: 'Mandjo Béa Boré - Data Analyst & Developer',
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
		category: post.data?.category || null,
		cover: post.data?.cover || null,
		date: post.data?.date || '',
		excerpt: post.data?.excerpt || post.content?.substring(0, 100) + '...' || '',
		slug: post.slug,
		title: post.data?.title || '',
	}))
	
	const pages = allPages.map(page => {
		// Mapper les slugs des dossiers vers les URLs correctes
		let slug = page.slug;
		if (slug === '1--about') slug = '/about';
		else if (slug === '2--cartography') slug = '/cartography';
		else if (slug === '4--projects') slug = '/projects';
		else if (slug === '5--services') slug = '/services';
		else if (!slug.startsWith('/')) slug = `/${slug}`;
		
		return {
			menuTitle: page.data?.menuTitle || page.data?.title || '',
			slug,
			title: page.data?.title || '',
		};
	})
	
	const parts: Array<{ title: string; html: string }> = []
	
	return {
		props: {
			pages,
			parts,
			posts,
		},
	}
}
