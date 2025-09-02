import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { TextField, Box, Typography, Card, CardContent } from '@mui/material'
import Link from 'next/link'

import GatsbyInspiredLayout from '@/components/layout/GatsbyInspiredLayout'
import { getAll } from '@/lib/content'

interface SearchPageProps {
	posts: Array<{
		slug: string;
		title: string;
		excerpt: string;
		category?: string | null; // Accepter null
		cover?: string | null; // Accepter null
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

export default function SearchPage({ posts, pages, parts }: SearchPageProps) {
	const [searchQuery, setSearchQuery] = useState('')
	
	// Filtrer les posts basé sur la recherche
	const filteredPosts = posts.filter(post =>
		post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
		(post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()))
	)
	
	return (
		<>
			<Head>
				<title>Search - mandjobore.com</title>
				<meta name="description" content="Search through articles and posts" />
			</Head>

			<GatsbyInspiredLayout
				posts={posts}
				pages={pages}
				parts={parts}
				seo={{
					title: 'Search - Mandjo Béa Boré',
					description: 'Search through articles and posts about data analysis and development.',
					url: 'https://mandjobore.com/search',
				}}
			>
				<Box sx={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
					<Typography variant="h1" component="h1" sx={{ 
						fontSize: '2rem', 
						fontWeight: 600, 
						marginBottom: '1rem',
						color: 'rgb(51, 51, 51)'
					}}>
						Search
					</Typography>
					
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Search articles..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						sx={{ marginBottom: '2rem' }}
						autoFocus
					/>
					
					{searchQuery && (
						<Typography variant="body2" sx={{ marginBottom: '1rem', color: 'gray' }}>
							{filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} found for "{searchQuery}"
						</Typography>
					)}
					
					{searchQuery && filteredPosts.map(post => (
						<Card key={post.slug} sx={{ marginBottom: '1rem', boxShadow: 1 }}>
							<CardContent>
								<Link href={post.slug} style={{ textDecoration: 'none' }}>
									<Typography variant="h6" component="h2" sx={{ 
										color: 'rgb(51, 51, 51)',
										fontWeight: 600,
										marginBottom: '0.5rem',
										'&:hover': { color: 'primary.main' }
									}}>
										{post.title}
									</Typography>
									<Typography variant="body2" sx={{ 
										color: 'gray',
										marginBottom: '0.5rem'
									}}>
										{post.category && (
											<span style={{ 
												background: '#f0f0f0', 
												padding: '2px 8px', 
												borderRadius: '4px',
												fontSize: '0.8rem',
												marginRight: '0.5rem'
											}}>
												{post.category}
											</span>
										)}
										{post.date}
									</Typography>
									<Typography 
										component="h2"
										className="blog-subtitle article-subtitle post-subtitle"
										sx={{
											fontFamily: '"Open Sans" !important',
											fontSize: '23px !important',
											fontWeight: '300 !important',
											lineHeight: '27px !important',
											color: 'rgb(85, 85, 85) !important',
											fontStyle: 'normal !important',
											cursor: 'pointer',
											'&:hover': {
												color: 'rgb(112, 148, 37) !important'
											}
										}}
									>
										{post.excerpt}
									</Typography>
								</Link>
							</CardContent>
						</Card>
					))}
					
					{searchQuery && filteredPosts.length === 0 && (
						<Typography variant="body1" sx={{ textAlign: 'center', color: 'gray', marginTop: '2rem' }}>
							No articles found matching your search.
						</Typography>
					)}
				</Box>
			</GatsbyInspiredLayout>
		</>
	)
}

export const getStaticProps: GetStaticProps<SearchPageProps> = async () => {
	// Utiliser le système existant qui fonctionne
	const allPosts = getAll('posts')
	const allPages = getAll('pages')
	
	const posts = allPosts.map(post => ({
		slug: post.slug, // Juste le slug, pas /posts/slug/
		title: post.data?.title || '',
		excerpt: post.content?.substring(0, 100) + '...' || '',
		category: post.data?.category || null, // null au lieu d'undefined
		cover: post.data?.cover || null, // null au lieu d'undefined
		date: post.data?.date || '',
	}))
	
	const pages = allPages.map(page => ({
		slug: page.slug,
		title: page.data?.title || '',
		menuTitle: page.data?.menuTitle || page.data?.title || '',
	}))
	
	// Pour les parts, on peut créer un tableau vide pour l'instant
	const parts: Array<{ title: string; html: string }> = []
	
	return {
		props: {
			posts,
			pages,
			parts,
		},
	}
}
