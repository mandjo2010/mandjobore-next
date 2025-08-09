'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar } from 'lucide-react'
import { siteConfig, categories } from '@/lib/config'
import Button from '@/components/ui/Button'

export default function Sidebar() {
	const [activeCategory, setActiveCategory] = useState<string>('')

	const socialIcons = {
		github: Github,
		linkedin: Linkedin,
		twitter: Twitter,
		email: Mail,
	}

	return (
		<div className='h-full bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto'>
			<div className='p-6'>
				{/* Profile section */}
				<div className='text-center mb-8'>
					<div className='relative w-24 h-24 mx-auto mb-4'>
						<Image
							src='/images/avatar.jpg'
							alt={siteConfig.author.name}
							fill
							className='rounded-full object-cover'
							priority
						/>
					</div>

					<h1 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
						{siteConfig.author.name}
					</h1>

					<p className='text-gray-600 dark:text-gray-400 text-sm mb-4'>
						{siteConfig.description}
					</p>

					{/* Social links */}
					<div className='flex justify-center space-x-3 mb-6'>
						{Object.entries(siteConfig.author.social).map(
							([platform, url]) => {
								if (!url || url === '#') return null
								const Icon =
									socialIcons[
										platform as keyof typeof socialIcons
									]
								if (!Icon) return null

								return (
									<a
										key={platform}
										href={url}
										target='_blank'
										rel='noopener noreferrer'
										className='text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors'
									>
										<Icon className='w-5 h-5' />
									</a>
								)
							}
						)}
					</div>

					{/* Location */}
					<div className='flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm mb-6'>
						<MapPin className='w-4 h-4 mr-2' />
						<span>France</span>
					</div>
				</div>

				{/* Bio */}
				<div className='mb-8'>
					<p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
						{siteConfig.author.bio}
					</p>
				</div>

				{/* Navigation */}
				<nav className='mb-8'>
					<ul className='space-y-2'>
						<li>
							<Link
								href='/'
								className='flex items-center px-4 py-2 text-gray-700 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors'
							>
								<Calendar className='w-4 h-4 mr-3' />
								Tous les articles
							</Link>
						</li>
					</ul>
				</nav>

				{/* Categories */}
				<div className='mb-8'>
					<h3 className='text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider'>
						Catégories
					</h3>

					<div className='space-y-1'>
						{categories.map((category) => (
							<button
								key={category}
								onClick={() =>
									setActiveCategory(
										activeCategory === category
											? ''
											: category
									)
								}
								className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
									activeCategory === category
										? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
										: 'text-gray-600 hover:bg-white dark:text-gray-400 dark:hover:bg-gray-700'
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>

				{/* Call to action */}
				<div className='bg-white dark:bg-gray-700 rounded-lg p-4 text-center'>
					<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
						Travaillons ensemble
					</h4>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
						Intéressé par une collaboration ou un projet ?
					</p>
					<Button size='sm' className='w-full'>
						<Link href='/contact'>Me contacter</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
