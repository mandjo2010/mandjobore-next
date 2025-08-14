import * as React from 'react'
import { 
  Box, 
  IconButton, 
  Tooltip, 
  Menu, 
  MenuItem, 
  Typography,
  Divider 
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  TextFields as TextFieldsIcon,
  Fullscreen as FullscreenIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material'
import { useNavigatorActions, useFilters, usePreferences, useUIStore } from '@/store/ui'

/**
 * ActionsBar - Barre d'actions droite reproduisant les fonctionnalités Gatsby
 * Largeur: 60px, boutons: Retour, Filtre, Recherche, Police, Plein écran, Scroll top
 */
export default function ActionsBar() {
  const { moveNavigatorFeatured } = useNavigatorActions()
  const { categoryFilter, setCategoryFilter } = useFilters()
  const { fontSize, setFontSize, fontSizeLabel } = usePreferences()
  const { toggleSearch } = useUIStore()

  // États locaux pour les menus
  const [filterAnchor, setFilterAnchor] = React.useState<null | HTMLElement>(null)
  const [fontAnchor, setFontAnchor] = React.useState<null | HTMLElement>(null)

  // Catégories disponibles (à synchroniser avec le contenu réel)
  const categories = [
    'all posts',
    'Programming',
    'Design',
    'AI',
    'Data Science',
    'GIS',
    'Web Development'
  ]

  // Tailles de police disponibles
  const fontSizes = [
    { value: 1.0, label: '100%' },
    { value: 1.25, label: '125%' },
    { value: 1.5, label: '150%' },
  ]

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    })
  }

  // Plein écran
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const actionButtons = [
    {
      id: 'back',
      icon: <ArrowBackIcon />,
      tooltip: 'Retour à la liste',
      onClick: moveNavigatorFeatured,
    },
    {
      id: 'filter',
      icon: <FilterListIcon />,
      tooltip: 'Filtrer par catégorie',
      onClick: (e: React.MouseEvent<HTMLElement>) => setFilterAnchor(e.currentTarget),
      badge: categoryFilter !== 'all posts' ? '●' : null,
    },
    {
      id: 'search',
      icon: <SearchIcon />,
      tooltip: 'Recherche globale',
      onClick: toggleSearch,
    },
    {
      id: 'font',
      icon: <TextFieldsIcon />,
      tooltip: `Taille police (${fontSizeLabel})`,
      onClick: (e: React.MouseEvent<HTMLElement>) => setFontAnchor(e.currentTarget),
      badge: fontSize !== 1.0 ? fontSizeLabel : null,
    },
    {
      id: 'fullscreen',
      icon: <FullscreenIcon />,
      tooltip: 'Mode plein écran',
      onClick: toggleFullscreen,
    },
    {
      id: 'scroll-top',
      icon: <KeyboardArrowUpIcon />,
      tooltip: 'Remonter en haut',
      onClick: scrollToTop,
    },
  ]

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        bgcolor: '#ffffff',
        gap: 1,
      }}
    >
      {actionButtons.map((button, index) => (
        <React.Fragment key={button.id}>
          <Tooltip title={button.tooltip} placement="left">
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={button.onClick}
                sx={{
                  width: 44,
                  height: 44,
                  color: '#666',
                  border: '1px solid transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#709425',
                    bgcolor: 'rgba(112, 148, 37, 0.1)',
                    border: '1px solid rgba(112, 148, 37, 0.2)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                {button.icon}
              </IconButton>
              
              {/* Badge pour indiquer un état actif */}
              {button.badge && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    width: 8,
                    height: 8,
                    bgcolor: '#709425',
                    borderRadius: '50%',
                    fontSize: '6px',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              )}
            </Box>
          </Tooltip>
          
          {/* Séparateur après le 3ème bouton */}
          {index === 2 && (
            <Divider 
              sx={{ 
                width: '60%', 
                my: 1,
                borderColor: '#e0e0e0'
              }} 
            />
          )}
        </React.Fragment>
      ))}

      {/* Menu filtres par catégorie */}
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={() => setFilterAnchor(null)}
        anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
        transformOrigin={{ vertical: 'center', horizontal: 'right' }}
      >
        {categories.map((category) => (
          <MenuItem
            key={category}
            selected={categoryFilter === category}
            onClick={() => {
              setCategoryFilter(category)
              setFilterAnchor(null)
            }}
            sx={{
              fontSize: '0.9rem',
              minWidth: 180,
              '&.Mui-selected': {
                bgcolor: 'rgba(112, 148, 37, 0.1)',
                color: '#709425',
              },
            }}
          >
            <Typography variant="body2">
              {category === 'all posts' ? 'Tous les articles' : category}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      {/* Menu taille de police */}
      <Menu
        anchorEl={fontAnchor}
        open={Boolean(fontAnchor)}
        onClose={() => setFontAnchor(null)}
        anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
        transformOrigin={{ vertical: 'center', horizontal: 'right' }}
      >
        {fontSizes.map((size) => (
          <MenuItem
            key={size.value}
            selected={fontSize === size.value}
            onClick={() => {
              setFontSize(size.value)
              setFontAnchor(null)
            }}
            sx={{
              fontSize: '0.9rem',
              minWidth: 120,
              '&.Mui-selected': {
                bgcolor: 'rgba(112, 148, 37, 0.1)',
                color: '#709425',
              },
            }}
          >
            <Typography variant="body2">
              {size.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
