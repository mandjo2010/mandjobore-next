'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { 
  useMinimalNavigatorActions, 
  useMinimalNavigatorState, 
  useMinimalFilters, 
  useMinimalPreferences,
  useMinimalScrollActions,
} from '@/store/ui-minimal';
import { useStaticResponsive } from '../../hooks/useStaticResponsive';

/**
 * ActionsBar - Version TEST avec store minimal
 * - Version simplifiée pour éliminer les boucles
 */
export default function ActionsBar({ 
  categories = [],
}: { 
  categories?: string[];
}) {
  const router = useRouter();
  
  const { moveNavigatorFeatured } = useMinimalNavigatorActions();
  const { navigatorPosition, navigatorShape } = useMinimalNavigatorState();
  const { categoryFilter, setCategoryFilter } = useMinimalFilters();
  const { fontSize, isFullscreen, setFontSize, setIsFullscreen } = useMinimalPreferences();
  const { scrollToTop, setScrollToTop } = useMinimalScrollActions();
  const { isWideScreen } = useStaticResponsive();
  
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showFontSize, setShowFontSize] = useState(false);

  // Gestion du plein écran (comme dans Gatsby original)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [setIsFullscreen]);

  // Actions handlers (reproduisant la logique Gatsby exacte)
  const homeOnClick = () => {
    moveNavigatorFeatured();
  };

  const searchOnClick = () => {
    router.push('/search');
  };

  const categoryFilterOnClick = () => {
    setShowCategoryFilter(!showCategoryFilter);
  };

  const fontSizeOnClick = () => {
    setShowFontSize(!showFontSize);
  };

  const fullscreenOnClick = async () => {
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

  const scrollToTopOnClick = () => {
    setScrollToTop(true);
    window.scrollTo({ behavior: 'smooth', top: 0 });
    setTimeout(() => setScrollToTop(false), 100);
  };

  const handleCategorySelect = (category: string) => {
    setCategoryFilter(category);
    setShowCategoryFilter(false);
  };

  const handleFontSizeSelect = (size: number) => {
    setFontSize(size);
    setShowFontSize(false);
  };

  // Styles reproduisant exactement le thème Gatsby original
  const theme = {
    bars: {
      colors: {
        background: '#ffffff',
        icon: '#555555',
        text: '#555555',
      },
      sizes: {
        actionsBar: 60,
      }
    },
    base: {
      colors: {
        lines: '#dedede',
      },
      sizes: {
        linesMargin: '20px',
      }
    },
    mediaQueryTresholds: {
      M: 600,
      L: 1024,
    }
  };

  // Layout complexe comme dans Gatsby (mobile vs desktop)
  const getActionsBarStyles = (): React.CSSProperties => {
    const baseStyles = {
      position: 'absolute' as const,
      background: theme.bars.colors.background,
      display: 'flex',
      padding: `0 ${theme.base.sizes.linesMargin}`,
      height: `${theme.bars.sizes.actionsBar}px`,
    };

    if (isWideScreen) {
      // Desktop: vertical layout à droite
      return {
        ...baseStyles,
        flexDirection: 'column' as const,
        top: 0,
        right: 0,
        left: 'auto',
        height: '100%',
        padding: `${theme.base.sizes.linesMargin} 0`,
        width: `${theme.bars.sizes.actionsBar}px`,
        justifyContent: 'space-between',
        borderLeft: `1px solid ${theme.base.colors.lines}`,
      };
    } else {
      // Mobile: horizontal layout en bas
      return {
        ...baseStyles,
        flexDirection: 'row' as const,
        left: 0,
        bottom: 0,
        width: '100%',
        justifyContent: 'space-between',
        borderTop: `1px solid ${theme.base.colors.lines}`,
      };
    }
  };

  const getGroupStyles = (): React.CSSProperties => {
    return {
      display: 'flex',
      flexDirection: isWideScreen ? 'column' : 'row',
      alignItems: 'center',
      gap: isWideScreen ? '0' : '20px',
    };
  };

  // Condition d'affichage du CategoryFilter (logique Gatsby exacte)
  const shouldShowCategoryFilter = ((isWideScreen && navigatorShape === 'open') || navigatorPosition !== 'is-aside');

  return (
    <div style={getActionsBarStyles()} className="actions-bar">
      {/* GROUPE DU HAUT - Navigation principale */}
      <div style={getGroupStyles()}>
        {/* HOME BUTTON */}
        <button
          onClick={homeOnClick}
          title="Back to the list"
          style={{
            background: 'none',
            border: 'none',
            color: theme.bars.colors.icon,
            fontSize: '20px',
            cursor: 'pointer',
            padding: '12px',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            margin: isWideScreen ? '8px 0' : '0',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          🏠
        </button>

        {/* CATEGORY FILTER - Conditionnel comme dans Gatsby */}
        {shouldShowCategoryFilter && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={categoryFilterOnClick}
              title="Filter the list by category"
              style={{
                background: 'none',
                border: 'none',
                color: theme.bars.colors.icon,
                fontSize: '20px',
                cursor: 'pointer',
                padding: '12px',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                margin: isWideScreen ? '8px 0' : '0',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              📁
            </button>

            {/* CATEGORY DROPDOWN */}
            {showCategoryFilter && (
              <div style={{
                position: 'absolute',
                top: isWideScreen ? '0' : 'auto',
                bottom: isWideScreen ? 'auto' : '60px',
                right: isWideScreen ? '70px' : '0',
                left: isWideScreen ? 'auto' : '0',
                background: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                padding: '8px 0',
                minWidth: '200px',
                zIndex: 1100,
                border: '1px solid #e0e0e0',
              }}>
                <div style={{ 
                  padding: '8px 16px', 
                  borderBottom: '1px solid #f0f0f0',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#666',
                  textTransform: 'uppercase',
                }}>
                  Categories
                </div>
                
                {/* ALL POSTS */}
                <button
                  onClick={() => handleCategorySelect('all posts')}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 16px',
                    border: 'none',
                    background: categoryFilter === 'all posts' ? '#709425' : 'transparent',
                    color: categoryFilter === 'all posts' ? '#ffffff' : '#333',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (categoryFilter !== 'all posts') {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (categoryFilter !== 'all posts') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  all posts
                </button>

                {/* CATEGORIES LIST */}
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 16px',
                      border: 'none',
                      background: categoryFilter === category ? '#709425' : 'transparent',
                      color: categoryFilter === category ? '#ffffff' : '#333',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (categoryFilter !== category) {
                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (categoryFilter !== category) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {category}
                  </button>
                ))}

                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setShowCategoryFilter(false)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '8px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '16px',
                    color: '#999',
                    padding: '4px',
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* SEARCH BUTTON */}
        <button
          onClick={searchOnClick}
          title="Search"
          style={{
            background: 'none',
            border: 'none',
            color: theme.bars.colors.icon,
            fontSize: '20px',
            cursor: 'pointer',
            padding: '12px',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            margin: isWideScreen ? '8px 0' : '0',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          🔍
        </button>
      </div>

      {/* GROUPE DU BAS - Outils et préférences */}
      <div style={getGroupStyles()}>
        {/* FONT SIZE - Seulement si navigatorPosition === 'is-aside' comme dans Gatsby */}
        {navigatorPosition === 'is-aside' && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={fontSizeOnClick}
              title="Change font size"
              style={{
                background: 'none',
                border: 'none',
                color: fontSize !== 1.0 ? '#709425' : theme.bars.colors.icon,
                fontSize: '20px',
                cursor: 'pointer',
                padding: '12px',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                margin: isWideScreen ? '8px 0' : '0',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              📝
            </button>

            {/* FONT SIZE DROPDOWN */}
            {showFontSize && (
              <div style={{
                position: 'absolute',
                top: isWideScreen ? '0' : 'auto',
                bottom: isWideScreen ? 'auto' : '60px',
                right: isWideScreen ? '70px' : '0',
                left: isWideScreen ? 'auto' : '0',
                background: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                padding: '8px 0',
                minWidth: '150px',
                zIndex: 1100,
                border: '1px solid #e0e0e0',
              }}>
                <div style={{ 
                  padding: '8px 16px', 
                  borderBottom: '1px solid #f0f0f0',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#666',
                  textTransform: 'uppercase',
                }}>
                  Font Size
                </div>
                
                {[1.5, 1.25, 1.0].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleFontSizeSelect(size)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 16px',
                      border: 'none',
                      background: fontSize === size ? '#709425' : 'transparent',
                      color: fontSize === size ? '#ffffff' : '#333',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (fontSize !== size) {
                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (fontSize !== size) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {size === 1.5 ? '150%' : size === 1.25 ? '125%' : '100%'}
                  </button>
                ))}

                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setShowFontSize(false)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '8px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '16px',
                    color: '#999',
                    padding: '4px',
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* FULLSCREEN BUTTON */}
        <button
          onClick={fullscreenOnClick}
          title={isFullscreen ? "Exit fullscreen mode" : "Fullscreen mode"}
          style={{
            background: 'none',
            border: 'none',
            color: isFullscreen ? '#709425' : theme.bars.colors.icon,
            fontSize: '20px',
            cursor: 'pointer',
            padding: '12px',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            margin: isWideScreen ? '8px 0' : '0',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {isFullscreen ? '🔳' : '⛶'}
        </button>

        {/* SCROLL TO TOP BUTTON */}
        <button
          onClick={scrollToTopOnClick}
          title="Scroll to top"
          style={{
            background: 'none',
            border: 'none',
            color: scrollToTop ? '#709425' : theme.bars.colors.icon,
            fontSize: '20px',
            cursor: 'pointer',
            padding: '12px',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            margin: isWideScreen ? '8px 0' : '0',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          ⬆️
        </button>
      </div>
    </div>
  );
}
