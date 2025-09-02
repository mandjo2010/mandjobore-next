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

export default function DebugHome({ pages, parts, posts }: HomeProps) {
	console.log('Debug Home - Posts:', posts);
	console.log('Debug Home - Pages:', pages);
	console.log('Debug Home - Parts:', parts);

	return (
		<>
			<Head>
				<title>DEBUG - mandjobore.com</title>
				<meta name="description" content="Blog personnel de développement et technologies" />
			</Head>

			<div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
				<h1>Debug Home Page</h1>
				<h2>Posts ({posts.length}):</h2>
				{posts.length === 0 ? (
					<p>Aucun post trouvé</p>
				) : (
					<ul>
						{posts.map(post => (
							<li key={post.slug}>
								<strong>{post.title}</strong> - {post.excerpt}
							</li>
						))}
					</ul>
				)}

				<h2>Pages ({pages.length}):</h2>
				{pages.length === 0 ? (
					<p>Aucune page trouvée</p>
				) : (
					<ul>
						{pages.map(page => (
							<li key={page.slug}>
								{page.title}
							</li>
						))}
					</ul>
				)}
			</div>

			<GatsbyLayoutNew
				posts={posts}
				pages={pages}
				parts={parts}
				seo={{
					description: 'Design and build applications to support data including spatial & geospatial ones.',
					title: 'DEBUG - Mandjo Béa Boré - Data analyst - Developer',
					url: 'https://mandjobore.com',
				}}
			/>
		</>
	)
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	try {
		console.log('getStaticProps - Loading posts...');
		const allPosts = getAll('posts')
		console.log('getStaticProps - Posts loaded:', allPosts.length);
		
		const allPages = getAll('pages')
		console.log('getStaticProps - Pages loaded:', allPages.length);
		
		const posts = allPosts.map(post => ({
			category: post.data?.category || null,
			cover: post.data?.cover || null,
			date: post.data?.date || '',
			excerpt: post.data?.excerpt || post.content?.substring(0, 100) + '...' || '',
			slug: post.slug,
			title: post.data?.title || '',
		}))
		
		const pages = allPages.map(page => ({
			menuTitle: page.data?.menuTitle || page.data?.title || '',
			slug: page.slug,
			title: page.data?.title || '',
		}))
		
		const parts: Array<{ title: string; html: string }> = []
		
		console.log('getStaticProps - Final posts:', posts);
		console.log('getStaticProps - Final pages:', pages);
		
		return {
			props: {
				pages,
				parts,
				posts,
			},
		}
	} catch (error) {
		console.error('getStaticProps - Error:', error);
		return {
			props: {
				pages: [],
				parts: [],
				posts: [],
			},
		}
	}
}
