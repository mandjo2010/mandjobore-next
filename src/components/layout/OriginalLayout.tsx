'use client';

import Head from 'next/head';
import React from 'react';

import { useStaticResponsive } from '../../hooks/useStaticResponsive';
import NavigatorSimple from './NavigatorSimple';

interface LayoutProps {
  children: React.ReactNode;
  posts?: Array<{
    slug: string;
    title: string;
    excerpt: string;
    category?: string | null;
    cover?: string | null;
    date: string;
  }>;
  pages?: Array<{
    slug: string;
    title: string;
    menuTitle?: string;
  }>;
  parts?: Array<{
    title: string;
    html: string;
  }>;
  seo?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
}

/**
 * Layout ULTRA-SIMPLIFIÉ - Version ANTI-BOUCLE INFINIE
 * Suppression temporaire des composants problématiques
 */
export default function OriginalLayout({
  children,
  pages: _pages = [],
  parts: _parts = [],
  posts = [],
  seo,
}: LayoutProps) {
  
  const responsive = useStaticResponsive();
  
  console.log('🎯 OriginalLayout - posts reçus:', posts.length);
  
  // SEO meta tags
  const seoTitle = seo?.title || 'Mandjo Béa Boré - Data Analyst & Developer';
  const seoDescription = seo?.description || 'Design and build applications to support data including spatial & geospatial ones.';
  const seoImage = seo?.image || '/images/avatar.svg';
  const seoUrl = seo?.url || 'https://mandjobore.com';

  // Categories extraction removed - ActionsBar temporarily disabled
  
  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:url" content={seoUrl} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={seoUrl} />
      </Head>

      {/* CONTAINER ABSOLU EXACT */}
      <div
        id="original-layout"
        style={{
          background: '#ffffff',
          color: '#555555',
          fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontSize: '16px',
          fontWeight: '300',
          height: '100vh',
          left: 0,
          lineHeight: '1.6',
          overflow: 'hidden',
          position: 'fixed',
          top: 0,
          width: '100vw'
        }}
      >
        {/* InfoBox temporairement désactivée pour diagnostic */}
        {/* <div id="infobox-column" style={{ position: 'absolute', top: 0, left: 0, width: responsive.isMobile ? '0px' : '320px', height: '100vh', background: '#ffffff', borderRight: '1px solid #dedede', zIndex: 100, overflow: 'hidden', opacity: responsive.isMobile ? 0 : 1, pointerEvents: responsive.isMobile ? 'none' : 'auto', transition: 'width 0.3s ease, opacity 0.3s ease' }}>
          <InfoBox />
        </div> */}

        {/* COLONNE 2: Navigator - Centre adaptatif */}
        <div
          id="navigator-column"
          style={{
            background: '#f8f8f8',
            height: '100vh',
            left: responsive.isMobile ? '0px' : '320px',
            overflow: 'auto',
            position: 'absolute',
            top: 0,
            transition: 'left 0.3s ease, width 0.3s ease',
            width: responsive.isMobile ? '100vw' : 'calc(100vw - 320px - 60px)',
            zIndex: 50
          }}
        >
          <NavigatorSimple posts={posts} />
          
          {/* Main Content OVERLAY sur le Navigator */}
          <div
            id="main-content"
            style={{
              background: '#ffffff',
              display: 'none', // Masqué par défaut, visible quand nécessaire
              height: '100%',
              left: 0,
              overflow: 'auto',
              padding: '40px',
              position: 'absolute',
              top: 0,
              width: '100%'
            }}
          >
            {children}
          </div>
        </div>

        {/* COLONNE 3: ActionsBar - Responsive */}
        {/* ActionsBar temporairement désactivée pour diagnostic */}
        {/* {!responsive.isMobile && (
          <div id="actionsbar-column" style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '100vh', background: '#ffffff', borderLeft: '1px solid #dedede', zIndex: 100, transition: 'opacity 0.3s ease' }}>
            <ActionsBar categories={categories} />
          </div>
        )} */}

        {/* InfoBar - Pied de page */}
        <div
          id="infobar-footer"
          style={{
            background: 'rgba(85, 85, 85, 0.95)',
            borderTop: '1px solid #dedede',
            bottom: 0,
            color: '#ffffff',
            height: 'auto',
            left: '320px',
            position: 'absolute',
            width: 'calc(100vw - 320px - 60px)',
            zIndex: 75
          }}
        >
          {/* InfoBar component was removed from imports, so this will cause an error */}
          {/* <InfoBar pages={pages} parts={parts} /> */}
        </div>

        {/* Navigation mobile temporairement désactivée */}
      </div>

      {/* CSS GLOBAL INJECTÉ */}
      <style jsx global>{`
        /* Reset pour forcer le layout original */
        * {
          box-sizing: border-box;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        /* Couleurs exactes du site original */
        a {
          color: #709425;
          text-decoration: none;
        }
        
        a:hover {
          color: #85b02d;
        }
        
        /* Typographie exacte */
        h1, h2, h3, h4, h5, h6 {
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0;
        }
        
        h1 {
          font-size: 1.9em;
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.04em;
        }
        
        h2 {
          font-size: 1.5em;
          font-weight: 300;
          line-height: 1.1;
        }
        
        h3 {
          font-size: 1.3em;
          font-weight: 600;
          line-height: 1.3;
        }
        
        /* Scrollbars personnalisées */
        #navigator-column::-webkit-scrollbar {
          width: 6px;
        }
        
        #navigator-column::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        #navigator-column::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        #navigator-column::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        /* Désactiver sélection sur les colonnes fixes */
        #infobox-column, #actionsbar-column {
          user-select: none;
        }
      `}</style>

      {/* Composants intelligents */}
      {/* SearchIntegration component was removed from imports, so this will cause an error */}
      {/* <SearchIntegration /> */}
      {/* MobileNavigationSafe component was removed from imports, so this will cause an error */}
      {/* <MobileNavigationSafe /> */}
    </>
  );
}
