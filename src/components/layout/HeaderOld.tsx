'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon, Search } from 'lucide-react'
import { navigationItems } from '@/lib/config'
import Button from '@/components/ui/Button'

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { theme, setTheme } = useTheme()

	return (
		<header className='sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo / Brand - visible sur mobile */}
					<div className='lg:hidden'>
						<Link href='/' className='flex items-center space-x-2'>
							<div className='w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center'>
								<span className='text-white font-bold text-sm'>
									MB
								</span>
							</div>
							<span className='font-semibold text-gray-900 dark:text-white'>
								Mandjo Béa Boré
							</span>
						</Link>
					</div>

					{/* Navigation desktop - masquée quand sidebar visible */}
					<nav className='hidden lg:flex lg:items-center lg:space-x-8'>
						{navigationItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className='text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors font-medium'
							>
								{item.title}
							</Link>
						))}
					</nav>

					{/* Actions */}
					<div className='flex items-center space-x-4'>
						{/* Bouton recherche */}
						<Button variant='ghost' size='sm'>
							<Search className='w-4 h-4' />
						</Button>

						{/* Toggle theme */}
						<Button
							variant='ghost'
							size='sm'
							onClick={() =>
								setTheme(theme === 'dark' ? 'light' : 'dark')
							}
						>
							{theme === 'dark' ? (
								<Sun className='w-4 h-4' />
							) : (
								<Moon className='w-4 h-4' />
							)}
						</Button>

						{/* Menu mobile */}
						<div className='lg:hidden'>
							<Button
								variant='ghost'
								size='sm'
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
								{isMenuOpen ? (
									<X className='w-5 h-5' />
								) : (
									<Menu className='w-5 h-5' />
								)}
							</Button>
						</div>
					</div>
				</div>

				{/* Menu mobile */}
				{isMenuOpen && (
					<div className='lg:hidden py-4 border-t border-gray-200 dark:border-gray-700'>
						<nav className='flex flex-col space-y-2'>
							{navigationItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className='px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 rounded-md transition-colors'
									onClick={() => setIsMenuOpen(false)}
								>
									{item.title}
								</Link>
							))}
						</nav>
					</div>
				)}
			</div>
		</header>
	)
}
