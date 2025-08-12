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

export const siteConfig: SiteConfig = {
	name: 'Mandjo Béa Boré',
	url: 'https://www.mandjobore.com',
	siteUrl: 'https://www.mandjobore.com',
	description:
		'Design and build applications to support data including spatial & geospatial ones.',
	author: {
		name: 'Mandjo Béa Boré',
		title: 'Data analyst - Developer',
		bio: 'I enjoy coding and the challenge of learning something new every day.',
		// avatar: '/images/avatar.jpg', // optionnel si tu en as un
	},
	links: {
		github: 'https://github.com/mandjo2010',
		linkedin: 'https://www.linkedin.com/in/mandjobore/',
		twitter: 'https://twitter.com/mandjobore',
		email: 'mailto:boremandjo@gmail.com',
	},
	footerNav: [
		{ label: 'about', href: '/about' },
		{ label: 'cartography', href: '/cartography' },
		{ label: 'portfolio', href: '/portfolio' },
		{ label: 'contact', href: '/contact' },
	],
}
