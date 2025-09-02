import type { GetStaticProps, GetStaticPaths } from 'next'
import * as React from 'react'

import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper'
import Post from '@/components/post'
import { getSlugs, getBySlug, getAll, getAllCategories } from '@/lib/content'
import type { MDEntry } from '@/types'

export default function PostPage({
	post,
}: {
	post: MDEntry
	categories: string[]
}) {
	// Adaptation des données pour le composant Post Gatsby-style
	const postData = {
		slug: post.slug || '',
		title: post.data?.title || '',
		subTitle: post.data?.subTitle,
		content: post.content || '',
		html: post.content || '', // Pour compatibilité
		date: post.data?.date || '',
		excerpt: post.data?.description || post.data?.subTitle,
		frontmatter: {
			title: post.data?.title || '',
			subTitle: post.data?.subTitle,
			category: post.data?.category,
			cover: post.data?.cover
		},
		fields: {
			prefix: post.data?.date
		}
	}

	return (
		<LayoutWrapper>
			<Post 
				post={postData}
				author={{
					name: 'Mandjo Béa Boré',
					bio: 'Data Analyst & Developer. Design and build geospatial applications with modern web technologies.',
					avatar: '/images/jpg/avatar.jpg'
				}}
				facebookAppId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
			/>
		</LayoutWrapper>
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
