import { GetStaticProps } from 'next'
import Head from 'next/head'
import * as React from 'react'

import GatsbyLayoutNew from '@/components/layout/GatsbyLayoutNew'

import { getBySlug } from '../src/lib/content'

interface CartographyPageProps {
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

export default function CartographyPage({ page, pages }: CartographyPageProps) {
  return (
    <>
      <Head>
        <title>{page.title} - mandjobore.com</title>
        <meta name="description" content="Projets et travaux en cartographie et géospatial par Mandjo Béa Boré" />
      </Head>

      <GatsbyLayoutNew
        posts={[]}
        pages={pages}
        parts={[]}
        seo={{
          description: 'Projets et travaux en cartographie et géospatial',
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

export const getStaticProps: GetStaticProps<CartographyPageProps> = async () => {
  // Récupérer le contenu de la page
  const pageData = getBySlug('pages', '2--cartography')
  
  // Récupérer les pages pour le menu
  const allPages = [
    { menuTitle: 'About', slug: '/about', title: 'About' },
    { menuTitle: 'Cartography', slug: '/cartography', title: 'Cartography' },
    { menuTitle: 'Projects', slug: '/projects', title: 'Projects' },
  ]

  return {
    props: {
      page: {
        content: pageData?.content || '<p>Contenu en cours de développement...</p>',
        title: pageData?.data?.title || 'Cartography'
      },
      pages: allPages,
    },
  }
}
