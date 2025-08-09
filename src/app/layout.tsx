import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Layout from '@/components/layout/Layout'
import { siteConfig } from '@/lib/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.title}`,
	},
	description: siteConfig.description,
	keywords: [
		'data analyst',
		'python developer',
		'data visualization',
		'remote sensing',
		'GIS',
	],
	authors: [{ name: siteConfig.author.name }],
	creator: siteConfig.author.name,
	openGraph: {
		type: 'website',
		locale: 'fr_FR',
		url: siteConfig.siteUrl,
		title: siteConfig.title,
		description: siteConfig.description,
		siteName: siteConfig.title,
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.title,
		description: siteConfig.description,
		creator: '@mandjobore',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='fr' suppressHydrationWarning>
			<body className={inter.className}>
				<Layout>{children}</Layout>
			</body>
		</html>
	)
}
