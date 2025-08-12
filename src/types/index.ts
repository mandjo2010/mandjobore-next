export interface Post {
	slug: string
	title: string
	date: string
	excerpt?: string
	content: string
	coverImage?: string
	category: string
	tags: string[]
	readingTime: number
	author?: {
		name: string
		avatar?: string
		bio?: string
	}
}

export interface PostMatter {
	title: string
	date: string
	excerpt?: string
	category: string
	tags: string[]
	coverImage?: string
	published?: boolean
}

export interface Page {
	slug: string
	title: string
	subTitle?: string
	menuTitle?: string
	content: string
}

export interface SiteConfig {
	title: string
	description: string
	author: {
		name: string
		bio: string
		avatar?: string
		social: {
			twitter?: string
			linkedin?: string
			github?: string
			email?: string
		}
	}
	siteUrl: string
}

export interface NavigationItem {
	title: string
	href: string
	external?: boolean
}

export interface Category {
	name: string
	slug: string
	count: number
}

// Type pour les entrées Markdown (posts et pages)
export type FrontMatter = {
	title?: string;
	subTitle?: string;
	category?: string;
	cover?: string;
	menuTitle?: string;
	date?: string;
	description?: string;
	[key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type MDEntry = {
	slug: string;
	data: FrontMatter;
	content: string;
	type?: 'posts' | 'pages';
};
