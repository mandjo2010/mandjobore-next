import { getPageBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
	const page = getPageBySlug('1--about')

	if (!page) {
		notFound()
	}

	return (
		<div className="max-w-4xl mx-auto px-6 py-8">
			{/* Navigation */}
			<nav className="mb-8">
				<Link
					href="/"
					className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Retour à l'accueil
				</Link>
			</nav>

			{/* Content */}
			<article>
				<header className="mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
						{page.title}
					</h1>
				</header>

				<div className="prose prose-lg dark:prose-invert max-w-none">
					<div
						dangerouslySetInnerHTML={{
							__html: page.content.replace(/\n/g, '<br />'),
						}}
					/>
				</div>
			</article>
		</div>
	)
}
