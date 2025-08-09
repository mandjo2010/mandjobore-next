import { getAllPosts } from '@/lib/posts'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export default function Home() {
	const posts = getAllPosts()

	return (
		<div className="max-w-4xl mx-auto px-6 py-8">
			{/* Hero Section */}
			<div className="mb-12 text-center lg:text-left">
				<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
					When art and science meet
				</h1>
				<div className="prose prose-lg dark:prose-invert max-w-none mb-8">
					<p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
						In this page, you will find some graphics that show where things are and why
						they're there. It's all about learning to communicate spatial information to tell
						you something interesting, to say some story that give some facts.
					</p>
					<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
						Explorez mes projets cartographiques, analyses de données spatiales, 
						et visualisations géospatiales.
					</p>
				</div>
			</div>

			{/* Projets récents */}
			<section>
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
						Projets cartographiques récents
					</h2>
					<Link
						href="/starters"
						className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-2 transition-colors"
					>
						Voir tous les projets
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>

				{posts.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-500 dark:text-gray-400">
							Aucun projet disponible pour le moment.
						</p>
						<p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
							Les projets cartographiques seront bientôt ajoutés !
						</p>
					</div>
				) : (
					<div className="space-y-16">
						{posts.slice(0, 3).map((post: any, index: number) => (
							<article
								key={post.slug}
								className="group"
							>
								{/* Titre du projet avec numérotation */}
								<h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
									{index + 1}. {post.title}
								</h3>

								{/* Description du projet */}
								{post.excerpt && (
									<div className="prose prose-lg dark:prose-invert max-w-none mb-8">
										<p>{post.excerpt}</p>
									</div>
								)}

								{/* Image du projet */}
								{post.coverImage && (
									<div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden mb-6">
										<Image
											src={post.coverImage}
											alt={post.title}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
								)}

								{/* Métadonnées et lien */}
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
										<div className="flex items-center gap-1">
											<Calendar className="w-4 h-4" />
											<time>{formatDate(post.date)}</time>
										</div>
										
										{post.category && (
											<span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
												{post.category}
											</span>
										)}
									</div>

									<Link
										href={`/blog/${post.slug}`}
										className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-2 transition-colors"
									>
										Voir le projet
										<ArrowRight className="w-4 h-4" />
									</Link>
								</div>

								{/* Tags */}
								{post.tags && post.tags.length > 0 && (
									<div className="flex gap-2 mt-4">
										{post.tags.map((tag: any) => (
											<span
												key={tag}
												className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-sm"
											>
												{tag}
											</span>
										))}
									</div>
								)}
							</article>
						))}
					</div>
				)}
			</section>

			{/* Section À propos de l'auteur */}
			<footer className="border-t border-gray-200 dark:border-gray-700 pt-12 mt-16">
				<div className="text-center">
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
						Mandjo Béa Boré
					</h3>
					<p className="text-gray-600 dark:text-gray-400 mb-8">
						Data analyst - Developer
					</p>
				</div>

				<div>
					<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
						Projets et articles connexes
					</h4>
					<div className="grid gap-3 md:grid-cols-2 text-sm">
						<Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline">
							Covid-19 Data Visualization - Build and publish your COVID-19 dashboard
						</Link>
						<Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline">
							Remote Sensing of Mt. Kenya Wildfire - How satellite imagery detect wildfires
						</Link>
						<Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline">
							Ten Reasons to Choose SILAT - Studying Spatial Data Science in France
						</Link>
						<Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline">
							Finding Geographic Data - Finding GIS Data on the web from wide range of sources
						</Link>
						<Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline">
							Mining and Biodiversity Preservation - A mining case study in Guinea
						</Link>
						<Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline">
							Agroforestry System Benefits - Economic, sociocultural, and environmental benefits
						</Link>
					</div>
				</div>
			</footer>
		</div>
	)
}
