'use client';

import React from 'react';

import ActionsBar from '@/components/layout/ActionsBar';

import LeftSidebar from '../sidebar/LeftSidebarLegacy';
import BaseTemplate from './BaseTemplate';

interface PageTemplateProps {
  page: {
    slug: string;
    title: string;
    content: string;
  };
  categories?: string[];
}

/**
 * PageTemplate - Template pour les pages statiques
 * Inspiré du PageTemplate.js de Gatsby avec adaptation Next.js
 */
export default function PageTemplate({ categories = [], page }: PageTemplateProps) {
  // Exemple de posts pour LeftSidebar
  const samplePosts: Array<{ slug: string; title: string }> = [];

  return (
    <BaseTemplate
      left={<LeftSidebar posts={samplePosts} />}
      right={<ActionsBar categories={categories} />}
      seo={{
        description: `${page.title} - Data analyst - Developer`,
        title: `${page.title} - Mandjo Béa Boré`,
        url: `https://mandjobore.com/pages/${page.slug}`,
      }}
      categories={categories}
    >
      <div style={{ margin: '0 auto', maxWidth: '50em', padding: '2rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 className="blog-title">{page.title}</h1>
        </header>

        <div
          style={{ lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </BaseTemplate>
  );
}
