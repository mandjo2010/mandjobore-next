/**
 * Navigator - Reproduit fidèlement le Navigator de Gatsby avec animations
 * Migration avec AnimationNavigator et logique de clic article
 */

'use client';

import { ExpandMore } from '@mui/icons-material';
import { Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import NavigatorAnimations from '@/components/animations/NavigatorAnimations';
import NavigatorSlideUpAnimation from '@/components/animations/NavigatorSlideUpAnimation';
import CompactArticleList from '@/components/Navigator/CompactArticleList';
import { useNavigatorState, useGatsbyUIStore } from '@/store/gatsby-ui-store';

interface NavigatorProps {
  posts?: any[];
  navigatorPosition?: 'is-aside' | 'is-featured' | '';
  navigatorShape?: 'open' | 'closed' | '';
}

// Container principal SUPPRIMÉ - remplacé par NavigatorAnimations

// Content area avec scroll
const ScrollableContent = styled(Box)(({ theme: _theme }) => ({
  bottom: 0,
  left: 0,
  overflowY: 'auto',
  padding: '1rem',
  position: 'absolute',
  top: 0,
  width: '100%',
}));

// Header compact quand article ouvert - Avatar + "Expand the box" (flèche vers le bas)
const CompactArticleHeader = styled(Box)(({ theme }) => ({
  '& .avatar': {
    backgroundColor: '#f0f0f0',
    borderRadius: '50%',
    height: '40px',
    marginRight: '10px',
    width: '40px'
  },
  '& .expand-box-button': {
    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem'
    }
  },
  alignItems: 'center',
  background: theme.navigator?.colors?.background || '#ffffff',
  borderBottom: '1px solid #f0f0f0',
  display: 'flex',
  flexDirection: 'row',
  height: `${theme.navigator?.sizes?.closedHeight || 80}px`,
  justifyContent: 'space-between',
  left: 0,
  padding: '0 30px 0 40px',
  position: 'absolute',
  
  top: 0,
  
  width: '100%'
}));

// Footer supprimé - InfoBox gère "Latest Posts" pour éviter duplication

const Navigator: React.FC<NavigatorProps> = ({
  navigatorPosition = '',
  navigatorShape = '',
  posts = [],
}) => {
  const { navigatorPosition: storePosition, navigatorShape: storeShape } = useNavigatorState();
  const { setShowInfoContent, setShowPostsList, showInfoContent, showPostsList } = useGatsbyUIStore();
  
  // Utiliser les états du store si disponibles
  const currentPosition = storePosition || navigatorPosition;
  const currentShape = storeShape || navigatorShape;
  
  // Gérer les 3 états de la première colonne
  const isArticleMode = currentPosition === 'is-aside'; // Article ouvert
  const isInfoBoxExpanded = showInfoContent; // InfoBox complète visible  
  const isPostsListMode = showPostsList; // Liste d'articles visible
  
  // ÉTATS CORRECTS :
  // État 1: Page d'accueil -> !isArticleMode = InfoBox complète
  // État 2: Article ouvert -> isArticleMode + !isInfoBoxExpanded + isPostsListMode = Avatar + liste auto
  // État 3: "Expand box" -> isArticleMode + isInfoBoxExpanded + !isPostsListMode = InfoBox + "List of posts"
  
  const handleExpandBoxClick = () => {
    // Clic sur "Expand the box" - Retour à InfoBox complète + "List of posts" en bas
    setShowInfoContent(true);
    setShowPostsList(false);
  };
  
  // handleExpandListClick supprimé - plus nécessaire car InfoBox gère "Expand the list"
  
  // Classes CSS selon l'état
  const containerClasses = [
    currentPosition,
    currentShape,
  ].filter(Boolean).join(' ');
  
  // Posts mock pour le développement
  const mockPosts = posts.length > 0 ? posts : [
    {
      category: 'GIS Analysis',
      date: 'Fri, 03 Jan 2020',
      excerpt: 'How satellite imagery and the science of remote sensing detect wildfires...',
      id: '1',
      title: 'Remote Sensing of Mt. Kenya Wildfire',
    },
    {
      category: 'Research', 
      date: 'Thu, 02 Jan 2020',
      excerpt: 'The role of agroforestry in providing a wide range of benefits...',
      id: '2',
      title: 'A System for Economic, Sociocultural, and Environmental Benefits',
    },
    {
      category: 'Data Science',
      date: 'Wed, 01 Jan 2020',
      excerpt: 'Best practices and resources for finding quality geographic datasets...',
      id: '3',
      title: 'Finding Geographic Data',
    },
  ];
  
  return (
    <NavigatorAnimations className={containerClasses}>
      {/* ÉTAT 2: Mode Article Ouvert - Avatar + "Expand the box" (flèche vers le bas) + Liste auto */}
      {isArticleMode && !isInfoBoxExpanded && isPostsListMode && (
        <>
          <CompactArticleHeader>
            <Box sx={{ alignItems: 'center', display: 'flex' }}>
              <Box className="avatar" />
              <Typography variant="body2" color="textSecondary">
                Greg Lobinski
              </Typography>
            </Box>
            <IconButton
              className="expand-box-button"
              aria-label="Expand the box"
              onClick={handleExpandBoxClick}
              title="Expand the box"
            >
              <ExpandMore />
            </IconButton>
          </CompactArticleHeader>
          
          {/* Liste des articles affichée automatiquement en format COMPACT */}
          <ScrollableContent sx={{ top: '80px' }}> {/* Décalage pour le header compact */}
            <NavigatorSlideUpAnimation>
              <CompactArticleList 
                posts={mockPosts.map(post => ({
                  category: post.category,
                  id: post.id,
                  slug: post.id,
                  title: post.title
                }))}
              />
            </NavigatorSlideUpAnimation>
          </ScrollableContent>
        </>
      )}
      
      {/* ÉTAT 3: InfoBox étendue - Géré entièrement par InfoBox, pas de contenu Navigator */}
      {/* L'InfoBox s'occupe d'afficher "Latest Posts" + articles quand isInfoBoxExpanded = true */}
    </NavigatorAnimations>
  );
};

export default Navigator; 