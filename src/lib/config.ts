import { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
	title: 'Mandjo Béa Boré',
	description: 'Data analyst - Python Developer',
	author: {
		name: 'Mandjo Béa Boré',
		bio: 'Data analyst passionné par la visualisation de données, le développement Python et les technologies géospatiales.',
		avatar: '/images/avatar.svg',
		social: {
			twitter: '#',
			linkedin: '#',
			github: '#',
			email: 'contact@mandjobore.com',
		},
	},
	siteUrl: 'https://www.mandjobore.com',
}

export const navigationItems = [
	{ title: 'Accueil', href: '/' },
	{ title: 'Blog', href: '/blog' },
	{ title: 'Cartographie', href: '/starters' },
	{ title: 'Portfolio', href: '/starters' },
	{ title: 'À propos', href: '/about' },
	{ title: 'Contact', href: '/contact' },
]

export const categories = ['Data viz', 'Satellite', 'Spatial Data', 'Agro']
