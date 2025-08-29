'use client';

import Head from 'next/head';
import React from 'react';

import Footer from '../Footer/Footer';

import MainLayout from './MainLayout';

interface BaseTemplateProps {
  children: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  seo?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
  categories?: string[];
  activeCategory?: string;
  onCategoryChange?: (category?: string) => void;
}

/**
 * BaseTemplate - Template de base inspiré des templates Gatsby
 * Fournit la structure Main > Content > Footer > SEO
 * Intègre la gestion d'état pour la navigation et l'interface
 */
export default function BaseTemplate({
  children,
  left,
  right,
  seo,
  categories = [],
  activeCategory,
  onCategoryChange,
}: BaseTemplateProps) {
  const seoTitle = seo?.title || 'Mandjo Béa Boré - Data Analyst & Developer';
  const seoDescription = seo?.description || 'Design and build applications to support data including spatial & geospatial ones.';
  const seoImage = seo?.image || '/images/avatar.svg';
  const seoUrl = seo?.url || 'https://mandjobore.com';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:url" content={seoUrl} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout
        left={left}
        right={right}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      >
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1 }}>
            {children}
          </div>
          
          <Footer />
        </main>
      </MainLayout>
    </>
  );
}
