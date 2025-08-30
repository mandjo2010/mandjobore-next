'use client';

import Link from 'next/link';
import * as React from 'react';

// import { useMinimalNavigatorActions, useMinimalNavigatorState, useMinimalFilters } from '@/store/ui-minimal';
import { useStaticResponsive } from '../../hooks/useStaticResponsive';

interface NavigatorProps {
  posts?: Array<{
    slug: string;
    title: string;
    excerpt: string;
    category?: string | null;
    cover?: string | null;
    date: string;
  }>;
}

/**
 * Navigator - Version TEST isolée (sans store)
 */
export default function Navigator({ posts = [] }: NavigatorProps) {
  // const { moveNavigatorAside, setNavigatorShape } = useMinimalNavigatorActions();
  // const { navigatorPosition, navigatorShape } = useMinimalNavigatorState();
  // const { categoryFilter, clearFilters } = useMinimalFilters();
  const { isWideScreen } = useStaticResponsive();

  // No-op actions et constantes pour casser toute boucle potentielle via le store
  const moveNavigatorAside = React.useCallback(() => {}, []);
  const setNavigatorShape = React.useCallback((_shape: unknown) => {}, []);
  const navigatorPosition = 'is-featured' as string; // Flexible type to avoid TypeScript errors
  const navigatorShape = 'open' as string; // Flexible type to avoid TypeScript errors
  const categoryFilter = 'all posts';
  const clearFilters = React.useCallback(() => {}, []);

  // Filtrage des articles par catégorie (logique Gatsby originale)
  const filteredPosts = React.useMemo(() => {
    if (categoryFilter === 'all posts') {
      return posts;
    }
    return posts.filter(post => post.category === categoryFilter);
  }, [posts, categoryFilter]);

  const linkOnClick = React.useCallback(() => {
    moveNavigatorAside();
  }, [moveNavigatorAside]);

  const expandOnClick = React.useCallback(() => {
    setNavigatorShape('open');
    setTimeout(() => {
      // no-op
    }, 600);
  }, [setNavigatorShape]);

  const removeFilterOnClick = React.useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  // Styles reproduisant exactement le thème Gatsby original
  const theme = React.useMemo(() => ({
    bars: {
      sizes: {
        actionsBar: 60,
        infoBar: 60,
      }
    },
    base: {
      colors: {
        accent: '#709425',
        lines: '#dedede',
      },
      sizes: {
        linesMargin: '20px',
      }
    },
    info: {
      sizes: {
        width: 320,
      }
    },
    mediaQueryTresholds: {
      L: 1024,
      M: 600,
    },
    navigator: {
      colors: {
        background: '#ffffff',
        postsHeader: '#555555',
        postsListItemLink: '#555555',
        postsListItemLinkHover: '#709425',
      },
      sizes: {
        closedHeight: 80,
        fontIncraseForL: 1.3,
        fontIncraseForM: 1.15,
        postsListItemH1Font: 1.3,
        postsListItemH2Font: 1.1,
      }
    }
  }), []);

  const getNavigatorStyles = () => {
    const baseStyles: React.CSSProperties = {
      background: theme.navigator.colors.background,
      height: '100vh',
      left: 0,
      position: 'absolute',
      top: 0,
      transform: 'translate3d(0, 0, 0)',
      transition: 'left .9s',
      transitionTimingFunction: 'ease',
      width: '100%',
      willChange: 'left, top, bottom, width',
    };

    if (!isWideScreen) {
      if (navigatorPosition === 'is-aside') {
        return { ...baseStyles, left: '-100%' };
      }
      if (navigatorPosition === 'is-featured') {
        return { ...baseStyles, left: 0 };
      }
    } else {
      if (navigatorPosition === 'is-featured') {
        return {
          ...baseStyles,
          left: `${theme.info.sizes.width}px`,
          top: 0,
          transition: 'left .9s',
          width: `calc(100vw - ${theme.info.sizes.width}px - ${theme.bars.sizes.actionsBar}px)`,
        };
      }
      if (navigatorPosition === 'is-aside') {
        const asideStyles = {
          ...baseStyles,
          left: 0,
          top: 'auto',
          transition: 'none, bottom 0.5s',
          width: `${theme.info.sizes.width - 1}px`,
          zIndex: 1,
        };
        if (navigatorShape === 'closed') {
          return {
            ...asideStyles,
            bottom: `calc(-100% + 100px + ${theme.navigator.sizes.closedHeight}px)`,
            height: `calc(100% - 100px)`,
          };
        } else {
          return {
            ...asideStyles,
            bottom: 0,
            height: `calc(100% - 100px)`,
          };
        }
      }
      if (navigatorPosition === 'moving-aside') {
        return {
          ...baseStyles,
          left: `calc(-100vw + ${2 * theme.info.sizes.width + 60}px)`,
          top: 0,
          transition: 'left 0.9s',
          width: `calc(100vw - ${theme.info.sizes.width}px - 60px)`,
        };
      }
      if (navigatorPosition === 'moving-featured') {
        return {
          ...baseStyles,
          bottom: '-100%',
          left: 0,
          top: 'auto',
          transition: 'bottom .3s',
          width: `${theme.info.sizes.width - 1}px`,
          zIndex: 1,
        };
      }
    }
    return baseStyles;
  };

  const getInnerStyles = () => {
    const baseInner: React.CSSProperties = {
      padding: `calc(${theme.bars.sizes.infoBar}px + 1.3rem) 1.3rem calc(${theme.bars.sizes.actionsBar}px + 1.3rem) 1.3rem`,
    };
    if (isWideScreen) {
      const desktopInner = {
        ...baseInner,
        left: `${theme.info.sizes.width}px`,
        padding: `2rem  calc(1rem + 17px) calc(2rem + 17px) 2rem`,
      };
      if (navigatorPosition === 'moving-featured' || navigatorPosition === 'is-aside') {
        return { ...desktopInner, padding: '1rem .5rem 1rem .5rem' };
      }
      return desktopInner;
    }
    return baseInner;
  };

  return (
    <nav style={getNavigatorStyles()} className={`navigator ${navigatorPosition} ${navigatorShape}`}>
      <div style={{ bottom: 0, left: 0, position: 'absolute', top: 0, width: '100%' }}>
        <div style={{ height: '100%', overflow: 'auto' }}>
          <div style={getInnerStyles()}>
            <header>
              {navigatorShape === 'closed' && (
                <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', height: '80px', justifyContent: 'space-between', left: 0, margin: 0, padding: '0 30px 0 40px', position: 'absolute', top: 0, width: '100%' }}>
                  <h3 style={{ color: '#555', fontSize: '1.1em', fontWeight: 600, margin: '-.2em 0 0 0', textTransform: 'uppercase' }}>
                    List of posts
                    <small style={{ display: 'block', fontSize: '.6em', fontWeight: 300, letterSpacing: '.2em', margin: '0 0 .1em' }}>
                      {filteredPosts.length} articles
                    </small>
                  </h3>
                  <button onClick={expandOnClick} title="Expand the list" style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '24px', padding: '8px' }}>⌄</button>
                </div>
              )}

              {navigatorShape === 'open' && categoryFilter !== 'all posts' && (
                <div style={{ borderBottom: '1px solid #dedede', color: '#709425', fontSize: '1.2em', fontWeight: 300, lineHeight: 1, margin: '0 calc(-.5rem + 20px) 1em calc(-.5rem + 20px)', padding: '0 1em 1em', position: 'relative' }}>
                  <small style={{ display: 'block', margin: '0 0 .3em 0' }}>Active category filter:</small>
                  <strong style={{ display: 'block', fontWeight: 600 }}>{categoryFilter}</strong>
                  <button onClick={removeFilterOnClick} title="Clear filtering" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '4px', position: 'absolute', right: 0, top: 0 }}>✕</button>
                </div>
              )}
            </header>

            <ul style={{ display: navigatorShape === 'closed' ? 'none' : 'block', listStyle: 'none', margin: 0, padding: 0 }}>
              {filteredPosts.length === 0 ? (
                <div style={{ color: '#666', fontSize: '14px', padding: '40px', textAlign: 'center' }}>
                  {categoryFilter !== 'all posts' ? `Aucun article dans la catégorie "${categoryFilter}"` : '❌ Aucun article trouvé'}
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const isHidden = categoryFilter !== 'all posts' && post.category !== categoryFilter;
                  return (
                    <li key={post.slug} style={{ display: isHidden ? 'none' : 'block', margin: '0 0 .7em 0', transition: 'height 1s' }}>
                      <Link href={`/posts/${post.slug}`} onClick={linkOnClick} style={{ alignContent: 'center', alignItems: 'center', color: '#555', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: '.7em 1em .7em 1em', textDecoration: 'none', transition: 'color .3s' }}>
                        {post.cover && (
                          <div style={{ backgroundImage: `url(${post.cover})`, backgroundPosition: 'center', backgroundSize: 'cover', borderRadius: '75% 65%', flexShrink: 0, height: '90px', margin: '0', marginRight: '.8em', overflow: 'hidden', position: 'relative', transition: 'all .3s ease', width: '90px' }} />
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, margin: '0 0 0 1.5em', width: '100%' }}>
                          <h1 style={{ fontSize: '1.69em', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.15, margin: 0 }}>{post.title}</h1>
                          {post.excerpt && (
                            <h2 style={{ color: '#777', display: 'block', fontSize: '1.43em', fontWeight: 300, lineHeight: 1.2, margin: '.3em 0 0 0' }}>{post.excerpt.substring(0, 100)}...</h2>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
