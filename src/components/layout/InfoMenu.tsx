import React from 'react';
import Link from 'next/link';
import styles from './InfoMenu.module.css';
import animations from '@/styles/AdvancedAnimations.module.css';

interface Page {
  slug: string;
  title: string;
  menuTitle?: string;
}

interface InfoMenuProps {
  pages: Page[];
  linkOnClick?: () => void;
  className?: string;
  variant?: 'vertical' | 'horizontal' | 'organic';
}

const InfoMenu: React.FC<InfoMenuProps> = ({ 
  pages, 
  linkOnClick, 
  className, 
  variant = 'vertical' 
}) => {
  // Déterminer les classes CSS selon le variant
  const getContainerClass = () => {
    if (className) return className; // Utilise la classe personnalisée si fournie
    
    switch (variant) {
      case 'horizontal':
        return styles.infoMenuHorizontal;
      case 'organic':
        return styles.organicNav;
      default:
        return styles.infoMenu;
    }
  };

  const getLinkClass = () => {
    switch (variant) {
      case 'horizontal':
        return styles.linkHorizontal;
      case 'organic':
        return styles.organicLink;
      default:
        return styles.link;
    }
  };

  return (
    <nav className={`${getContainerClass()} ${animations.navigationTransition}`}>
      {pages.map((page, index) => (
        <Link
          key={page.slug}
          href={page.slug}
          onClick={linkOnClick}
          className={`${getLinkClass()} ${animations.interactiveElement} ${animations.positionIndicator}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {page.menuTitle || page.title}
        </Link>
      ))}
      <Link 
        href="/contact" 
        onClick={linkOnClick} 
        className={`${getLinkClass()} ${animations.interactiveElement} ${animations.positionIndicator}`}
        style={{ animationDelay: `${pages.length * 0.1}s` }}
      >
        contact
      </Link>
    </nav>
  );
};

export default InfoMenu;
