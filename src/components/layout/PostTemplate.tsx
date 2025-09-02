'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

import ActionsBar from '@/components/layout/ActionsBar';
import LeftSidebar from '../sidebar/LeftSidebarLegacy';

import BaseTemplate from './BaseTemplate';

interface PostTemplateProps {
  post: {
    slug: string;
    title: string;
    content: string;
    date: string;
    cover?: string;
    category?: string;
    description?: string;
  };
  categories?: string[];
}

/**
 * PostTemplate - Template pour les articles individuels
 * Inspiré du PostTemplate.js de Gatsby avec adaptation Next.js
 */
export default function PostTemplate({ post, categories = [] }: PostTemplateProps) {
  // Exemple de posts pour LeftSidebar (peut être passé en props ou récupéré d'ailleurs)
  const samplePosts: Array<{ slug: string; title: string }> = [];

  return (
    <BaseTemplate
      left={<LeftSidebar posts={samplePosts} />}
      right={<ActionsBar categories={categories} />}
      seo={{
        title: `${post.title} - Mandjo Béa Boré`,
        description: post.description || `Découvrez l'article "${post.title}" sur les technologies modernes et leurs applications.`,
        image: post.cover || '/images/avatar.svg',
        url: `https://mandjobore.com/posts/${post.slug}`,
      }}
      categories={categories}
    >
      <article style={{ maxWidth: '50em', margin: '0 auto', padding: '2rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 className="blog-title">{post.title}</h1>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {post.date}
          </p>
        </header>

        {post.cover && (
          <img
            src={post.cover}
            alt={post.title}
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '2rem',
            }}
          />
        )}

        <div
          style={{ 
            lineHeight: 1.6,
            maxWidth: '50em'
          }}
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </BaseTemplate>
  );
}
