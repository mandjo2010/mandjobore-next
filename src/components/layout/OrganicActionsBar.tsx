import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home as HomeIcon, 
  Search as SearchIcon, 
  FilterList as FilterListIcon,
  ArrowUpward as ArrowUpwardIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon
} from '@mui/icons-material';

import { useUIStore } from '@/store/ui';
import organicStyles from '@/styles/OrganicShapes.module.css';
import animations from '@/styles/AdvancedAnimations.module.css';
import CategoryFilterDropdown from '../ActionsBar/CategoryFilterDropdown';

interface OrganicActionsBarProps {
  isVisible?: boolean;
  categories?: string[];
}

export default function OrganicActionsBar({ isVisible = true, categories = [] }: OrganicActionsBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const { 
    categoryFilter, 
    isSearchOpen,
    toggleSearch,
    setCategoryFilter
  } = useUIStore();
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [filterButtonRef, setFilterButtonRef] = useState<HTMLElement | null>(null);

  // Gestion du plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Actions handlers
  const handleHome = () => {
    setCategoryFilter('all posts');
    router.push('/');
  };

  const handleSearch = () => {
    toggleSearch();
  };

  const handleCategoryFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterButtonRef(event.currentTarget);
    setShowCategoryFilter(true);
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

  if (!isVisible) return null;

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: 20,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        pointerEvents: 'none'
      }}>
        
        {/* Côté gauche : 3 icônes d'action (Home, filtre catégorie, recherche) */}
        <div className={`${organicStyles.organicContainer} ${organicStyles.organicActions} ${animations.interactiveElement} ${animations.navigationTransition}`}
             style={{ pointerEvents: 'auto' }}>
          <div className={organicStyles.organicContent}>
            <div className={organicStyles.actionsList}>
              <button
                className={`${organicStyles.organicActionButton} ${animations.feedbackElement} ${animations.tangibleNavigation}`}
                onClick={handleHome}
                title="Accueil"
                style={{ 
                  background: isOnHomePage ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)' 
                }}
              >
                <HomeIcon sx={{ fontSize: 18, color: 'white' }} />
              </button>
              
              <button
                className={`${organicStyles.organicActionButton} ${animations.feedbackElement} ${animations.tangibleNavigation}`}
                onClick={handleCategoryFilter}
                title="Filtrer par catégorie"
                style={{ 
                  background: hasActiveFilter ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)' 
                }}
              >
                <FilterListIcon sx={{ fontSize: 18, color: 'white' }} />
              </button>
              
              <button
                className={`${organicStyles.organicActionButton} ${animations.feedbackElement} ${animations.tangibleNavigation}`}
                onClick={handleSearch}
                title="Recherche"
                style={{ 
                  background: isSearchOpen ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)' 
                }}
              >
                <SearchIcon sx={{ fontSize: 18, color: 'white' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Côté droit : 2 icônes d'action (plein écran/expand, retour en haut) */}
        <div className={`${organicStyles.organicContainer} ${organicStyles.organicTools} ${animations.interactiveElement} ${animations.navigationTransition}`}
             style={{ pointerEvents: 'auto' }}>
          <div className={organicStyles.organicContent}>
            <div className={organicStyles.actionsList}>
              <button
                className={`${organicStyles.organicActionButton} ${animations.feedbackElement} ${animations.tangibleNavigation}`}
                onClick={handleFullscreen}
                title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
              >
                {isFullscreen ? 
                  <FullscreenExitIcon sx={{ fontSize: 18, color: 'white' }} /> : 
                  <FullscreenIcon sx={{ fontSize: 18, color: 'white' }} />
                }
              </button>
              
              <button
                className={`${organicStyles.organicActionButton} ${animations.feedbackElement} ${animations.tangibleNavigation}`}
                onClick={handleScrollToTop}
                title="Retour en haut"
              >
                <ArrowUpwardIcon sx={{ fontSize: 18, color: 'white' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <CategoryFilterDropdown 
        isOpen={showCategoryFilter}
        onClose={() => setShowCategoryFilter(false)}
        anchorEl={filterButtonRef}
        categories={categories}
      />
    </>
  );
}
