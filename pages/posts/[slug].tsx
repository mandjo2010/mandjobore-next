import type { GetStaticProps, GetStaticPaths } from 'next'
import { useEffect } from 'react'
import * as React from 'react'

import ArticleEntryAnimation from '@/components/animations/ArticleEntryAnimation'
import GatsbyLayoutNew from '@/components/layout/GatsbyLayoutNew'
import Post from '@/components/post'
import { getSlugs, getBySlug, getAll, getPartContent } from '@/lib/content'
import { processSimpleMarkdown } from '@/lib/markdown'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'
import type { MDEntry } from '@/types'

export default function PostPage({
	allPosts,
	authorContent,
	post
}: {
	post: MDEntry
	allPosts: MDEntry[]
	authorContent: string
}) {
	const { currentArticleSlug, moveNavigatorAside } = useGatsbyUIStore()
	
	// Déclencher l'animation d'article si on vient d'une navigation
	useEffect(() => {
		if (post.slug && currentArticleSlug !== post.slug) {
			moveNavigatorAside()
		}
	}, [post.slug, currentArticleSlug, moveNavigatorAside])

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

	// Transformer tous les posts pour GatsbyLayoutNew
	const posts = allPosts.map(p => ({
		category: p.data?.category || null,
		cover: p.data?.cover || null,
		date: p.data?.date || '',
		excerpt: p.data?.excerpt || p.content?.substring(0, 100) + '...' || '',
		slug: p.slug,
		title: p.data?.title || '',
	}))

	const pages: Array<{ slug: string; title: string; menuTitle?: string }> = []
	const parts: Array<{ title: string; html: string }> = []

	return (
		<GatsbyLayoutNew
			posts={posts}
			pages={pages}
			parts={parts}
			seo={{
				description: postData.excerpt || `Découvrez l'article "${postData.title}" sur les technologies modernes et leurs applications.`,
				image: postData.frontmatter?.cover || '/images/avatar.svg',
				title: `${postData.title} - Mandjo Béa Boré`,
				url: `https://mandjobore.com/posts/${postData.slug}`,
			}}
			isArticleView={true}
		>
			<ArticleEntryAnimation>
				<Post 
					post={postData}
					author={{
						avatar: '/images/jpg/avatar.jpg',
						bio: processSimpleMarkdown(authorContent),
						name: 'Mandjo Béa Boré'
					}}
					facebookAppId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
				/>
			</ArticleEntryAnimation>
		</GatsbyLayoutNew>
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
	const allPosts = getAll('posts')
	
	// Conversion du markdown en HTML
	const { markdownToHtml } = await import('@/lib/markdown')
	const htmlContent = await markdownToHtml(post.content || '')
	
	// Lire le contenu author.md
	const { content: authorContent } = getPartContent('author.md')
	
	return { 
		props: { 
			allPosts, 
			authorContent: authorContent.trim() || '**Hello**, I am Mandjo and I am an aficionado of data science and programming. I enjoy coding and the challenge of learning something new every day.', 
			post: {
				...post,
				content: htmlContent,
				html: htmlContent
			}
		} 
	}
}
