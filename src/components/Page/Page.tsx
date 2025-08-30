/**
 * Page - Reproduit src/components/Page.js
 * Composant pour afficher une page statique (About, Contact, etc.)
 */
'use client'

import React from 'react'

import { Article, Content } from '@/components/Main'

import PageHeader from './PageHeader'

interface PageData {
  frontmatter: {
    title: string
    subTitle?: string
    algolia?: boolean
  }
  html: string
}

interface PageProps {
  page: PageData
}

export default function Page({ page }: PageProps) {
  const { frontmatter, html } = page

  return (
    <Article>
      <PageHeader {...frontmatter} />
      <Content html={html} />
    </Article>
  )
}
