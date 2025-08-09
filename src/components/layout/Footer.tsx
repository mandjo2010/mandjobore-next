import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export default function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{/* Brand */}
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-4'>
							{siteConfig.author.name}
						</h3>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							{siteConfig.description}
						</p>
					</div>

					{/* Links */}
					<div>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
							Navigation
						</h4>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/'
									className='text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 text-sm transition-colors'
								>
									Accueil
								</Link>
							</li>
							<li>
								<Link
									href='/blog'
									className='text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 text-sm transition-colors'
								>
									Articles
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 text-sm transition-colors'
								>
									À propos
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 text-sm transition-colors'
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Technologies */}
					<div>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
							Technologies
						</h4>
						<div className='flex flex-wrap gap-2'>
							{[
								'Next.js',
								'TypeScript',
								'Tailwind CSS',
								'Python',
								'PostgreSQL',
							].map((tech) => (
								<span
									key={tech}
									className='px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded'
								>
									{tech}
								</span>
							))}
						</div>
					</div>
				</div>

				<div className='mt-8 pt-8 border-t border-gray-200 dark:border-gray-700'>
					<div className='flex flex-col sm:flex-row justify-between items-center'>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							© {currentYear} {siteConfig.author.name}. Tous
							droits réservés.
						</p>
						<p className='text-gray-600 dark:text-gray-400 text-sm mt-2 sm:mt-0'>
							Développé avec ❤️ et Next.js
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
