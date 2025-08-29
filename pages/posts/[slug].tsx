import type { GetStaticProps, GetStaticPaths } from 'next'
import * as React from 'react'

import PostTemplate from '@/components/layout/PostTemplate'
import { getSlugs, getBySlug, getAll, getAllCategories } from '@/lib/content'
import type { MDEntry } from '@/types'

export default function PostPage({
	categories,
	post,
}: {
	post: MDEntry
	categories: string[]
}) {
	// Adaptation des données pour le template
	const postData = {
		slug: post.slug || '',
		title: post.data?.title || '',
		content: post.content || '',
		date: post.data?.date || '',
		cover: post.data?.cover || undefined,
		category: post.data?.category || undefined,
		description: post.data?.subTitle || post.data?.description || undefined,
	};

	return <PostTemplate post={postData} categories={categories} />;
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
