import Head from 'next/head'
import type { GetStaticProps, GetStaticPaths } from 'next'
import { getSlugs, getBySlug, getAll, getAllCategories } from '@/lib/content'
import type { MDEntry } from '@/types'
import dynamic from 'next/dynamic'
import * as React from 'react'
import Layout from '@/components/layout/Layout'
import ProfileSidebar from '@/components/layout/ProfileSidebar'
import { Typography, Box } from '@mui/material'

const ReactMarkdown = dynamic(() => import('react-markdown'))

export default function PostPage({
	post,
	categories,
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
				left={<ProfileSidebar defaultCollapsed />}
				categories={categories}
				activeCategory={cat}
				onCategoryChange={setCat}
			>
				<article>
					<Typography
						variant='h3'
						sx={{
							color: (t) => t.main.colors.title,
							fontWeight: 600,
						}}
					>
						{post.data?.title}
					</Typography>

					{post.data?.subTitle && (
						<Typography
							variant='subtitle1'
							sx={{
								color: (t) => t.main.colors.subTitle,
								mb: 2,
							}}
						>
							{post.data.subTitle}
						</Typography>
					)}

					<Box
						sx={{
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
							'& blockquote': {
								borderLeft: (t) =>
									`4px solid ${t.main.colors.blockquoteFrame}`,
								pl: 2,
								color: (t) => t.main.colors.content,
							},
							'& a': {
								color: (t) => t.main.colors.link,
								'&:hover': {
									color: (t) => t.main.colors.linkHover,
								},
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
		paths: slugs.map((slug) => ({ params: { slug } })),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const post = getBySlug('posts', params!.slug as string)
	const posts = getAll('posts')
	const categories = getAllCategories(posts)
	return { props: { post, categories } }
}
