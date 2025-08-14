import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ArticleListItem from '@/components/blog/ArticleListItem'
import type { PostCard } from '@/types'

// Mock Next.js router
vi.mock('next/router', () => ({
	useRouter: () => ({
		pathname: '/',
		push: vi.fn(),
		query: {},
	}),
}))

// Mock Next.js Image component
vi.mock('next/image', () => ({
	default: ({ alt, src, ...props }: any) => (
		 
		<img src={src} alt={alt} {...props} />
	),
}))

const mockPost: PostCard = {
	category: 'Technology',
	cover: '/images/test-cover.jpg',
	excerpt: 'This is a test excerpt that should be displayed properly in the component.',
	slug: 'test-article',
	title: 'Test Article Title',
}

describe('ArticleListItem', () => {
	it('renders the article title correctly', () => {
		render(<ArticleListItem 
			href={`/posts/${mockPost.slug}`}
			title={mockPost.title}
			excerpt={mockPost.excerpt}
			image={mockPost.cover || '/images/placeholder.png'}
		/>)
		
		const title = screen.getByRole('heading', { name: mockPost.title })
		expect(title).toBeInTheDocument()
		expect(title).toHaveTextContent('Test Article Title')
	})

	it('renders the correct href for the article link', () => {
		render(<ArticleListItem 
			href={`/posts/${mockPost.slug}`}
			title={mockPost.title}
			excerpt={mockPost.excerpt}
			image={mockPost.cover || '/images/placeholder.png'}
		/>)
		
		const link = screen.getByRole('link', { name: `Lire l'article: ${mockPost.title}` })
		expect(link).toHaveAttribute('href', '/posts/test-article')
	})

	it('displays the excerpt text and clamps it to 2 lines', () => {
		render(<ArticleListItem 
			href={`/posts/${mockPost.slug}`}
			title={mockPost.title}
			excerpt={mockPost.excerpt}
			image={mockPost.cover || '/images/placeholder.png'}
		/>)
		
		const excerpt = screen.getByText(mockPost.excerpt!)
		expect(excerpt).toBeInTheDocument()
		
		// Check that the excerpt has the correct CSS for line clamping
		expect(excerpt).toHaveStyle({
			display: '-webkit-box',
			WebkitBoxOrient: 'vertical',
			WebkitLineClamp: '2',
		})
	})

	it('renders without excerpt when not provided', () => {
		const postWithoutExcerpt: PostCard = {
			...mockPost,
			excerpt: undefined,
		}
		
		render(<ArticleListItem 
			href={`/posts/${postWithoutExcerpt.slug}`}
			title={postWithoutExcerpt.title}
			excerpt={postWithoutExcerpt.excerpt}
			image={postWithoutExcerpt.cover || '/images/placeholder.png'}
		/>)
		
		const title = screen.getByRole('heading', { name: mockPost.title })
		expect(title).toBeInTheDocument()
		
		// Excerpt should not be present
		expect(screen.queryByText(mockPost.excerpt!)).not.toBeInTheDocument()
	})

	it('displays category chip when category is provided', () => {
		render(<ArticleListItem 
			href={`/posts/${mockPost.slug}`}
			title={mockPost.title}
			excerpt={mockPost.excerpt}
			image={mockPost.cover || '/images/placeholder.png'}
		/>)
		
		const categoryChip = screen.getByText('Technology')
		expect(categoryChip).toBeInTheDocument()
	})

	it('uses fallback image when cover is not provided', () => {
		const postWithoutCover: PostCard = {
			...mockPost,
			cover: undefined,
		}
		
		render(<ArticleListItem 
			href={`/posts/${postWithoutCover.slug}`}
			title={postWithoutCover.title}
			excerpt={postWithoutCover.excerpt}
			image={postWithoutCover.cover || '/images/placeholder.png'}
		/>)
		
		const image = screen.getByRole('img')
		expect(image).toHaveAttribute('src', '/images/placeholder.png')
	})
})
