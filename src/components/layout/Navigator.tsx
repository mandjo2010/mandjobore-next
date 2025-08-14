import { ExpandLess as ExpandLessIcon } from '@mui/icons-material'
import { Box, Typography, IconButton, Card, CardMedia, CardContent } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'

import { useSeparatorStyles } from '@/components/ui/SeparatorLine'
import { useNavigatorState, useNavigatorActions, useFilters } from '@/store/ui'

/**
 * Navigator - Liste d'articles reproduisant le comportement Gatsby
 * Gère les positions: is-featured, is-aside, moving-aside
 */
export default function Navigator() {
  const { isFeatured, isOpen, position } = useNavigatorState()
  const { moveNavigatorAside } = useNavigatorActions()
  const { categoryFilter, hasActiveFilters } = useFilters()
  const separatorStyles = useSeparatorStyles()

  // Mock data - à remplacer par les vrais articles
  const articles = [
    {
      category: 'Programming',
      date: '2024-01-05',
      image: '/images/functional-programming.jpg',
      slug: '2024-01-05--programmation-fonctionnelle',
      subtitle: 'Concepts et applications pratiques',
      title: 'Programmation Fonctionnelle',
    },
    {
      category: 'Design',
      date: '2024-01-10',
      image: '/images/design-thinking.jpg',
      slug: '2024-01-10--design-thinking',
      subtitle: 'Méthodologie créative pour résoudre les problèmes',
      title: 'Design Thinking',
    },
    {
      category: 'AI',
      date: '2024-01-15',
      image: '/images/ai-future.jpg',
      slug: '2024-01-15--intelligence-artificielle',
      subtitle: 'Tendances et applications futures',
      title: 'Intelligence Artificielle',
    },
    // Ajouter plus d'articles...
  ]

  // Filtrer les articles selon le filtre actif
  const filteredArticles = React.useMemo(() => {
    if (categoryFilter === 'all posts') return articles
    return articles.filter(article => 
      article.category.toLowerCase() === categoryFilter.toLowerCase()
    )
  }, [articles, categoryFilter])

  return (
    <Box
      sx={{
        bgcolor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'relative',
        // Ajouter le séparateur vertical droit quand is-aside avec marges 20px
        ...(position === 'is-aside' && separatorStyles.verticalRightSeparator),
        // Classes CSS dynamiques comme dans Gatsby
        [`&.${position}`]: {
          // Styles spécifiques selon la position
        },
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      className={`navigator ${position} ${isOpen ? 'open' : 'closed'}`}
    >
      {/* Header de la liste */}
      <Box
        sx={{
          alignItems: 'center',
          bgcolor: '#f8f9fa',
          borderBottom: '1px solid var(--color-lines)',
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          position: 'relative',
          // Barre de séparation horizontale bas
          ...separatorStyles.horizontalBottomSeparator,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: '#333',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '1px',
          }}
        >
          {hasActiveFilters ? `${categoryFilter.toUpperCase()}` : 'LIST OF POSTS'}
          <Typography
            component="span"
            sx={{
              color: '#888',
              fontSize: '0.7rem',
              ml: 1,
            }}
          >
            ({filteredArticles.length})
          </Typography>
        </Typography>

        {/* Bouton pour réduire le navigator (seulement si featured) */}
        {isFeatured && (
          <IconButton
            onClick={moveNavigatorAside}
            size="small"
            sx={{
              '&:hover': {
                bgcolor: 'rgba(112, 148, 37, 0.1)',
                color: '#709425',
              },
              color: '#666',
            }}
          >
            <ExpandLessIcon />
          </IconButton>
        )}
      </Box>

      {/* Liste des articles */}
      <Box
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          flex: 1,
          // Masquer les scrollbars mais garder la fonctionnalité
          msOverflowStyle: 'none',
          overflow: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {filteredArticles.map((article) => (
          <ArticleListItem
            key={article.slug}
            article={article}
            isCompact={!isFeatured}
          />
        ))}
      </Box>

      {/* Footer avec compteur */}
      <Box
        sx={{
          bgcolor: '#f8f9fa',
          borderTop: '1px solid var(--color-lines)',
          p: 1.5,
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#888',
            fontSize: '0.7rem',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
        </Typography>
      </Box>
    </Box>
  )
}

// Composant d'item d'article
interface ArticleListItemProps {
  article: {
    slug: string
    title: string
    subtitle: string
    image: string
    category: string
    date: string
  }
  isCompact: boolean
}

function ArticleListItem({ article, isCompact }: ArticleListItemProps) {
  return (
    <Link href={`/posts/${article.slug}`} style={{ textDecoration: 'none' }}>
      <Card
        component="article"
        sx={{
          '&:hover': {
            '& .MuiTypography-h3': {
              color: '#709425 !important',
              textShadow: '0 1px 2px rgba(112, 148, 37, 0.1) !important',
            },
            '& .MuiTypography-root': {
              '&.post-list-title': {
                color: '#709425 !important',
                textShadow: '0 1px 2px rgba(112, 148, 37, 0.1) !important',
              },
            },
            // Effet sur l'image
            '& .post-image': {
              filter: 'brightness(1.1)',
              transform: 'scale(1.05)',
            },
            // Effet sur le sous-titre
            '& .post-list-subtitle': {
              color: '#555 !important',
            },
            // FORCER la couleur du titre au survol avec toutes les variantes possibles
            '& .post-list-title': {
              color: '#709425 !important',
              textShadow: '0 1px 2px rgba(112, 148, 37, 0.1) !important',
            },
            backgroundColor: '#fafbfa',
            border: '1px solid #709425',
            boxShadow: '0 4px 12px rgba(112, 148, 37, 0.15)',
            transform: 'translateY(-2px)',
          },
          backgroundColor: '#ffffff',
          border: '1px solid transparent',
          borderRadius: 1,
          boxShadow: 'none',
          cursor: 'pointer',
          display: 'flex',
          m: 1,
          mb: 1,
          ml: 2.5, // Augmentation pour atteindre ~20px + 8px par défaut = ~28px d'espacement avec la barre
          mr: 1,
          mt: 1,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Image miniature */}
        <CardMedia
          component="img"
          className="post-image"
          sx={{
            borderRadius: 1,
            flexShrink: 0, // Empêche l'image de se rétrécir
            height: isCompact ? 50 : 75,
            mr: 1.5, // Ajout d'un décalage entre l'image et le texte
            objectFit: 'cover',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            width: isCompact ? 50 : 75, // Réduction de la taille (était 60:90, maintenant 50:75)
          }}
          image={article.image}
          alt={article.title}
        />

        {/* Contenu */}
        <CardContent
          sx={{
            '&:last-child': { pb: 1.5 },
            flex: 1,
            p: 1.5,
            pl: 0, // Suppression du padding gauche car l'espacement est géré par mr sur l'image
          }}
        >
          <Typography
            className="post-list-title"
            variant="h3"
            component="h3"
            sx={{
              // Style plus spécifique pour forcer le hover
              '&:hover': {
                color: '#709425 !important',
                textShadow: '0 1px 2px rgba(112, 148, 37, 0.1) !important',
              },
              // Style pour le parent hover
              '.MuiCard-root:hover &': {
                color: '#709425 !important',
                textShadow: '0 1px 2px rgba(112, 148, 37, 0.1) !important',
              },
              color: '#333 !important',
              fontSize: isCompact ? '1.1em' : '1.3em',
              fontWeight: 600,
              lineHeight: isCompact ? '1.2' : '1.3',
              mb: 0.5,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important',
            }}
          >
            {article.title}
          </Typography>

          <Typography
            className="post-list-subtitle"
            variant="body2"
            component="p"
            sx={{
              color: '#666',
              fontSize: isCompact ? '0.9em' : '1.0em',
              lineHeight: 1.2,
              mb: 0.5,
              transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {article.subtitle}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: '#888',
              fontSize: '0.75rem',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            {article.category} • {new Date(article.date).toLocaleDateString('fr-FR')}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
