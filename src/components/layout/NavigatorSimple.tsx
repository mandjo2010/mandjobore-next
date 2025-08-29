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
  const navigatorPosition: 'is-featured' | 'is-aside' | 'moving-aside' | 'moving-featured' = 'is-featured';
  const navigatorShape: 'open' | 'closed' = 'open';
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
    navigator: {
      colors: {
        background: '#ffffff',
        postsListItemLink: '#555555',
        postsListItemLinkHover: '#709425',
        postsHeader: '#555555',
      },
      sizes: {
        closedHeight: 80,
        postsListItemH1Font: 1.3,
        postsListItemH2Font: 1.1,
        fontIncraseForM: 1.15,
        fontIncraseForL: 1.3,
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
    bars: {
      sizes: {
        infoBar: 60,
        actionsBar: 60,
      }
    },
    info: {
      sizes: {
        width: 320,
      }
    },
    mediaQueryTresholds: {
      M: 600,
      L: 1024,
    }
  }), []);

  const getNavigatorStyles = () => {
    const baseStyles: React.CSSProperties = {
      transform: 'translate3d(0, 0, 0)',
      willChange: 'left, top, bottom, width',
      background: theme.navigator.colors.background,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100vh',
      transitionTimingFunction: 'ease',
      transition: 'left .9s',
      width: '100%',
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
          transition: 'left .9s',
          width: `calc(100vw - ${theme.info.sizes.width}px - ${theme.bars.sizes.actionsBar}px)`,
          left: `${theme.info.sizes.width}px`,
          top: 0,
        };
      }
      if (navigatorPosition === 'is-aside') {
        const asideStyles = {
          ...baseStyles,
          transition: 'none, bottom 0.5s',
          left: 0,
          width: `${theme.info.sizes.width - 1}px`,
          zIndex: 1,
          top: 'auto',
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
          transition: 'left 0.9s',
          left: `calc(-100vw + ${2 * theme.info.sizes.width + 60}px)`,
          width: `calc(100vw - ${theme.info.sizes.width}px - 60px)`,
          top: 0,
        };
      }
      if (navigatorPosition === 'moving-featured') {
        return {
          ...baseStyles,
          transition: 'bottom .3s',
          bottom: '-100%',
          top: 'auto',
          left: 0,
          zIndex: 1,
          width: `${theme.info.sizes.width - 1}px`,
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
        padding: `2rem  calc(1rem + 17px) calc(2rem + 17px) 2rem`,
        left: `${theme.info.sizes.width}px`,
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
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100%' }}>
        <div style={{ height: '100%', overflow: 'auto' }}>
          <div style={getInnerStyles()}>
            <header>
              {navigatorShape === 'closed' && (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: 0, left: 0, width: '100%', margin: 0, height: '80px', padding: '0 30px 0 40px' }}>
                  <h3 style={{ fontSize: '1.1em', color: '#555', fontWeight: 600, margin: '-.2em 0 0 0', textTransform: 'uppercase' }}>
                    List of posts
                    <small style={{ fontSize: '.6em', display: 'block', margin: '0 0 .1em', fontWeight: 300, letterSpacing: '.2em' }}>
                      {filteredPosts.length} articles
                    </small>
                  </h3>
                  <button onClick={expandOnClick} title="Expand the list" style={{ color: '#555', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', padding: '8px' }}>⌄</button>
                </div>
              )}

              {navigatorShape === 'open' && categoryFilter !== 'all posts' && (
                <div style={{ margin: '0 calc(-.5rem + 20px) 1em calc(-.5rem + 20px)', position: 'relative', fontSize: '1.2em', lineHeight: 1, color: '#709425', borderBottom: '1px solid #dedede', padding: '0 1em 1em', fontWeight: 300 }}>
                  <small style={{ display: 'block', margin: '0 0 .3em 0' }}>Active category filter:</small>
                  <strong style={{ fontWeight: 600, display: 'block' }}>{categoryFilter}</strong>
                  <button onClick={removeFilterOnClick} title="Clear filtering" style={{ position: 'absolute', top: 0, right: 0, background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', padding: '4px' }}>✕</button>
                </div>
              )}
            </header>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: navigatorShape === 'closed' ? 'none' : 'block' }}>
              {filteredPosts.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
                  {categoryFilter !== 'all posts' ? `Aucun article dans la catégorie "${categoryFilter}"` : '❌ Aucun article trouvé'}
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const isHidden = categoryFilter !== 'all posts' && post.category !== categoryFilter;
                  return (
                    <li key={post.slug} style={{ margin: '0 0 .7em 0', transition: 'height 1s', display: isHidden ? 'none' : 'block' }}>
                      <Link href={`/posts/${post.slug}`} onClick={linkOnClick} style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', padding: '.7em 1em .7em 1em', color: '#555', textDecoration: 'none', transition: 'color .3s' }}>
                        {post.cover && (
                          <div style={{ position: 'relative', flexShrink: 0, overflow: 'hidden', borderRadius: '75% 65%', width: '90px', height: '90px', margin: '0', marginRight: '.8em', transition: 'all .3s ease', backgroundImage: `url(${post.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                        )}
                        <div style={{ margin: '0 0 0 1.5em', flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                          <h1 style={{ lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.03em', margin: 0, fontSize: '1.69em' }}>{post.title}</h1>
                          {post.excerpt && (
                            <h2 style={{ lineHeight: 1.2, display: 'block', fontSize: '1.43em', margin: '.3em 0 0 0', fontWeight: 300, color: '#777' }}>{post.excerpt.substring(0, 100)}...</h2>
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
