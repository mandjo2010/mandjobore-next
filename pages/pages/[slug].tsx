import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'

import GatsbyLayoutMain from '@/components/layout/GatsbyLayoutMain'
import Page from '@/components/Page'
import { getSlugs, getBySlug } from '@/lib/content'
import type { MDEntry } from '@/types'

export default function StaticPage({
	page,
}: {
	page: MDEntry
}) {
	// Pages pour le menu
	const pagesData = [
		{
			menuTitle: 'About me',
			slug: 'about',
			title: 'About'
		},
		{
			menuTitle: 'Contact',
			slug: 'contact',
			title: 'Contact'
		}
	]

	// Parts pour InfoBox (peut être vide pour l'instant)
	const parts: Array<{ title: string; html: string }> = []

	// Préparer les données de la page pour le composant Page
	const pageData = {
		frontmatter: {
			algolia: false,
			subTitle: page.data?.subTitle || '',
			title: page.data?.title || ''
		},
		html: page.content || ''
	}

	return (
		<>
			<Head>
				<title>{page.data?.title} · mandjobore.com</title>
				<meta name="description" content={page.data?.subTitle || page.data?.description || ''} />
			</Head>
			
			<GatsbyLayoutMain
				pages={pagesData}
				parts={parts}
				isPage={true} // Déclenche moveNavigatorAside()
			>
				<Page page={pageData} />
			</GatsbyLayoutMain>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = getSlugs('pages')
	return {
		fallback: false,
		paths: slugs.map((slug) => ({ params: { slug } })),
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const page = getBySlug('pages', params!.slug as string)
	
	return { props: { page } }
}
