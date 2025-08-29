'use client';

import Link from 'next/link';
import * as React from 'react';

import { useMinimalNavigatorActions, useMinimalNavigatorState } from '@/store/ui-minimal';
import { useStaticResponsive } from '../../hooks/useStaticResponsive';

/**
 * InfoBox - Version TEST avec store minimal
 * - Header avec avatar et expand button
 * - Version ultra-simplifiée pour éliminer les boucles
 */
export default function InfoBox() {
  const { setNavigatorShape, moveNavigatorFeatured } = useMinimalNavigatorActions();
  const { navigatorPosition, navigatorShape } = useMinimalNavigatorState();
  const { isWideScreen } = useStaticResponsive();

  const expandOnClick = () => {
    setNavigatorShape('closed');
  };

  const avatarOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    moveNavigatorFeatured();
  };

  const menulinkOnClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const dataShape = target.getAttribute('data-shape') || 'open';
    // Pour l'instant on utilise moveNavigatorFeatured, moveNavigatorAside sera implémenté plus tard
    if (dataShape === 'closed') {
      setNavigatorShape('closed');
    }
    moveNavigatorFeatured();
  };

  // Configuration de l'auteur (du fichier config original)
  const config = {
    infoTitle: 'Mandjo Béa Boré',
    infoTitleNote: 'Data analyst - Developer',
    authorSocialLinks: [
      { name: 'github', url: 'https://github.com/mandjo2010' },
      { name: 'linkedin', url: 'https://linkedin.com/in/mandjo-bore' },
      { name: 'twitter', url: 'https://twitter.com/mandjo2010' },
      { name: 'email', url: 'mailto:boremandjo@gmail.com' },
    ],
  };

  const menuPages = [
    { slug: '/pages/about', title: 'About' },
    { slug: '/pages/cartography', title: 'Cartography' }, 
    { slug: '/pages/portfolio', title: 'Portfolio' },
  ];

  const stackItems = [
    { name: 'nextjs', url: 'https://nextjs.org/' },
    { name: 'react', url: 'https://reactjs.org/' },
    { name: 'typescript', url: 'https://www.typescriptlang.org/' },
    { name: 'emotion', url: 'https://emotion.sh/' },
    { name: 'material-ui', url: 'https://mui.com/' },
    { name: 'zustand', url: 'https://zustand-demo.pmnd.rs/' },
    { name: 'nodejs', url: 'https://nodejs.org/' },
    { name: 'postgres', url: 'https://postgresql.org/' },
    { name: 'python', url: 'https://python.org/' },
    { name: 'vercel', url: 'https://vercel.com/' },
  ];

  // Styles reproduisant exactement le thème Gatsby original
  const theme = {
    info: {
      colors: {
        text: '#555555',
        background: '#ffffff',
        socialIcons: '#bbbbbb',
        socialIconsHover: '#709425',
        menuLink: '#555555',
        menuLinkHover: '#709425',
      },
      sizes: {
        width: 320,
        headerHeight: 170,
      },
      fonts: {
        boxTitleSize: 1.3,
      }
    },
    base: {
      colors: {
        lines: '#dedede',
      },
      sizes: {
        linesMargin: '20px',
      }
    },
    mediaQueryTresholds: {
      L: 1024,
    }
  };

  if (!isWideScreen) {
    return null; // InfoBox ne s'affiche qu'en desktop comme dans Gatsby
  }

  return (
    <aside 
      style={{
        display: 'block',
        color: theme.info.colors.text,
        background: theme.info.colors.background,
        position: 'absolute',
        left: 0,
        top: 0,
        width: `${theme.info.sizes.width}px`,
        height: '100%',
        padding: '20px 40px',
        ...{
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            top: '20px',
            bottom: '20px',
            width: '1px',
            borderRight: `1px solid ${theme.base.colors.lines}`,
          }
        }
      }}
      className={`infobox ${navigatorPosition} ${navigatorShape}`}
    >
      {/* HEADER avec Avatar et Expand Button */}
      <header style={{ lineHeight: 1, position: 'relative' }}>
        <Link 
          href="/" 
          onClick={avatarOnClick}
          title="back to Home page"
          style={{
            willChange: 'left, top',
            float: 'left',
            display: 'block',
            ...(isWideScreen ? {
              position: 'absolute',
              top: '10px',
              left: '50%',
              marginLeft: '-30px',
              margin: '0 20px 0 0',
              transition: 'all .5s ease',
              ...(navigatorShape === 'open' && {
                left: '8%',
                top: '0',
              })
            } : {
              position: 'relative',
              margin: '0 20px 0 0',
            }),
            textDecoration: 'none',
          }}
        >
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '65% 75%',
            border: '1px solid #ddd',
            transition: 'all .3s ease',
            display: 'inline-block',
            overflow: 'hidden',
            backgroundImage: 'url(/images/avatar.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        </Link>

        <h1 style={{
          willChange: 'transform, left, top',
          fontSize: `${theme.info.fonts.boxTitleSize}em`,
          margin: 0,
          float: 'left',
          transition: 'all .5s ease',
          ...(isWideScreen && {
            position: 'absolute',
            top: '85px',
            textAlign: 'center',
            left: '50%',
            transform: 'translate(-50%)',
            ...(navigatorShape === 'open' && {
              left: '60%',
              top: `${1.9 - theme.info.fonts.boxTitleSize}em`,
              textAlign: 'left',
            })
          })
        }}>
          {config.infoTitle.replace(/ /g, '\u00a0')}
          <small style={{ display: 'block', fontSize: '.6em', marginTop: '.3em' }}>
            {config.infoTitleNote}
          </small>
        </h1>

        <button
          onClick={expandOnClick}
          title="Expand the box"
          style={{
            position: 'absolute',
            top: '30px',
            right: '-25px',
            display: navigatorShape === 'open' ? 'block' : 'none',
            background: 'none',
            border: 'none',
            color: theme.info.colors.text,
            fontSize: '20px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
          }}
        >
          ⌄
        </button>
      </header>

      {/* WRAPPER - Contenu qui apparaît/disparaît */}
      <div style={{
        position: 'absolute',
        top: `${theme.info.sizes.headerHeight}px`,
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '0 40px 0',
        willChange: 'opacity, bottom',
        transition: 'bottom .5s 0s ease',
        opacity: 1,
        ...(navigatorShape === 'closed' && {
          bottom: '80px', // Équivalent de closedHeight
        })
      }}>
        
        {/* BIO TEXT */}
        <div style={{
          display: 'block',
          fontWeight: 300,
          lineHeight: 1.5,
          fontSize: '.95em',
          textAlign: 'left',
          marginBottom: '.8em',
        }}>
          <p style={{ marginTop: 0 }}>
            Passionné par le développement web moderne et l'analyse de données géospatiales. 
            Spécialisé en React, Next.js, Python et technologies SIG.
          </p>
        </div>

        {/* SOCIAL ICONS */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          margin: '1.5em 0',
        }}>
          {config.authorSocialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={item.name}
              style={{
                display: 'block',
                padding: '5px',
                fontSize: '24px',
                color: theme.info.colors.socialIcons,
                transition: 'all .5s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.info.colors.socialIconsHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.info.colors.socialIcons;
              }}
            >
              {item.name === 'github' && '🐙'}
              {item.name === 'linkedin' && '💼'}
              {item.name === 'twitter' && '🐦'}
              {item.name === 'email' && '📧'}
            </a>
          ))}
        </div>

        {/* INFO MENU */}
        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          listStyle: 'none',
          margin: 0,
          width: '100%',
        }}>
          {menuPages.map((page) => (
            <Link
              key={page.slug}
              href={page.slug}
              onClick={menulinkOnClick}
              data-shape="closed"
              style={{
                padding: '.5em',
                fontWeight: 300,
                textTransform: 'lowercase',
                color: theme.info.colors.menuLink,
                textDecoration: 'none',
                transition: 'color .3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.info.colors.menuLinkHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.info.colors.menuLink;
              }}
            >
              {page.title}
            </Link>
          ))}
          <Link
            href="/contact/"
            onClick={menulinkOnClick}
            data-shape="closed"
            style={{
              padding: '.5em',
              fontWeight: 300,
              textTransform: 'lowercase',
              color: theme.info.colors.menuLink,
              textDecoration: 'none',
              transition: 'color .3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = theme.info.colors.menuLinkHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = theme.info.colors.menuLink;
            }}
          >
            Contact
          </Link>
        </nav>

        {/* STACK ICONS - En bas */}
        <div style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          padding: '1em 2em',
        }}>
          <h5 style={{
            textAlign: 'center',
            fontSize: '.85em',
            letterSpacing: '.3em',
            width: '100%',
            margin: '0 0 .8em 0',
            fontWeight: 300,
          }}>
            BUILT WITH:
          </h5>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {stackItems.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.name}
                style={{
                  display: 'inline-block',
                  padding: '8px',
                  fontSize: '12px',
                  color: theme.info.colors.socialIcons,
                  textDecoration: 'none',
                  transition: 'color .3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.info.colors.socialIconsHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.info.colors.socialIcons;
                }}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
