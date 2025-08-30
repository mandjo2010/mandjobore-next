'use client';

import Link from 'next/link';
import * as React from 'react';

import { useNavigatorActions, useNavigatorState } from '@/store/gatsby-ui-store';

import { useStaticResponsive } from '../../hooks/useStaticResponsive';

/**
 * InfoBox - Version TEST avec store minimal
 * - Header avec avatar et expand button
 * - Version ultra-simplifiée pour éliminer les boucles
 */
export default function InfoBox() {
  const { featureNavigator, setNavigatorShape } = useNavigatorActions();
  const { navigatorPosition, navigatorShape } = useNavigatorState();
  const { isWideScreen } = useStaticResponsive();

  const expandOnClick = () => {
    setNavigatorShape('closed');
  };

  const avatarOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    featureNavigator();
  };

  const menulinkOnClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const dataShape = target.getAttribute('data-shape') || 'open';
    // Pour l'instant on utilise featureNavigator, moveNavigatorAside sera implémenté plus tard
    if (dataShape === 'closed') {
      setNavigatorShape('closed');
    }
    featureNavigator();
  };

  // Configuration de l'auteur (du fichier config original)
  const config = {
    authorSocialLinks: [
      { name: 'github', url: 'https://github.com/mandjo2010' },
      { name: 'linkedin', url: 'https://fr.linkedin.com/in/mandjobb' },
      { name: 'twitter', url: 'https://twitter.com/mandjo2010' },
      { name: 'email', url: 'mailto:boremandjo@gmail.com' },
    ],
    infoTitle: 'Mandjo Béa Boré',
    infoTitleNote: 'Data analyst - Developer',
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
    base: {
      colors: {
        lines: '#dedede',
      },
      sizes: {
        linesMargin: '20px',
      }
    },
    info: {
      colors: {
        background: '#ffffff',
        menuLink: '#555555',
        menuLinkHover: '#709425',
        socialIcons: '#bbbbbb',
        socialIconsHover: '#709425',
        text: '#555555',
      },
      fonts: {
        boxTitleSize: 1.3,
      },
      sizes: {
        headerHeight: 170,
        width: 320,
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
        background: theme.info.colors.background,
        color: theme.info.colors.text,
        display: 'block',
        height: '100%',
        left: 0,
        padding: '20px 40px',
        position: 'absolute',
        top: 0,
        width: `${theme.info.sizes.width}px`,
        ...{
          '&::after': {
            borderRight: `1px solid ${theme.base.colors.lines}`,
            bottom: '20px',
            content: '""',
            position: 'absolute',
            right: 0,
            top: '20px',
            width: '1px',
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
            display: 'block',
            float: 'left',
            willChange: 'left, top',
            ...(isWideScreen ? {
              left: '50%',
              margin: '0 20px 0 0',
              marginLeft: '-30px',
              position: 'absolute',
              top: '10px',
              transition: 'all .5s ease',
              ...(navigatorShape === 'open' && {
                left: '8%',
                top: '0',
              })
            } : {
              margin: '0 20px 0 0',
              position: 'relative',
            }),
            textDecoration: 'none',
          }}
        >
          <div style={{
            backgroundImage: 'url(/images/avatar.svg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            border: '1px solid #ddd',
            borderRadius: '65% 75%',
            display: 'inline-block',
            height: '60px',
            overflow: 'hidden',
            transition: 'all .3s ease',
            width: '60px',
          }} />
        </Link>

        <h1 style={{
          float: 'left',
          fontSize: `${theme.info.fonts.boxTitleSize}em`,
          margin: 0,
          transition: 'all .5s ease',
          willChange: 'transform, left, top',
          ...(isWideScreen && {
            left: '50%',
            position: 'absolute',
            textAlign: 'center',
            top: '85px',
            transform: 'translate(-50%)',
            ...(navigatorShape === 'open' && {
              left: '60%',
              textAlign: 'left',
              top: `${1.9 - theme.info.fonts.boxTitleSize}em`,
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
            background: 'none',
            border: 'none',
            borderRadius: '50%',
            color: theme.info.colors.text,
            cursor: 'pointer',
            display: navigatorShape === 'open' ? 'block' : 'none',
            fontSize: '20px',
            padding: '8px',
            position: 'absolute',
            right: '-25px',
            top: '30px',
            transition: 'all 0.3s ease',
          }}
        >
          ⌄
        </button>
      </header>

      {/* WRAPPER - Contenu qui apparaît/disparaît */}
      <div style={{
        bottom: 0,
        left: 0,
        opacity: 1,
        padding: '0 40px 0',
        position: 'absolute',
        top: `${theme.info.sizes.headerHeight}px`,
        transition: 'bottom .5s 0s ease',
        width: '100%',
        willChange: 'opacity, bottom',
        ...(navigatorShape === 'closed' && {
          bottom: '80px', // Équivalent de closedHeight
        })
      }}>
        
        {/* BIO TEXT */}
        <div style={{
          display: 'block',
          fontSize: '.95em',
          fontWeight: 300,
          lineHeight: 1.5,
          marginBottom: '.8em',
          textAlign: 'left',
        }}>
          <p style={{ marginTop: 0 }}>
            Passionné par le développement web moderne et l'analyse de données géospatiales. 
            Spécialisé en React, Next.js, Python et technologies SIG.
          </p>
        </div>

        {/* SOCIAL ICONS */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
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
                color: theme.info.colors.socialIcons,
                display: 'block',
                fontSize: '24px',
                padding: '5px',
                textDecoration: 'none',
                transition: 'all .5s',
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
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
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
                color: theme.info.colors.menuLink,
                fontWeight: 300,
                padding: '.5em',
                textDecoration: 'none',
                textTransform: 'lowercase',
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
              color: theme.info.colors.menuLink,
              fontWeight: 300,
              padding: '.5em',
              textDecoration: 'none',
              textTransform: 'lowercase',
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
          bottom: 0,
          left: 0,
          padding: '1em 2em',
          position: 'absolute',
          width: '100%',
        }}>
          <h5 style={{
            fontSize: '.85em',
            fontWeight: 300,
            letterSpacing: '.3em',
            margin: '0 0 .8em 0',
            textAlign: 'center',
            width: '100%',
          }}>
            BUILT WITH:
          </h5>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {stackItems.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.name}
                style={{
                  color: theme.info.colors.socialIcons,
                  display: 'inline-block',
                  fontSize: '12px',
                  padding: '8px',
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
