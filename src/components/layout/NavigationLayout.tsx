'use client';

import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsWideScreen } from '../../store/navigationSlice';
import InfoBar from '../navigation/InfoBar';
import InfoBox from '../navigation/InfoBox';
import styles from './NavigationLayout.module.css';

interface NavigationLayoutProps {
  children: React.ReactNode;
}

const NavigationLayout: React.FC<NavigationLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isWideScreen, navigatorPosition, navigatorShape } = useAppSelector(
    (state) => state.navigation
  );

  // Hook pour détecter la taille d'écran - reproduit la logique Gatsby
  useEffect(() => {
    const checkScreenSize = () => {
      const wideScreen = window.innerWidth >= 1024; // Seuil L comme dans Gatsby
      dispatch(setIsWideScreen(wideScreen));
    };

    // Vérification initiale
    checkScreenSize();

    // Throttled resize handler comme dans l'ancien code Gatsby
    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(checkScreenSize, 100);
    };

    window.addEventListener('resize', throttledResize);
    
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dispatch]);

  // Pages de navigation par défaut - à adapter selon votre contenu
  const pages = [
    {
      node: {
        fields: { slug: '/about/' },
        frontmatter: { menuTitle: 'about', title: 'About' }
      }
    },
    {
      node: {
        fields: { slug: '/cartography/' },
        frontmatter: { menuTitle: 'cartography', title: 'Cartography' }
      }
    },
    {
      node: {
        fields: { slug: '/portfolio/' },
        frontmatter: { menuTitle: 'portfolio', title: 'Portfolio' }
      }
    },
    {
      node: {
        fields: { slug: '/contact/' },
        frontmatter: { menuTitle: 'contact', title: 'Contact' }
      }
    }
  ];

  // Info par défaut pour l'InfoBox - à adapter selon votre contenu
  const defaultInfo = {
    node: {
      frontmatter: { title: 'info' },
      html: `
        <p>Passionate GeoDeveloper & GeoDesigner creating innovative mapping solutions and geographic visualization tools.</p>
        <p>Specialized in web development, cartography, and spatial data analysis.</p>
      `
    }
  };

  return (
    <div className={`${styles.layoutWrapper} ${navigatorPosition} ${navigatorShape}`}>
      {/* InfoBar pour mobile - masqué sur desktop */}
      <InfoBar pages={pages} />
      
      {/* InfoBox pour desktop - masqué sur mobile */}
      {isWideScreen && (
        <InfoBox 
          pages={pages} 
          parts={[defaultInfo]} 
          info={defaultInfo}
        />
      )}
      
      {/* Contenu principal avec marge pour la sidebar */}
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
};

export default NavigationLayout;
