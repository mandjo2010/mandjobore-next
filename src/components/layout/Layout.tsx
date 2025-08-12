import * as React from "react";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ActionsBar from "./ActionsBar";
import CategoryFilter from "../sidebar/CategoryFilter";
import { useRouter } from 'next/router';
import { useUIStore } from '@/store/ui';
import SearchOverlay from '@/components/ui/SearchOverlay';
import type { Post } from '@/types';
import type { Theme } from '@mui/material/styles';

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
  left, 
  children, 
  categories = [], 
  activeCategory, 
  onCategoryChange,
  searchPosts = [],
}: Props) {
  const t = useTheme() as Theme & import('@/types/theme').CustomTheme;
  const router = useRouter();
  const leftW = t?.info?.sizes?.width ?? 320;
  const toggleSearch = useUIStore((s: { toggleSearch: () => void }) => s.toggleSearch);
  
  // States pour les interactions
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  // Media queries
  const isLargeScreen = useMediaQuery(t.breakpoints.up('lg'));

  // Callbacks pour l'ActionsBar
  const handleHome = () => {
    router.push('/');
  };

  const handleToggleFilter = () => {
    setFilterOpen(prev => !prev);
  };

  const handleSearch = () => {
    // Ouvre/ferme la recherche via le store
    toggleSearch();
  };

  const handleToggleExpand = () => {
    setExpanded(prev => !prev);
  };

  const handleCategoryChange = (value: string) => {
    // '' signifie tous
    onCategoryChange?.(value || undefined);
    setFilterOpen(false);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        height: '100vh',
        bgcolor: t?.base?.colors?.background ?? 'background.default',
        overflow: 'hidden', // Empêche le scroll global
      }}
    >
      {/* Colonne gauche: ProfileSidebar - 320px, sticky */}
      <Box
        component="aside"
        sx={{
          width: leftW,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          bgcolor: t?.info?.colors?.background ?? 'background.paper',
          borderRight: `1px solid ${t?.base?.colors?.lines ?? '#eee'}`,
          p: 2,
          // Masquer sur petits écrans
          display: { xs: 'none', md: 'block' }
        }}
      >
        {left}
      </Box>

      {/* Colonne centrale: Contenu scrollable */}
      <Box
        component="main"
        sx={{
          flex: 1,
          height: '100vh',
          overflowY: 'auto',
          bgcolor: t?.main?.colors?.background ?? 'background.paper',
          position: 'relative',
          // Séparateur vertical à droite (seulement si ActionsBar visible)
          borderRight: isLargeScreen ? `1px solid ${t?.base?.colors?.lines ?? '#eee'}` : 'none',
          // Styles pour le contenu
          color: t?.main?.colors?.content ?? 'text.primary',
          px: 3,
          py: 2,
          // Scrollbar personnalisée
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: t?.base?.colors?.lines ?? '#eee',
            borderRadius: '3px',
            '&:hover': {
              background: t?.navigator?.colors?.postsListItemLink ?? '#999',
            },
          },
          // Styles pour le contenu Markdown
          '& a': { 
            color: t?.main?.colors?.link ?? '#09c', 
            fontWeight: 700, 
            textDecoration: 'none',
            '&:hover': { color: t?.main?.colors?.linkHover ?? '#036' } 
          },
          '& img': { 
            maxWidth: '100%', 
            height: 'auto' 
          },
          '& blockquote': {
            borderLeft: `4px solid ${t?.main?.colors?.blockquoteFrame ?? '#ddd'}`,
            pl: 2,
            ml: 0,
            color: t?.main?.colors?.content ?? 'text.primary',
          },
          '& h1': {
            fontSize: `${t?.main?.fonts?.title?.size ?? 1.9}rem`,
            lineHeight: t?.main?.fonts?.title?.lineHeight ?? 1.1,
            fontWeight: t?.main?.fonts?.title?.weight ?? 600,
            color: t?.main?.colors?.title ?? '#111',
            mb: 2,
            [t.breakpoints.up('md')]: {
              fontSize: `${t?.main?.fonts?.title?.sizeM ?? 2.5}rem`,
            },
            [t.breakpoints.up('lg')]: {
              fontSize: `${t?.main?.fonts?.title?.sizeL ?? 2.7}rem`,
            },
          },
          '& h2': {
            fontSize: `${t?.main?.fonts?.contentHeading?.h2Size ?? 1.5}rem`,
            lineHeight: t?.main?.fonts?.contentHeading?.lineHeight ?? 1.3,
            fontWeight: t?.main?.fonts?.contentHeading?.weight ?? 600,
            color: t?.main?.colors?.contentHeading ?? '#333',
            mt: 3,
            mb: 1,
          },
          '& h3': {
            fontSize: `${t?.main?.fonts?.contentHeading?.h3Size ?? 1.3}rem`,
            lineHeight: t?.main?.fonts?.contentHeading?.lineHeight ?? 1.3,
            fontWeight: t?.main?.fonts?.contentHeading?.weight ?? 600,
            color: t?.main?.colors?.contentHeading ?? '#333',
            mt: 2,
            mb: 1,
          },
          '& p, & li': {
            fontSize: `${t?.main?.fonts?.content?.size ?? 1}rem`,
            lineHeight: t?.main?.fonts?.content?.lineHeight ?? 1.6,
            [t.breakpoints.up('md')]: {
              fontSize: `${t?.main?.fonts?.content?.sizeM ?? 1.15}rem`,
            },
            [t.breakpoints.up('lg')]: {
              fontSize: `${t?.main?.fonts?.content?.sizeL ?? 1.1}rem`,
            },
          },
          // Limitation de largeur pour les articles
          '& article, & .article-content': {
            maxWidth: t?.main?.sizes?.articleMaxWidth ?? '50em',
          },
        }}
      >
        {children}
      </Box>

      {/* Colonne droite: ActionsBar - 56px fixe, masquée sur petits écrans */}
      {isLargeScreen && (
        <ActionsBar
          onHome={handleHome}
          onToggleFilter={handleToggleFilter}
          onSearch={handleSearch}
          onToggleExpand={handleToggleExpand}
          expanded={expanded}
        />
      )}

      {/* Drawer pour le filtre de catégories */}
      <Drawer
        anchor="right"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        PaperProps={{ 
          sx: { 
            width: 280,
            bgcolor: t?.info?.colors?.background ?? 'background.paper',
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
