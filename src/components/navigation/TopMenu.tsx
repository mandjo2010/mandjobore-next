import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

import styles from './TopMenu.module.css';

interface TopMenuProps {
  pages: any[];
  pageLinkOnClick: (e: React.MouseEvent) => void;
  homeLinkOnClick: (e: React.MouseEvent) => void;
}

const TopMenu: React.FC<TopMenuProps> = ({ 
  homeLinkOnClick, 
  pageLinkOnClick, 
  pages 
}) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Menu items par défaut
  const defaultMenuItems = [
    { slug: '/', title: 'Home' },
    { slug: '/about/', title: 'About' },
    { slug: '/cartography/', title: 'Cartography' },
    { slug: '/portfolio/', title: 'Portfolio' },
    { slug: '/contact/', title: 'Contact' }
  ];

  const menuItems = pages && pages.length > 0 
    ? [{ slug: '/', title: 'Home' }, ...pages.map((page: any) => ({
        slug: page.node.fields.slug,
        title: page.node.frontmatter.menuTitle || page.node.frontmatter.title
      }))]
    : defaultMenuItems;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    if (!open) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  const handleMenuItemClick = (e: React.MouseEvent, isHome: boolean) => {
    if (isHome) {
      homeLinkOnClick(e);
    } else {
      pageLinkOnClick(e);
    }
    setOpen(false);
  };

  return (
    <div className={styles.topMenu}>
      <button
        className={`${styles.menuButton} ${open ? styles.open : ''}`}
        onClick={handleClick}
        aria-label="Menu"
        aria-expanded={open}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      {open && (
        <div 
          className={styles.menuOverlay}
          onClick={handleClose}
        >
          <div 
            className={styles.menuContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.menuList}>
              {menuItems.map((item, index) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  onClick={(e) => handleMenuItemClick(e, item.slug === '/')}
                  className={styles.menuItem}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopMenu;
