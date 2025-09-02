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
		content: post.content || '',
		date: post.data?.date || '',
		excerpt: post.data?.description || post.data?.subTitle,
		fields: {
			prefix: post.data?.date
		},
		frontmatter: {
			category: post.data?.category,
			cover: post.data?.cover,
			subTitle: post.data?.subTitle,
			title: post.data?.title || ''
		},
		html: post.content || '', // Pour compatibilité
		slug: post.slug || '',
		subTitle: post.data?.subTitle,
		title: post.data?.title || ''
	}

	return (
		<LayoutWrapper>
			<Post 
				post={postData}
				author={{
					avatar: '/images/jpg/avatar.jpg',
					bio: 'Data analyst - Developer. Design and build geospatial applications with modern web technologies.',
					name: 'Mandjo Béa Boré'
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
