import { Box, Typography } from '@mui/material'
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

export default function TestThreeColumns({ pages, parts, posts }: HomeProps) {
	return (
		<>
			<Head>
				<title>Test 3 Colonnes - mandjobore.com</title>
				<meta name="description" content="Test du mode 3 colonnes" />
			</Head>

			{/* Indicateur de debug */}
			<Box
				sx={{
					backgroundColor: '#709425',
					borderRadius: '4px',
					color: 'white',
					fontSize: '12px',
					fontWeight: 'bold',
					left: '50%',
					padding: '5px 10px',
					position: 'fixed',
					top: 10,
					transform: 'translateX(-50%)',
					zIndex: 9999
				}}
			>
				MODE 3 COLONNES - Posts: {posts.length}
			</Box>

			<GatsbyLayoutNew
				posts={posts}
				pages={pages}
				parts={parts}
				seo={{
					description: 'Test du mode 3 colonnes pour afficher InfoBox + Articles + ActionsBar',
					title: 'Test 3 Colonnes - Mandjo Béa Boré',
					url: 'https://mandjobore.com',
				}}
			/>
		</>
	)
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	try {
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
		
		const pages = allPages.map(page => ({
			menuTitle: page.data?.menuTitle || page.data?.title || '',
			slug: page.slug,
			title: page.data?.title || '',
		}))
		
		const parts: Array<{ title: string; html: string }> = []
		
		return {
			props: {
				pages,
				parts,
				posts,
			},
		}
	} catch (error) {
		console.error('Error loading content:', error);
		return {
			props: {
				pages: [],
				parts: [],
				posts: [],
			},
		}
	}
}
