export type NavLink = { label: string; href: string }

export type SiteConfig = {
	name: string
	url: string
	siteUrl?: string
	description: string
	author: {
		name: string
		title?: string
		bio?: string
		avatar?: string
	}
	links: {
		github?: string
		linkedin?: string
		twitter?: string
		email?: string
	}
	footerNav: NavLink[]
}

const SITE_URL = 'https://www.mandjobore.com'

export const siteConfig: SiteConfig = {
	author: {
		bio: 'I enjoy coding and the challenge of learning something new every day.',
		name: 'Mandjo Béa Boré',
		title: 'Data analyst - Developer',
		// avatar: '/images/avatar.jpg', // optionnel si tu en as un
	},
	description:
		'Design and build applications to support data including spatial & geospatial ones.',
	footerNav: [
		{ href: '/about', label: 'about' },
		{ href: '/cartography', label: 'cartography' },
		{ href: '/portfolio', label: 'portfolio' },
		{ href: '/contact', label: 'contact' },
	],
	links: {
		email: 'mailto:boremandjo@gmail.com',
		github: 'https://github.com/mandjo2010',
		linkedin: 'https://www.linkedin.com/in/mandjobore/',
		twitter: 'https://x.com/kozoubea',
	},
	name: 'Mandjo Béa Boré',
	siteUrl: SITE_URL,
	url: SITE_URL,
}
