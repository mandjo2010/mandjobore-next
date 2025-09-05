/**
 * InfoBox - Sidebar reproduisant fidèlement le design Gatsby original
 * Basé sur src/components/InfoBox/InfoBox.js du starter de Greg Lobinski
 * Structure exacte : InfoHeader + wrapper(InfoText + SocialIcons + InfoMenu + StackIcons)
 * Nouveauté : Basculement entre contenu auteur et liste des posts (Expand box/list)
 */
'use client'

import { ExpandMore } from '@mui/icons-material'
import { Box, Typography, IconButton, Avatar } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope,
  FaReact,
  FaPython,
  FaFacebook,
  FaInstagram
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { 
  SiNextdotjs,
  SiTypescript,
  SiMui,
  SiPostgresql,
  SiQgis,
  SiRedux
} from 'react-icons/si'

import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

import InfoMenu from './InfoMenu'
import PostsList from './PostsList'

// Configuration de l'auteur - comme dans Gatsby config
const author = {
  avatar: '/images/jpg/avatar.jpg',
  bio: 'Design and build applications to support data including spatial & geospatial ones.',
  name: 'Mandjo Béa Boré',
  social: {
    email: 'mailto:contact@mandjobore.com',
    facebook: 'https://www.instagram.com/mandjo_bb/', // Nouveau Facebook
    github: 'https://github.com/mandjo2010',
    instagram: 'https://www.instagram.com/mandjo_bb/', // Nouveau Instagram
    linkedin: 'https://fr.linkedin.com/in/mandjobb',
    x: 'https://x.com/kozoubea' // Lien X mis à jour
  },
  tagline: 'Data analyst - Developer'
}

