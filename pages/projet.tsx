import { GetStaticProps } from 'next'
import Head from 'next/head'
import * as React from 'react'

import GatsbyLayoutNew from '@/components/layout/GatsbyLayoutNew'

import { getBySlug } from '../src/lib/content'

interface ProjetPageProps {
  page: {
    title: string
    content: string
  }
  pages: Array<{
    slug: string
    title: string
    menuTitle?: string
  }>
}

export default function ProjetPage({ page, pages }: ProjetPageProps) {
  return (
    <>
      <Head>
        <title>{page.title} - mandjobore.com</title>
        <meta name="description" content="Projets de développement et analyse de données par Mandjo Béa Boré" />
      </Head>

      <GatsbyLayoutNew
        posts={[]}
        pages={pages}
        parts={[]}
        seo={{
          description: 'Projets de développement et analyse de données',
          title: `${page.title} - Mandjo Béa Boré`,
        }}
      >
        <div 
          style={{ 
            fontSize: '16px',
            lineHeight: 1.6,
            margin: '0 auto',
            maxWidth: '800px'
          }}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </GatsbyLayoutNew>
    </>
  )
}

export const getStaticProps: GetStaticProps<ProjetPageProps> = async () => {
  // Récupérer le contenu de la page
  const pageData = getBySlug('pages', '4--projects')
  
  // Récupérer les pages pour le menu
  const allPages = [
    { menuTitle: 'About', slug: '/about', title: 'About' },
    { menuTitle: 'Cartography', slug: '/cartography', title: 'Cartography' },
    { menuTitle: 'Projet', slug: '/projet', title: 'Projet' },
  ]

  return {
    props: {
      page: {
        content: pageData?.content || '<p>Contenu en cours de développement...</p>',
        title: pageData?.data?.title || 'Projet'
      },
      pages: allPages,
    },
  }
}
