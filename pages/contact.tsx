import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { TextField, Button, Box, Typography, Alert } from '@mui/material'
import { useRouter } from 'next/router'

import GatsbyInspiredLayout from '@/components/layout/GatsbyInspiredLayout'
import { getAll } from '@/lib/content'

interface ContactPageProps {
	posts: Array<{
		slug: string;
		title: string;
		excerpt: string;
		category?: string | null; // Accepter null
		cover?: string | null; // Accepter null
		date: string;
	}>;
	pages: Array<{
		slug: string;
		title: string;
		menuTitle?: string;
	}>;
	parts: Array<{
		title: string;
		html: string;
	}>;
}

export default function ContactPage({ posts, pages, parts }: ContactPageProps) {
	const router = useRouter()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: ''
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		
		try {
			// Si vous avez Netlify Forms configuré
			const response = await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({
					'form-name': 'contact',
					...formData
				}).toString()
			})
			
			if (response.ok) {
				setSubmitStatus('success')
				setFormData({ name: '', email: '', message: '' })
				// Redirection après succès (style Gatsby)
				setTimeout(() => {
					router.push('/?message=success')
				}, 2000)
			} else {
				setSubmitStatus('error')
			}
		} catch (error) {
			console.error('Form submission error:', error)
			setSubmitStatus('error')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({ ...prev, [field]: e.target.value }))
	}
	
	return (
		<>
			<Head>
				<title>Contact - mandjobore.com</title>
				<meta name="description" content="Get in touch with Mandjo Béa Boré" />
			</Head>

			<GatsbyInspiredLayout
				posts={posts}
				pages={pages}
				parts={parts}
				seo={{
					title: 'Contact - Mandjo Béa Boré',
					description: 'Get in touch for collaboration on data analysis and development projects.',
					url: 'https://mandjobore.com/contact',
				}}
			>
				<Box sx={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
					<Typography variant="h1" component="h1" sx={{ 
						fontSize: '2rem', 
						fontWeight: 600, 
						marginBottom: '1rem',
						color: 'rgb(51, 51, 51)'
					}}>
						Contact
					</Typography>
					
					<Typography variant="body1" sx={{ marginBottom: '2rem', color: 'rgb(68, 68, 68)' }}>
						I'd love to hear from you. Send me a message and I'll respond as soon as possible.
					</Typography>
					
					{submitStatus === 'success' && (
						<Alert severity="success" sx={{ marginBottom: '1rem' }}>
							Thank you for your message! I'll get back to you soon.
						</Alert>
					)}
					
					{submitStatus === 'error' && (
						<Alert severity="error" sx={{ marginBottom: '1rem' }}>
							There was an error sending your message. Please try again.
						</Alert>
					)}
					
					<form onSubmit={handleSubmit} data-netlify="true" name="contact">
						<input type="hidden" name="form-name" value="contact" />
						
						<TextField
							fullWidth
							label="Name"
							name="name"
							value={formData.name}
							onChange={handleChange('name')}
							required
							margin="normal"
							disabled={isSubmitting}
						/>
						
						<TextField
							fullWidth
							label="Email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange('email')}
							required
							margin="normal"
							disabled={isSubmitting}
						/>
						
						<TextField
							fullWidth
							label="Message"
							name="message"
							multiline
							rows={4}
							value={formData.message}
							onChange={handleChange('message')}
							required
							margin="normal"
							disabled={isSubmitting}
						/>
						
						<Button 
							type="submit" 
							variant="contained"
							size="large"
							disabled={isSubmitting}
							sx={{ 
								marginTop: '1rem',
								backgroundColor: 'rgb(51, 51, 51)',
								'&:hover': {
									backgroundColor: 'rgb(68, 68, 68)'
								}
							}}
						>
							{isSubmitting ? 'Sending...' : 'Send Message'}
						</Button>
					</form>
				</Box>
			</GatsbyInspiredLayout>
		</>
	)
}

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
	// Utiliser le système existant qui fonctionne
	const allPosts = getAll('posts')
	const allPages = getAll('pages')
	
	const posts = allPosts.map(post => ({
		slug: post.slug, // Juste le slug, pas /posts/slug/
		title: post.data?.title || '',
		excerpt: post.content?.substring(0, 100) + '...' || '',
		category: post.data?.category || null, // null au lieu d'undefined
		cover: post.data?.cover || null, // null au lieu d'undefined
		date: post.data?.date || '',
	}))
	
	const pages = allPages.map(page => ({
		slug: page.slug,
		title: page.data?.title || '',
		menuTitle: page.data?.menuTitle || page.data?.title || '',
	}))
	
	// Pour les parts, on peut créer un tableau vide pour l'instant
	const parts: Array<{ title: string; html: string }> = []
	
	return {
		props: {
			posts,
			pages,
			parts,
		},
	}
}
