import { Typography, Box } from '@mui/material'
import type { GetStaticProps, GetStaticPaths } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import * as React from 'react'

import Layout from '@/components/layout/Layout'
import ProfileSidebar from '@/components/layout/ProfileSidebar'
import { getSlugs, getBySlug, getAll, getAllCategories } from '@/lib/content'
import type { MDEntry } from '@/types'

const ReactMarkdown = dynamic(() => import('react-markdown'))

export default function PostPage({
	categories,
	post,
}: {
	post: MDEntry
	categories: string[]
}) {
	const [cat, setCat] = React.useState<string | undefined>(undefined)

	return (
		<>
			<Head>
				<title>{post.data?.title} · mandjobore.com</title>
			</Head>

			<Layout
				left={<ProfileSidebar />}
				categories={categories}
				activeCategory={cat}
				onCategoryChange={setCat}
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
						{post.data?.title}
					</Typography>

					{post.data?.subTitle && (
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
							{post.data.subTitle}
						</Typography>
					)}

					<Box
						sx={{
							'& a': {
								'&:hover': {
									color: (t) => t.main.colors.linkHover,
								},
								color: (t) => t.main.colors.link,
							},
							'& blockquote': {
								borderLeft: (t) =>
									`4px solid ${t.main.colors.blockquoteFrame}`,
								color: (t) => t.main.colors.content,
								pl: 2,
							},
							'& h2': {
								fontSize: (t) =>
									`${t.main.fonts.contentHeading.h2Size}rem`,
								fontWeight: 600,
								mt: 3,
							},
							'& h3': {
								fontSize: (t) =>
									`${t.main.fonts.contentHeading.h3Size}rem`,
								fontWeight: 600,
								mt: 2,
							},
							'& p, & li': {
								fontSize: (t) =>
									`${t.main.fonts.content.size}rem`,
								lineHeight: (t) =>
									t.main.fonts.content.lineHeight,
							},
							maxWidth: (t) => t.main.sizes.articleMaxWidth,
						}}
					>
						<ReactMarkdown>{post.content}</ReactMarkdown>
					</Box>
				</article>
			</Layout>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = getSlugs('posts')
	return {
		fallback: false,
		paths: slugs.map((slug) => ({ params: { slug } })),
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const post = getBySlug('posts', params!.slug as string)
	const posts = getAll('posts')
	const categories = getAllCategories(posts)
	return { props: { categories, post } }
}
