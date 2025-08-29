/**
 * ActionsBar - Reproduction fidèle de la barre d'actions de Gatsby
 * Correspondance exacte avec src/components/ActionsBar/ActionsBar.js
 */
'use client'

import { 
  Home,
  FilterList,
  Search,
  FormatSize,
  Fullscreen,
  FullscreenExit,
  KeyboardArrowUp
} from '@mui/icons-material'
import { Box, IconButton, styled } from '@mui/material'
import React, { useState } from 'react'

import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

interface ActionsBarProps {
  categories?: string[]
  className?: string
  isArticleView?: boolean // Nouveau prop pour distinguer article vs page d'accueil
}

// Container principal de l'ActionsBar
const ActionsBarContainer = styled(Box)({
  // Caché sur mobile
  '@media (max-width: 1023px)': {
    display: 'none'
  },
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderLeft: '1px solid #eeeeee',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  height: '100vh',
  justifyContent: 'center',
  position: 'fixed',
  right: 0,
  top: 0,
  width: '64px',
  
  zIndex: 10
})

// Bouton d'action avec style Gatsby
const ActionButton = styled(IconButton)({
  '&.active': {
    backgroundColor: '#709425',
    borderColor: '#709425',
    color: '#ffffff'
  },
  '&:hover': {
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    color: '#709425', // Vert accent Gatsby
    transform: 'scale(1.1)'
  },
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  border: '1px solid #e0e0e0',
  borderRadius: '50%',
  color: '#666666',
  height: '44px',
  
  transition: 'all 0.3s ease',
  
  width: '44px'
})

// Modal simple pour les filtres
const FilterModal = styled(Box)({
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  minWidth: '200px',
  padding: '20px',
  position: 'absolute',
  right: '80px',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1000
})

const FilterOption = styled(Box)({
  '&.active': {
    backgroundColor: '#709425',
    color: '#ffffff'
  },
  '&:hover': {
    backgroundColor: '#f5f5f5',
    color: '#333333'
  },
  borderRadius: '4px',
  color: '#666666',
  cursor: 'pointer',
  fontSize: '14px',
  
  padding: '8px 12px',
  
  transition: 'all 0.2s ease'
})

// Modal pour la taille de police
const FontModal = styled(Box)({
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  minWidth: '180px',
  padding: '20px',
  position: 'absolute',
  right: '80px',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1000
})

const FontOption = styled(Box)({
  '&.active': {
    backgroundColor: '#709425',
    color: '#ffffff'
  },
  '&:hover': {
    backgroundColor: '#f5f5f5',
    color: '#333333'
  },
  borderRadius: '4px',
  color: '#666666',
  cursor: 'pointer',
  fontSize: '14px',
  padding: '8px 12px',
  
  textAlign: 'center',
  
  transition: 'all 0.2s ease'
})

export default function ActionsBar({ 
  categories = [], 
  className, 
  isArticleView = false 
}: ActionsBarProps) {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showFontModal, setShowFontModal] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const { 
    categoryFilter,
    fontSizeIncrease,
    navigatorPosition,
    resetToHome,
    setCategoryFilter,
    setFontSizeIncrease,
    setScrollToTop
  } = useGatsbyUIStore()
  
  // Détermine le contexte d'affichage
  const isInArticleContext = isArticleView || navigatorPosition === 'is-featured'
  
  // Action: Home (resetToHome pour un reset complet)
  const handleHome = () => {
    resetToHome()
  }
  
  // Action: Filter
  const handleFilter = () => {
    setShowFilterModal(!showFilterModal)
    setShowFontModal(false)
  }
  
  // Action: Search (placeholder pour la recherche Algolia)
  const handleSearch = () => {
    console.log('Search - TODO: Implémenter recherche Algolia')
  }
  
  // Action: Font Size
  const handleFontSize = () => {
    setShowFontModal(!showFontModal)
    setShowFilterModal(false)
  }
  
  // Action: Fullscreen
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }
  
  // Action: Scroll to Top
  const handleScrollTop = () => {
    setScrollToTop(true)
  }
  
  // Sélection de catégorie
  const handleCategorySelect = (category: string) => {
    setCategoryFilter(category)
    setShowFilterModal(false)
  }
  
  // Sélection de taille de police
  const handleFontSizeSelect = (size: number) => {
    setFontSizeIncrease(size)
    setShowFontModal(false)
  }
  
  // Fermer les modals si on clique ailleurs
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowFilterModal(false)
      setShowFontModal(false)
    }
    
    if (showFilterModal || showFontModal) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showFilterModal, showFontModal])
  
  const fontSizes = [
    { label: 'Small', value: 0.85 },
    { label: 'Normal', value: 1.0 },
    { label: 'Large', value: 1.15 },
    { label: 'Extra Large', value: 1.3 }
  ]
  
  return (
    <ActionsBarContainer className={className}>
      {/* Home - toujours visible */}
      <ActionButton onClick={handleHome} aria-label="Home">
        <Home />
      </ActionButton>
      
      {/* Filter - visible uniquement sur la page d'accueil */}
      {!isInArticleContext && (
        <ActionButton 
          onClick={handleFilter}
          className={showFilterModal ? 'active' : ''}
          aria-label="Filter by category"
        >
          <FilterList />
        </ActionButton>
      )}
      
      {/* Search - toujours visible */}
      <ActionButton onClick={handleSearch} aria-label="Search">
        <Search />
      </ActionButton>
      
      {/* Font Size - visible uniquement en mode article */}
      {isInArticleContext && (
        <ActionButton 
          onClick={handleFontSize}
          className={showFontModal ? 'active' : ''}
          aria-label="Change font size"
        >
          <FormatSize />
        </ActionButton>
      )}
      
      {/* Fullscreen - toujours visible */}
      <ActionButton onClick={handleFullscreen} aria-label="Toggle fullscreen">
        {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
      </ActionButton>
      
      {/* Scroll to Top - toujours visible */}
      <ActionButton onClick={handleScrollTop} aria-label="Scroll to top">
        <KeyboardArrowUp />
      </ActionButton>
      
      {/* Modal de filtres - visible uniquement sur la page d'accueil */}
      {!isInArticleContext && showFilterModal && (
        <FilterModal onClick={(e) => e.stopPropagation()}>
          <FilterOption
            className={categoryFilter === 'all posts' ? 'active' : ''}
            onClick={() => handleCategorySelect('all posts')}
          >
            All Posts
          </FilterOption>
          
          {categories.map((category) => (
            <FilterOption
              key={category}
              className={categoryFilter === category ? 'active' : ''}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </FilterOption>
          ))}
        </FilterModal>
      )}
      
      {/* Modal de taille de police - visible uniquement en mode article */}
      {isInArticleContext && showFontModal && (
        <FontModal onClick={(e) => e.stopPropagation()}>
          {fontSizes.map((size) => (
            <FontOption
              key={size.value}
              className={fontSizeIncrease === size.value ? 'active' : ''}
              onClick={() => handleFontSizeSelect(size.value)}
            >
              {size.label}
            </FontOption>
          ))}
        </FontModal>
      )}
    </ActionsBarContainer>
  )
}
