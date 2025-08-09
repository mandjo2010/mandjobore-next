import { getAllPosts } from '@/lib/posts'
import { Post } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

export default function BlogPage() {
	const posts = getAllPosts()

	return (
		<div className="max-w-4xl mx-auto px-6 py-8">
			{/* Header */}
			<div className="mb-12">
				<Link
					href="/"
					className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mb-6 transition-colors"
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Retour à l'accueil
				</Link>
				
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
					Tous les articles
				</h1>
				<p className="text-xl text-gray-600 dark:text-gray-400">
					{posts.length} article{posts.length > 1 ? 's' : ''} publié{posts.length > 1 ? 's' : ''}
				</p>
			</div>

			{/* Articles */}
			{posts.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-gray-500 dark:text-gray-400">
						Aucun article disponible pour le moment.
					</p>
				</div>
			) : (
				<div className="grid gap-8">
					{posts.map((post) => (
						<article
							key={post.slug}
							className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
						>
							<div className="flex flex-col lg:flex-row">
								{post.coverImage && (
									<div className="lg:w-64 h-48 lg:h-auto relative overflow-hidden">
										<Image
											src={post.coverImage}
											alt={post.title}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
								)}
								
								<div className="flex-1 p-6">
									<div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
										<div className="flex items-center gap-1">
											<Calendar className="w-4 h-4" />
											<time>{formatDate(post.date)}</time>
										</div>
										
										<div className="flex items-center gap-1">
											<Clock className="w-4 h-4" />
											<span>{Math.ceil(post.readingTime)} min de lecture</span>
										</div>
										
										{post.category && (
											<span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs">
												{post.category}
											</span>
										)}
									</div>

									<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
										<Link href={`/blog/${post.slug}`}>
											{post.title}
										</Link>
									</h2>

									{post.excerpt && (
										<p className="text-gray-600 dark:text-gray-400 mb-4">
											{post.excerpt}
										</p>
									)}

									<div className="flex items-center justify-between">
										<Link
											href={`/blog/${post.slug}`}
											className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
										>
											Lire l'article →
										</Link>

										{post.tags && post.tags.length > 0 && (
											<div className="flex gap-2">
												{post.tags.map((tag) => (
													<span
														key={tag}
														className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
													>
														{tag}
													</span>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						</article>
					))}
				</div>
			)}
		</div>
	)
}
