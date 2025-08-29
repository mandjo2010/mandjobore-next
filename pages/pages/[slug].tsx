import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import GatsbyInspiredLayout from '@/components/layout/GatsbyInspiredLayout'
import { getSlugs, getBySlug, getAll } from '@/lib/content'
import type { MDEntry } from '@/types'

const ReactMarkdown = dynamic(() => import('react-markdown'))

export default function StaticPage({
	page,
	posts,
}: {
	page: MDEntry
	posts: Array<{
		slug: string;
		title: string;
		excerpt: string;
		category?: string | null;
		cover?: string | null;
		date: string;
	}>
}) {
	const pagesData = [
		{
			slug: page.slug, // Juste le slug, pas /pages/slug/
			title: page.data?.title || '',
			menuTitle: page.data?.menuTitle || page.data?.title || ''
		}
	]

	const parts: Array<{ title: string; html: string }> = []

	return (
		<>
			<Head>
				<title>{page.data?.title} · mandjobore.com</title>
			</Head>
			<GatsbyInspiredLayout
				posts={posts}
				pages={pagesData}
				parts={parts}
				seo={{
					title: `${page.data?.title} - mandjobore.com`,
					description: page.data?.subTitle || page.data?.description || '',
				}}
			>
				<article style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
					<h1 style={{ 
						fontSize: '27px', 
						fontWeight: 600, 
						marginBottom: '0.5rem',
						color: 'rgb(51, 51, 51)'
					}}>
						{page.data?.title}
					</h1>
					{page.data?.subTitle && (
						<h2 style={{
							fontSize: '23px',
							fontWeight: 300,
							marginBottom: '1rem',
							color: 'rgb(85, 85, 85)'
						}}>
							{page.data.subTitle}
						</h2>
					)}
					<ReactMarkdown>{page.content}</ReactMarkdown>
				</article>
			</GatsbyInspiredLayout>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = getSlugs('pages')
	return {
		fallback: false,
		paths: slugs.map((slug) => ({ params: { slug } })),
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const page = getBySlug('pages', params!.slug as string)
	const allPosts = getAll('posts')
	
	// Formater les posts comme dans index.tsx
	const posts = allPosts.map(post => ({
		slug: post.slug, // Juste le slug, pas /posts/slug/
		title: post.data?.title || '',
		excerpt: post.content?.substring(0, 100) + '...' || '',
		category: post.data?.category || null,
		cover: post.data?.cover || null,
		date: post.data?.date || '',
	}))
	
	return { props: { page, posts } }
}
