/**
 * ActionsBar - Reproduction fidèle de la barre d'actions de Gatsby
 * Correspondance exacte avec src/components/ActionsBar/ActionsBar.js
 */
'use client'

import React, { useState } from 'react'
import { Box, IconButton, styled } from '@mui/material'
import { 
  Home,
  FilterList,
  Search,
  FormatSize,
  Fullscreen,
  FullscreenExit,
  KeyboardArrowUp
} from '@mui/icons-material'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

interface ActionsBarProps {
  categories: string[]
  className?: string
}

// Container principal de l'ActionsBar
const ActionsBarContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  right: 0,
  width: '64px',
  height: '100vh',
  backgroundColor: '#ffffff',
  borderLeft: '1px solid #eeeeee',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  zIndex: 10,
  
  // Caché sur mobile
  '@media (max-width: 1023px)': {
    display: 'none'
  }
})

// Bouton d'action avec style Gatsby
const ActionButton = styled(IconButton)({
  width: '44px',
  height: '44px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  border: '1px solid #e0e0e0',
  borderRadius: '50%',
  color: '#666666',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: '#ffffff',
    color: '#709425', // Vert accent Gatsby
    transform: 'scale(1.1)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  
  '&.active': {
    backgroundColor: '#709425',
    color: '#ffffff',
    borderColor: '#709425'
  }
})

// Modal simple pour les filtres
const FilterModal = styled(Box)({
  position: 'absolute',
  top: '50%',
  right: '80px',
  transform: 'translateY(-50%)',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '20px',
  minWidth: '200px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  zIndex: 1000
})

const FilterOption = styled(Box)({
  padding: '8px 12px',
  cursor: 'pointer',
  borderRadius: '4px',
  fontSize: '14px',
  color: '#666666',
  transition: 'all 0.2s ease',
  
  '&:hover': {
    backgroundColor: '#f5f5f5',
    color: '#333333'
  },
  
  '&.active': {
    backgroundColor: '#709425',
    color: '#ffffff'
  }
})

// Modal pour la taille de police
const FontModal = styled(Box)({
  position: 'absolute',
  top: '50%',
  right: '80px',
  transform: 'translateY(-50%)',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '20px',
  minWidth: '180px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  zIndex: 1000
})

const FontOption = styled(Box)({
  padding: '8px 12px',
  cursor: 'pointer',
  borderRadius: '4px',
  fontSize: '14px',
  color: '#666666',
  transition: 'all 0.2s ease',
  textAlign: 'center',
  
  '&:hover': {
    backgroundColor: '#f5f5f5',
    color: '#333333'
  },
  
  '&.active': {
    backgroundColor: '#709425',
    color: '#ffffff'
  }
})

export default function ActionsBar({ categories, className }: ActionsBarProps) {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showFontModal, setShowFontModal] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const { 
    featureNavigator,
    categoryFilter,
    setCategoryFilter,
    fontSizeIncrease,
    setFontSizeIncrease,
    setScrollToTop
  } = useGatsbyUIStore()
  
  // Action: Home (featureNavigator comme dans Gatsby)
  const handleHome = () => {
    featureNavigator()
    setScrollToTop(true)
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
      {/* Home */}
      <ActionButton onClick={handleHome} aria-label="Home">
        <Home />
      </ActionButton>
      
      {/* Filter */}
      <ActionButton 
        onClick={handleFilter}
        className={showFilterModal ? 'active' : ''}
        aria-label="Filter by category"
      >
        <FilterList />
      </ActionButton>
      
      {/* Search */}
      <ActionButton onClick={handleSearch} aria-label="Search">
        <Search />
      </ActionButton>
      
      {/* Font Size */}
      <ActionButton 
        onClick={handleFontSize}
        className={showFontModal ? 'active' : ''}
        aria-label="Change font size"
      >
        <FormatSize />
      </ActionButton>
      
      {/* Fullscreen */}
      <ActionButton onClick={handleFullscreen} aria-label="Toggle fullscreen">
        {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
      </ActionButton>
      
      {/* Scroll to Top */}
      <ActionButton onClick={handleScrollTop} aria-label="Scroll to top">
        <KeyboardArrowUp />
      </ActionButton>
      
      {/* Modal de filtres */}
      {showFilterModal && (
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
      
      {/* Modal de taille de police */}
      {showFontModal && (
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
