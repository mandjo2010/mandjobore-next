'use client';

import { 
  Home as HomeIcon, 
  Search as SearchIcon, 
  FilterList as FilterListIcon,
  FormatSize as FormatSizeIcon,
  ArrowUpward as ArrowUpwardIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { useUIStore, usePreferences } from '@/store/ui';

import styles from './ActionsBar.module.css';
import CategoryFilterModal from './CategoryFilterModal';
import FontSizeModal from './FontSizeModal';

interface ActionButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  isActive?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, isActive = false, onClick, title }) => {
  return (
    <button
      className={`${styles.actionButton} ${isActive ? styles.actionButtonActive : ''}`}
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      {icon}
    </button>
  );
};

const ActionsBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { 
    categoryFilter, 
    isSearchOpen,
    toggleSearch
  } = useUIStore();
  
  const { fontSize } = usePreferences();
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showFontSize, setShowFontSize] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Gestion du plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Gestion du scroll pour afficher le bouton "retour en haut"
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Actions handlers
  const handleHome = () => {
    router.push('/');
  };

  const handleSearch = () => {
    toggleSearch();
  };

  const handleCategoryFilter = () => {
    setShowCategoryFilter(true);
  };

  const handleFontSize = () => {
    setShowFontSize(true);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  };

  const handleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Erreur fullscreen:', error);
    }
  };

  // Indicateurs d'état actif
  const isOnHomePage = pathname === '/';
  const hasActiveFilter = categoryFilter !== 'all posts';
  const hasCustomFontSize = fontSize !== 1.0;

  return (
    <>
      <div className={styles.actionsContainer}>
        <ActionButton
          icon={<HomeIcon sx={{ color: '#000', fontSize: 24 }} />}
          title="Accueil"
          onClick={handleHome}
          isActive={isOnHomePage}
        />
        
        <ActionButton
          icon={<SearchIcon sx={{ color: '#000', fontSize: 24 }} />}
          title="Recherche"
          onClick={handleSearch}
          isActive={isSearchOpen}
        />
        
        <ActionButton
          icon={<FilterListIcon sx={{ color: '#000', fontSize: 24 }} />}
          title="Filtrer par catégorie"
          onClick={handleCategoryFilter}
          isActive={hasActiveFilter}
        />
        
        <ActionButton
          icon={<FormatSizeIcon sx={{ color: '#000', fontSize: 24 }} />}
          title="Taille de police"
          onClick={handleFontSize}
          isActive={hasCustomFontSize}
        />
        
        {showScrollTop && (
          <ActionButton
            icon={<ArrowUpwardIcon sx={{ color: '#000', fontSize: 24 }} />}
            title="Retour en haut"
            onClick={handleScrollToTop}
          />
        )}
        
        <ActionButton
          icon={isFullscreen ? 
            <FullscreenExitIcon sx={{ color: '#000', fontSize: 24 }} /> : 
            <FullscreenIcon sx={{ color: '#000', fontSize: 24 }} />
          }
          title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
          onClick={handleFullscreen}
          isActive={isFullscreen}
        />
      </div>

      {/* Modales */}
      <CategoryFilterModal 
        isOpen={showCategoryFilter}
        onClose={() => setShowCategoryFilter(false)}
      />
      
      <FontSizeModal
        isOpen={showFontSize}
        onClose={() => setShowFontSize(false)}
      />
    </>
  );
};

export default ActionsBar;
