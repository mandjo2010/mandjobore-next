import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react'
import { Metadata } from 'next'
import ProfileSidebar from '@/components/layout/ProfileSidebar'
import ActionsSidebar from '@/components/layout/ActionsSidebar'

interface Props {
	params: Promise<{ slug: string }>
}

// Génération des métadonnées pour le SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const post = getPostBySlug(slug)

	if (!post) {
		return {
			title: 'Article non trouvé',
		}
	}

	return {
		title: post.title,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			type: 'article',
			publishedTime: post.date,
			images: post.coverImage ? [post.coverImage] : [],
		},
	}
}

// Génération statique des pages
export async function generateStaticParams() {
	const posts = getAllPosts()
	return posts.map((post: any) => ({
		slug: post.slug,
	}))
}

export default async function BlogPost({ params }: Props) {
	const { slug } = await params
	const post = getPostBySlug(slug)

	if (!post) {
		notFound()
	}

	return (
		<div className="min-h-screen bg-white">
			<ProfileSidebar />
			
			<main className="lg:ml-80 lg:mr-16 p-8">
				<article className="max-w-4xl mx-auto">
					{/* Breadcrumb Navigation */}
					<nav className="mb-8">
						<div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
							<Link href="/" className="hover:text-gray-700">Home</Link>
							<span>/</span>
							<Link href="/blog" className="hover:text-gray-700">Blog</Link>
							<span>/</span>
							<span className="text-gray-900">{post.title}</span>
						</div>
						<Link
							href="/"
							className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back to articles
						</Link>
					</nav>

					{/* Article Header */}
					<header className="mb-12">
						{post.coverImage && (
							<div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
								<Image
									src={post.coverImage}
									alt={post.title}
									fill
									className="object-cover"
									priority
								/>
							</div>
						)}

						<div className="max-w-3xl">
							{/* Category Badge */}
							{post.category && (
								<div className="mb-4">
									<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
										{post.category}
									</span>
								</div>
							)}

							<h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
								{post.title}
							</h1>

							{post.excerpt && (
								<p className="text-xl text-gray-600 mb-8 leading-relaxed">
									{post.excerpt}
								</p>
							)}

							{/* Article Meta */}
							<div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4" />
									<time dateTime={post.date}>
										{formatDate(post.date)}
									</time>
								</div>

								<div className="flex items-center gap-2">
									<Clock className="w-4 h-4" />
									<span>{Math.ceil(post.readingTime)} min read</span>
								</div>

								{/* Share Button */}
								<button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
									<Share2 className="w-4 h-4" />
									<span>Share</span>
								</button>
							</div>

							{/* Tags */}
							{post.tags && post.tags.length > 0 && (
								<div className="flex items-center gap-2 mb-8">
									<Tag className="w-4 h-4 text-gray-400" />
									<div className="flex flex-wrap gap-2">
										{post.tags.map((tag: string) => (
											<span
												key={tag}
												className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors cursor-pointer"
											>
												#{tag}
											</span>
										))}
									</div>
								</div>
							)}
						</div>
					</header>

					{/* Article Content */}
					<div className="prose prose-lg max-w-none">
						<div
							className="text-gray-800 leading-relaxed"
							dangerouslySetInnerHTML={{
								__html: post.content,
							}}
						/>
					</div>

					{/* Article Footer */}
					<footer className="mt-16 pt-8 border-t border-gray-200">
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
							<div>
								<h3 className="text-lg font-medium text-gray-900 mb-3">
									Share this article
								</h3>
								<div className="flex gap-4">
									<a
										href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
											post.title
										)}&url=${encodeURIComponent(
											`${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${post.slug}`
										)}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-600 hover:text-blue-600 transition-colors"
									>
										Twitter
									</a>
									<a
										href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
											`${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${post.slug}`
										)}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-600 hover:text-blue-600 transition-colors"
									>
										LinkedIn
									</a>
								</div>
							</div>

							<Link
								href="/"
								className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
							>
								← All articles
							</Link>
						</div>
					</footer>
				</article>
			</main>

			<ActionsSidebar />
		</div>
	)
}