// Tech stack avec icônes comme dans le original
const techStack = [
  { color: '#000000', icon: SiNextdotjs, name: 'Next.js', url: 'https://nextjs.org/' },
  { color: '#61DAFB', icon: FaReact, name: 'React', url: 'https://reactjs.org/' },
  { color: '#3178C6', icon: SiTypescript, name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
  { color: '#007FFF', icon: SiMui, name: 'MUI', url: 'https://mui.com/' },
  { color: '#FF6B35', icon: SiRedux, name: 'Zustand', url: 'https://github.com/pmndrs/zustand' },
  { color: '#3776AB', icon: FaPython, name: 'Python', url: 'https://www.python.org/' },
  { color: '#336791', icon: SiPostgresql, name: 'PostGIS', url: 'https://postgis.net/' },
  { color: '#589632', icon: SiQgis, name: 'QGIS', url: 'https://qgis.org/' }
]

interface Page {
  slug: string
  title: string
  menuTitle?: string
}

interface Part {
  title: string
  html: string
}

interface Post {
  id: string
  slug: string
  title: string
  subtitle?: string
  excerpt?: string
  cover?: string
  date: string
  category?: string
}

interface InfoBoxProps {
  pages: Page[]
  parts: Part[]
  posts?: Post[] // Ajout pour la liste des posts dans la sidebar
}

export default function InfoBox({ pages, parts: _parts, posts = [] }: InfoBoxProps) {
  const router = useRouter()
  const isHomePage = router.pathname === '/'
  
  // États du store Gatsby
  const { 
    featureNavigator, 
    moveNavigatorAside, 
    navigatorPosition,
    navigatorShape,
    setNavigatorShape,
    setShowPostsList,
    showPostsList
  } = useGatsbyUIStore()
  
  // Actions du composant original
  const expandOnClick = () => {
    setNavigatorShape('closed') // Reproduit exactement l'action du original
  }

  // Action pour basculer vers la liste des posts (bouton "Expand the list")
  const expandListOnClick = () => {
    setShowPostsList(true) // Affiche la liste des posts dans la sidebar
  }

  // Action pour revenir au contenu auteur (bouton "Expand the box")
  const expandBoxOnClick = () => {
    setShowPostsList(false) // Cache la liste des posts
  }
  
  const menuLinkOnClick = () => {
    moveNavigatorAside() // Navigation vers pages
  }

  const avatarOnClick = () => {
    featureNavigator() // Retour à l'accueil avec 3 colonnes
    router.push('/') // Navigation vers la page d'accueil
  }

  return (
    <Box
      component="aside"
      className={`${navigatorPosition} ${navigatorShape}`}
      sx={{
        // Medium/Small screens: moins de 1024px = InfoBox masquée (InfoBar prend le relais)
        '@media (max-width: 1023px)': {
          display: 'none' // Masquée pour laisser place au mode horizontal
        },
        
        // Large screens: 1024px+ = Affichage complet de l'InfoBox (mode vertical)
        '@media (min-width: 1024px)': {
          // Border right comme dans le original avec theme.base.colors.lines
          '&::after': {
            borderRight: '1px solid #e0e0e0', // Couleur exacte du thème Gatsby (--base-lines)
            bottom: 'var(--lines-margin)',
            content: '""',
            position: 'absolute',
            right: 0,
            top: 'var(--lines-margin)', // theme.base.sizes.linesMargin
            width: '1px'
          },
          background: 'var(--c-background)', // theme.info.colors.background
          color: 'var(--c-text)', // theme.info.colors.text
          display: 'block',
          height: '100%',
          left: 0,
          padding: '20px 40px',
          position: 'absolute',
          top: 0,
          
          width: 'var(--layout-infobox-width)' // theme.info.sizes.width = 300px
        },
        
        // Style de base du container infoBox (reproduction exacte du theme Gatsby)
        display: 'none'
      }}
    >
      {/* InfoHeader - Avatar, Nom et bouton "Expand the box" */}
      <Box
        component="header"
        sx={{
          lineHeight: 1,
          position: 'relative'
        }}
      >
        {/* Avatar avec lien vers accueil - styles exacts InfoHeader */}
        <Box
          component={Link}
          href="/" 
          onClick={avatarOnClick}
          title="back to Home page"
          sx={{
            '@media (min-width: 768px)': { // theme.mediaQueryTresholds.M
              margin: '0 20px 0 0'
            },
            '@media (min-width: 1024px)': { // theme.mediaQueryTresholds.L
              // Position selon l'état du navigator (.is-aside.open &)
              '.is-aside.open &': {
                left: '8%',
                top: '0'
              },
              // Styles pour .navigator-in-transition-from.navigator-is-opened
              '.navigator-in-transition-from.navigator-is-opened &': {
                left: '50%'
              },
              left: '50%',
              marginLeft: '-30px',
              position: 'absolute',
              
              top: '10px',
              
              transition: 'all 0.5s ease'
            },
            display: 'block',
            float: 'left',
            margin: '0 12px 0 0',
            position: 'relative',
            
            textDecoration: 'none',
            
            // Reproduction exacte des styles avatarLink du theme original
            willChange: 'left, top'
          }}
        >
          <Avatar
            src={author.avatar}
            alt={author.name}
            sx={{
              '& img': {
                maxWidth: '100%'
              },
              // Hover effect exact de l'original
              '@media (hover: hover)': {
                '&:hover': {
                  borderRadius: '75% 65%'
                }
              },
              '@media (min-width: 768px)': { // theme.mediaQueryTresholds.M
                height: '44px',
                width: '44px'
              },
              '@media (min-width: 1024px)': { // theme.mediaQueryTresholds.L
                height: '60px',
                width: '60px'
              },
              border: '1px solid #ddd',
              borderRadius: '65% 75%',
              display: 'inline-block',
              
              height: '36px',
              
              overflow: 'hidden',
              
              transition: 'all 0.3s ease',
              
              // Reproduction exacte des styles avatar du theme original
              width: '36px'
            }}
          />
        </Box>

        {/* Nom de l'auteur - styles selon spécifications exactes */}
        <Typography
          component="h1"
          sx={{
            '@media (min-width: 768px)': { // theme.mediaQueryTresholds.M
              fontSize: '27px !important', // Taille selon spécifications
              // Garde les éléments groupés même sur tablet
              position: 'relative',
              textAlign: 'left'
            },
            '@media (min-width: 1024px)': { // theme.mediaQueryTresholds.L
              // Position selon l'état du navigator (.is-aside.open &)
              '.is-aside.open &': {
                left: '60%',
                textAlign: 'left',
                top: '0.5em',
                transform: 'none'
              },
              fontSize: '27px !important', // Nom auteur selon spécifications: 27px
              left: '50%',
              position: 'absolute',
              textAlign: 'center',
              top: '85px',
              transform: 'translate(-50%)',
              transition: 'all 0.5s ease'
            },
            // Nom auteur selon spécifications exactes: Open Sans 300, 27px/27px, color #555
            color: '#555555 !important',
            float: 'left',
            fontFamily: '"Open Sans" !important',
            fontSize: '27px !important',
            fontWeight: '300 !important',
            lineHeight: '27px !important',
            margin: '0 !important',
            transition: 'all 0.5s ease',
            // Reproduction exacte des styles title du theme original
            willChange: 'transform, left, top'
          }}
        >
          {author.name.replace(/ /g, '\u00a0')} {/* Non-breaking spaces comme l'original */}
        </Typography>

        {/* Titre/tagline de l'auteur - élément séparé pour meilleure sélectabilité */}
        <Typography
          component="div"
          className="avatar-title-tagline" // Classe spécifique pour override CSS
          sx={{
            // Force l'override de tous les styles externes qui pourraient affecter la line-height
            '&, & *': {
              lineHeight: '16px !important'
            },
            '@media (min-width: 768px)': { // theme.mediaQueryTresholds.M
              // Garde les éléments groupés même sur tablet
              position: 'relative',
              textAlign: 'left'
            },
            '@media (min-width: 1024px)': { // theme.mediaQueryTresholds.L
              // Position selon l'état du navigator (.is-aside.open &)
              '.is-aside.open &': {
                left: '60%',
                textAlign: 'left',
                top: '2em', // Positionné sous le nom
                transform: 'none'
              },
              left: '50%',
              position: 'absolute',
              textAlign: 'center',
              top: '115px', // Positionné sous le nom (85px + 27px + 3px de marge)
              transform: 'translate(-50%)',
              transition: 'all 0.5s ease'
            },
            // Titre auteur selon spécifications: Open Sans 300, 16px/16px, color #555
            color: '#555555 !important',
            cursor: 'text', // Indication visuelle que le texte est sélectionnable
            display: 'inline', // Une seule ligne
            fontFamily: '"Open Sans" !important',
            fontSize: '16px !important',
            fontWeight: '300 !important',
            lineHeight: '16px !important', // Force la line-height à 16px exactement
            margin: '4px 0 0 0 !important',
            transition: 'all 0.5s ease',
            userSelect: 'text', // Assure la sélectabilité du texte
            whiteSpace: 'nowrap', // Empêche le retour à la ligne
            willChange: 'transform, left, top'
          }}
        >
          {author.tagline}
        </Typography>

        {/* Bouton "Expand the box" - styles exacts du theme original */}
        <IconButton
          aria-label="Expand the box"
          onClick={expandOnClick}
          title="Expand the box"
          sx={{
            // Visible uniquement quand .is-aside.open (mode article)
            '.is-aside.open &': {
              display: 'block'
            },
            color: 'var(--c-text)', // theme.info.colors.text
            display: 'none',
            // Reproduction exacte des styles expand du theme original
            position: 'absolute',
            right: '-25px',
            
            top: '30px'
          }}
        >
          <ExpandMore />
        </IconButton>
      </Box>

      {/* Wrapper du contenu avec transitions exactes du original */}
      <Box
        className="info-box-wrapper"
        sx={{
          '&::-webkit-scrollbar': {
            background: 'transparent',
            display: 'none',
            height: 0,
            width: 0
          },
          // Animations selon navigatorShape (comme dans l'original Gatsby)
          '.is-aside.closed &': {
            bottom: '80px' // theme.navigator.sizes.closedHeight
          },
          '.moving-featured &': {
            bottom: 0
          },
          bottom: 0,
          left: 0,
          msOverflowStyle: 'none',
          opacity: 1,
          overflowX: 'hidden',
          overflowY: 'auto',
          padding: '0 40px 0',
          // Reproduction exacte des styles wrapper du theme original
          position: 'absolute',
          
          // Masquage complet de la barre de défilement comme Gatsby original
          scrollbarWidth: 'none',
          top: '130px', // theme.info.sizes.headerHeight (ajusté pour notre structure)
          transition: 'bottom 0.5s ease',
          
          width: '100%',
          
          willChange: 'opacity, bottom'
        }}
      >
        {/* Affichage conditionnel : Info auteur OU Liste des posts */}
        {/* Reproduit exactement la logique Gatsby : toujours afficher le contenu auteur par défaut */}
        {/* La liste des posts s'affiche seulement quand showPostsList est true */}
        {!showPostsList ? (
          // Contenu auteur (original InfoBox)
          <>
            {/* InfoText - Bio de l'auteur avec styles exacts */}
            <Box
              sx={{
                '& p:first-child': {
                  marginTop: 0
                },
                '& p:last-child': {
                  marginBottom: 0
                },
                // Reproduction exacte des styles text du theme original
                display: 'block',
                fontSize: '0.95em',
                fontWeight: 300,
                lineHeight: 1.5,
                
                marginBottom: '0.8em',
                // Espacement optimal entre titre et bio : ni trop serré, ni trop espacé
                marginTop: '40px', 
                textAlign: 'left'
              }}
            >
              <Typography
                sx={{
                  color: '#555555',
                  fontSize: '0.95em',
                  fontWeight: 300,
                  lineHeight: 1.5
                }}
              >
                {author.bio}
              </Typography>
            </Box>

            {/* SocialIcons - Réseaux sociaux avec couleurs exactes du theme */}
            <Box
              sx={{
                // Reproduction exacte des styles social du theme original
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5em', // Espacement léger entre les icônes
                justifyContent: 'center',
                marginBottom: '1.2em' // Réduit l'espacement vers le menu de navigation
              }}
            >
              <Link href={author.social.github} target="_blank" rel="noopener noreferrer">
                <IconButton
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                      boxShadow: 'none !important' // Pas d'ombre au survol
                    },
                    '&:hover svg': {
                      color: '#709425' // Vert foncé comme les liens d'articles
                    },
                    boxShadow: 'none !important', // Suppression de l'ombre
                    color: '#966588', // Couleur exacte du theme original pour github
                    display: 'block',
                    padding: '5px'
                  }}
                  title="github"
                >
                  <FaGithub size={22} />
                </IconButton>
              </Link>
              <Link href={author.social.linkedin} target="_blank" rel="noopener noreferrer">
                <IconButton
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                      boxShadow: 'none !important' // Pas d'ombre au survol
                    },
                    '&:hover svg': {
                      color: '#005885' // Bleu LinkedIn plus foncé pour le hover (cohérent)
                    },
                    boxShadow: 'none !important', // Suppression de l'ombre
                    color: '#0077B5', // Bleu LinkedIn officiel (cohérent avec SocialIcons.tsx)
                    display: 'block',
                    padding: '5px'
                  }}
                  title="linkedin"
                >
                  <FaLinkedin size={22} />
                </IconButton>
              </Link>
              <Link href={author.social.x} target="_blank" rel="noopener noreferrer">
                <IconButton
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                      boxShadow: 'none !important' // Pas d'ombre au survol
                    },
                    '&:hover svg': {
                      color: '#709425' // Vert foncé comme les liens d'articles
                    },
                    boxShadow: 'none !important', // Suppression de l'ombre
                    color: '#000000', // Couleur noire pour X (nouveau logo)
                    display: 'block',
                    padding: '5px'
                  }}
                  title="x"
                >
                  <FaXTwitter size={22} />
                </IconButton>
              </Link>
              <Link href={author.social.facebook} target="_blank" rel="noopener noreferrer">
                <IconButton
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                      boxShadow: 'none !important' // Pas d'ombre au survol
                    },
                    '&:hover svg': {
                      color: '#709425' // Vert foncé comme les liens d'articles
                    },
                    boxShadow: 'none !important', // Suppression de l'ombre
                    color: '#3c5898', // Couleur exacte du theme original pour facebook
                    display: 'block',
                    padding: '5px'
                  }}
                  title="facebook"
                >
                  <FaFacebook size={22} />
                </IconButton>
              </Link>
              <Link href={author.social.instagram} target="_blank" rel="noopener noreferrer">
                <IconButton
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                      boxShadow: 'none !important' // Pas d'ombre au survol
                    },
                    '&:hover svg': {
                      color: '#709425' // Vert foncé comme les liens d'articles
                    },
                    boxShadow: 'none !important', // Suppression de l'ombre
                    color: '#E4405F', // Couleur officielle Instagram
                    display: 'block',
                    padding: '5px'
                  }}
                  title="instagram"
                >
                  <FaInstagram size={22} />
                </IconButton>
              </Link>
              <Link href={author.social.email}>
                <IconButton
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                      boxShadow: 'none !important' // Pas d'ombre au survol
                    },
                    '&:hover svg': {
                      color: '#709425' // Vert foncé comme les liens d'articles
                    },
                    boxShadow: 'none !important', // Suppression de l'ombre
                    color: '#dc4e41', // Couleur exacte du theme original pour email
                    display: 'block',
                    padding: '5px'
                  }}
                  title="email"
                >
                  <FaEnvelope size={22} />
                </IconButton>
              </Link>
            </Box>

            {/* InfoMenu - Menu de navigation */}
            <InfoMenu pages={pages} onLinkClick={menuLinkOnClick} />

            {/* Bouton "Expand the list" en bas - reproduit ListHeader behavior */}
            {/* N'affiche pas sur la page d'accueil */}
            {!isHomePage && (
              <Box
                sx={{
                  alignItems: 'center',
                  borderTop: '1px solid #eeeeee',
                  bottom: '120px', // Au-dessus du StackIcons
                  display: 'flex',
                  justifyContent: 'space-between',
                  left: '40px',
                  padding: '1em 0',
                  position: 'absolute',
                  right: '40px'
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: '#666666',
                    fontSize: '0.75em',
                    fontWeight: 600,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase'
                  }}
                >
                  List of posts
                </Typography>
                
                <IconButton
                  onClick={expandListOnClick}
                  title="Expand the list"
                  sx={{
                    '&:hover': { color: '#709425' },
                    color: '#666666'
                  }}
                >
                  <ExpandMore />
                </IconButton>
              </Box>
            )}
          </>
        ) : (
          // Liste des posts (remplace le contenu auteur)
          <>
            {/* Header avec bouton "Expand the box" pour revenir */}
            <Box
              sx={{
                alignItems: 'center',
                borderBottom: '1px solid #eeeeee',
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
                pb: 1
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: '#666666',
                  fontSize: '0.75em',
                  fontWeight: 600,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase'
                }}
              >
                Latest Posts
              </Typography>
              
              <IconButton
                onClick={expandBoxOnClick}
                title="Expand the box"
                sx={{
                  '&:hover': { color: '#709425' },
                  color: '#666666'
                }}
              >
                <ExpandMore />
              </IconButton>
            </Box>

            {/* Liste des posts dans la sidebar */}
            <PostsList posts={posts} />
          </>
        )}

        {/* StackIcons - Tech Stack en bas avec styles exacts du theme original */}
        {!showPostsList && (
          <Box
            sx={{
              '@media (min-width: 1024px)': { // theme.mediaQueryTresholds.L
                bottom: 0,
                display: 'block',
                left: 0,
                padding: '1em 2em',
                position: 'absolute',
                width: '100%'
              },
              
              // Reproduction exacte des styles stack du theme original
              display: 'none'
            }}
          >
            <Typography
              component="h5"
              sx={{
                fontSize: '0.85em',
                fontWeight: 300,
                letterSpacing: '0.3em',
                margin: '0 0 0.8em 0',
                // Reproduction exacte des styles header du theme original
                textAlign: 'center',
                textTransform: 'uppercase',
                width: '100%'
              }}
            >
              BUILT WITH:
            </Typography>
            <Box
              sx={{
                // Reproduction exacte des styles box du theme original
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              {techStack.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      // Reproduction exacte des styles link du theme original
                      display: 'inline-block',
                      padding: '8px'
                    }}
                  >
                    <Icon 
                      size={22} 
                      color={item.color}
                      title={item.name}
                      style={{
                        height: '22px',
                        transition: 'all 0.5s',
                        // Reproduction exacte des styles svg du theme original
                        width: '22px'
                      }}
                    />
                  </Link>
                )
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
