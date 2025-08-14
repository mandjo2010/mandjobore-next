import * as React from 'react'
import { Box, Typography, IconButton, Card, CardMedia, CardContent } from '@mui/material'
import { ExpandLess as ExpandLessIcon } from '@mui/icons-material'
import { useNavigatorState, useNavigatorActions, useFilters } from '@/store/ui'
import Link from 'next/link'

/**
 * Navigator - Liste d'articles reproduisant le comportement Gatsby
 * Gère les positions: is-featured, is-aside, moving-aside
 */
export default function Navigator() {
  const { position, isOpen, isFeatured } = useNavigatorState()
  const { moveNavigatorAside } = useNavigatorActions()
  const { categoryFilter, hasActiveFilters } = useFilters()

  // Mock data - à remplacer par les vrais articles
  const articles = [
    {
      slug: '2024-01-05--programmation-fonctionnelle',
      title: 'Programmation Fonctionnelle',
      subtitle: 'Concepts et applications pratiques',
      image: '/images/functional-programming.jpg',
      category: 'Programming',
      date: '2024-01-05',
    },
    {
      slug: '2024-01-10--design-thinking',
      title: 'Design Thinking',
      subtitle: 'Méthodologie créative pour résoudre les problèmes',
      image: '/images/design-thinking.jpg',
      category: 'Design',
      date: '2024-01-10',
    },
    {
      slug: '2024-01-15--intelligence-artificielle',
      title: 'Intelligence Artificielle',
      subtitle: 'Tendances et applications futures',
      image: '/images/ai-future.jpg',
      category: 'AI',
      date: '2024-01-15',
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
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#ffffff',
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
          p: 2,
          borderBottom: '1px solid #dedede',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: '#f8f9fa',
        }}
      >
        <Typography
          variant="overline"
          sx={{
            fontWeight: 600,
            color: '#333',
            fontSize: '0.8rem',
            letterSpacing: '1px',
          }}
        >
          {hasActiveFilters ? `${categoryFilter.toUpperCase()}` : 'LIST OF POSTS'}
          <Typography
            component="span"
            sx={{
              ml: 1,
              color: '#888',
              fontSize: '0.7rem',
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
              color: '#666',
              '&:hover': {
                color: '#709425',
                bgcolor: 'rgba(112, 148, 37, 0.1)',
              },
            }}
          >
            <ExpandLessIcon />
          </IconButton>
        )}
      </Box>

      {/* Liste des articles */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          // Masquer les scrollbars mais garder la fonctionnalité
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
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
          p: 1.5,
          borderTop: '1px solid #dedede',
          textAlign: 'center',
          bgcolor: '#f8f9fa',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#888',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
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
        sx={{
          display: 'flex',
          m: 1,
          boxShadow: 'none',
          border: '1px solid transparent',
          borderRadius: 1,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          '&:hover': {
            border: '1px solid #709425',
            boxShadow: '0 2px 8px rgba(112, 148, 37, 0.1)',
            transform: 'translateY(-1px)',
          },
        }}
      >
        {/* Image miniature */}
        <CardMedia
          component="img"
          sx={{
            width: isCompact ? 60 : 90,
            height: isCompact ? 60 : 90,
            objectFit: 'cover',
            borderRadius: 1,
          }}
          image={article.image}
          alt={article.title}
        />

        {/* Contenu */}
        <CardContent
          sx={{
            flex: 1,
            p: 1.5,
            '&:last-child': { pb: 1.5 },
          }}
        >
          <Typography
            className="post-list-title"
            sx={{
              fontSize: isCompact ? '1.1em' : '1.3em',
              lineHeight: isCompact ? '1.2' : '1.3',
              mb: 0.5,
              fontWeight: 600,
            }}
          >
            {article.title}
          </Typography>

          <Typography
            className="post-list-subtitle"
            sx={{
              fontSize: isCompact ? '0.9em' : '1.0em',
              lineHeight: 1.2,
              color: '#666',
              mb: 0.5,
            }}
          >
            {article.subtitle}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: '#888',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {article.category} • {new Date(article.date).toLocaleDateString('fr-FR')}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
