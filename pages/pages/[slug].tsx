import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getSlugs, getBySlug, getAll, getAllCategories } from '@/lib/content'
import type { MDEntry } from '@/types'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout/Layout'
import Sidebar from '@/components/layout/Sidebar'
import ProfileSidebar from '@/components/layout/ProfileSidebar'
import { Typography, Box } from '@mui/material'

const ReactMarkdown = dynamic(() => import('react-markdown'))

export default function StaticPage({
	page,
	posts,
	categories,
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
						variant='h3'
						sx={{
							color: (t) => t.main.colors.title,
							fontWeight: 600,
						}}
					>
						{page.data?.title}
					</Typography>
					{page.data?.subTitle && (
						<Typography
							variant='subtitle1'
							sx={{
								color: (t) => t.main.colors.subTitle,
								mb: 2,
							}}
						>
							{page.data.subTitle}
						</Typography>
					)}
					<Box
						sx={{
							'& img': { maxWidth: '100%', height: 'auto' },
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
		paths: slugs.map((slug) => ({ params: { slug } })),
		fallback: false,
	}
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const page = getBySlug('pages', params!.slug as string)
	const posts = getAll('posts')
	const categories = getAllCategories(posts)
	return { props: { page, posts, categories } }
}
