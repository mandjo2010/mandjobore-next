import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { Theme } from '@mui/material/styles';
import * as React from "react";

import SearchOverlay from '@/components/ui/SearchOverlay';
import type { Post } from '@/types';

import CategoryFilter from "../sidebar/CategoryFilter";
import ActionsBar from "./ActionsBar";

type Props = {
  left: React.ReactNode;
  children: React.ReactNode;
  right?: React.ReactNode; // Optionnel, non utilisé dans cette version
  categories?: string[];
  activeCategory?: string;
  onCategoryChange?: (c?: string) => void;
  searchPosts?: Post[];
};

export default function Layout({ 
  activeCategory, 
  categories = [], 
  children, 
  left, 
  onCategoryChange,
  searchPosts = [],
}: Props) {
  const t = useTheme() as Theme & import('@/types/theme').CustomTheme;
  const leftW = t?.info?.sizes?.width ?? 320;
  
  // States pour les interactions
  const [filterOpen, setFilterOpen] = React.useState(false);

  // Media queries
  const isLargeScreen = useMediaQuery(t.breakpoints.up('lg'));

  const handleCategoryChange = (value: string) => {
    // '' signifie tous
    onCategoryChange?.(value || undefined);
    setFilterOpen(false);
  };

  return (
    <Box 
      sx={{ 
        bgcolor: t?.base?.colors?.background ?? 'background.default',
        display: 'flex',
        height: '100vh',
        overflow: 'hidden', // Empêche le scroll global
      }}
    >
      {/* Colonne gauche: ProfileSidebar - 320px, sticky */}
      <Box
        component="aside"
        sx={{
          bgcolor: t?.info?.colors?.background ?? 'background.paper',
          borderRight: `1px solid ${t?.base?.colors?.lines ?? '#eee'}`,
          // Masquer sur petits écrans
          display: { md: 'block', xs: 'none' },
          flexShrink: 0,
          height: '100vh',
          overflowY: 'auto',
          p: 2,
          position: 'sticky',
          top: 0,
          width: leftW
        }}
      >
        {left}
      </Box>

      {/* Colonne centrale: Contenu scrollable */}
      <Box
        component="main"
        sx={{
          // Scrollbar personnalisée
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            '&:hover': {
              background: t?.navigator?.colors?.postsListItemLink ?? '#999',
            },
            background: t?.base?.colors?.lines ?? '#eee',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          // Styles pour le contenu Markdown
          '& a': { 
            '&:hover': { color: t?.main?.colors?.linkHover ?? '#036' }, 
            color: t?.main?.colors?.link ?? '#09c', 
            fontWeight: 700,
            textDecoration: 'none' 
          },
          // Limitation de largeur pour les articles
          '& article, & .article-content': {
            maxWidth: t?.main?.sizes?.articleMaxWidth ?? '50em',
          },
          '& blockquote': {
            borderLeft: `4px solid ${t?.main?.colors?.blockquoteFrame ?? '#ddd'}`,
            color: t?.main?.colors?.content ?? 'text.primary',
            ml: 0,
            pl: 2,
          },
          '& h1': {
            color: t?.main?.colors?.title ?? '#111',
            fontSize: `${t?.main?.fonts?.title?.size ?? 1.9}rem`,
            fontWeight: t?.main?.fonts?.title?.weight ?? 600,
            lineHeight: t?.main?.fonts?.title?.lineHeight ?? 1.1,
            mb: 2,
            [t.breakpoints.up('lg')]: {
              fontSize: `${t?.main?.fonts?.title?.sizeL ?? 2.7}rem`,
            },
            [t.breakpoints.up('md')]: {
              fontSize: `${t?.main?.fonts?.title?.sizeM ?? 2.5}rem`,
            },
          },
          '& h2': {
            color: 'rgb(85, 85, 85) !important',
            fontFamily: '"Open Sans" !important',
            fontSize: '23px !important',
            fontWeight: '300 !important',
            lineHeight: '27px !important',
            mb: 1,
            mt: 3,
          },
          '& h3': {
            color: 'rgb(85, 85, 85) !important',
            fontFamily: '"Open Sans" !important',
            fontSize: '20px !important',
            fontWeight: '400 !important',
            lineHeight: '24px !important',
            mb: 1,
            mt: 2,
          },
          '& img': { 
            height: 'auto', 
            maxWidth: '100%' 
          },
          '& p, & li': {
            fontSize: `${t?.main?.fonts?.content?.size ?? 1}rem`,
            lineHeight: t?.main?.fonts?.content?.lineHeight ?? 1.6,
            [t.breakpoints.up('lg')]: {
              fontSize: `${t?.main?.fonts?.content?.sizeL ?? 1.1}rem`,
            },
            [t.breakpoints.up('md')]: {
              fontSize: `${t?.main?.fonts?.content?.sizeM ?? 1.15}rem`,
            },
          },
          bgcolor: t?.main?.colors?.background ?? 'background.paper',
          // Séparateur vertical à droite (seulement si ActionsBar visible)
          borderRight: isLargeScreen ? `1px solid ${t?.base?.colors?.lines ?? '#eee'}` : 'none',
          // Styles pour le contenu
          color: t?.main?.colors?.content ?? 'text.primary',
          flex: 1,
          height: '100vh',
          overflowY: 'auto',
          position: 'relative',
          px: 3,
          py: 2,
        }}
      >
        {children}
      </Box>

      {/* Colonne droite: ActionsBar - 56px fixe, masquée sur petits écrans */}
      {isLargeScreen && (
        <ActionsBar
          categories={['tech', 'design', 'gis']}
        />
      )}

      {/* Drawer pour le filtre de catégories */}
      <Drawer
        anchor="right"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        PaperProps={{ 
          sx: { 
            bgcolor: t?.info?.colors?.background ?? 'background.paper',
            width: 280,
          } 
        }}
      >
        <CategoryFilter
          categories={categories}
          selected={activeCategory}
          onChange={handleCategoryChange}
        />
      </Drawer>

      {/* Search overlay au niveau layout */}
      <SearchOverlay posts={searchPosts} />
    </Box>
  );
}
