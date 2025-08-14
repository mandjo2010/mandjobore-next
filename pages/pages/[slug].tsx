import { Typography, Box } from '@mui/material'
import { GetStaticProps, GetStaticPaths } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import Layout from '@/components/layout/Layout'
import ProfileSidebar from '@/components/layout/ProfileSidebar'
import Sidebar from '@/components/layout/Sidebar'
import { getSlugs, getBySlug, getAll, getAllCategories } from '@/lib/content'
import type { MDEntry } from '@/types'

const ReactMarkdown = dynamic(() => import('react-markdown'))

export default function StaticPage({
	categories,
	page,
	posts,
}: {
	page: MDEntry
	posts: MDEntry[]
	categories: string[]
}) {
	return (
		<>
			<Head>
				<title>{page.data?.title} · mandjobore.com</title>
			</Head>
			<Layout
				left={<Sidebar posts={posts} categories={categories} />}
				right={<ProfileSidebar />}
			>
				<article>
					<Typography
						component='h1'
						className='blog-title'
						sx={{
							color: 'rgb(51, 51, 51) !important',
							fontFamily: '"Open Sans", sans-serif !important',
							fontSize: '27px !important',
							fontStyle: 'normal !important',
							fontWeight: '600 !important',
							lineHeight: '31px !important',
							margin: '0 0 0.5rem 0 !important',
						}}
					>
						{page.data?.title}
					</Typography>
					{page.data?.subTitle && (
						<Typography
							component='h2'
							className='blog-subtitle'
							sx={{
								color: 'rgb(85, 85, 85) !important',
								fontFamily: '"Open Sans", sans-serif !important',
								fontSize: '23px !important',
								fontStyle: 'normal !important',
								fontWeight: '300 !important',
								lineHeight: '27px !important',
								margin: '0 0 1rem 0 !important',
							}}
						>
							{page.data.subTitle}
						</Typography>
					)}
					<Box
						sx={{
							'& img': { height: 'auto', maxWidth: '100%' },
							maxWidth: (t) => t.main.sizes.articleMaxWidth,
						}}
					>
						<ReactMarkdown>{page.content}</ReactMarkdown>
					</Box>
				</article>
			</Layout>
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
	const posts = getAll('posts')
	const categories = getAllCategories(posts)
	return { props: { categories, page, posts } }
}
