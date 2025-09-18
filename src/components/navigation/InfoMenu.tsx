import Link from 'next/link';
import React from 'react';

import styles from './InfoMenu.module.css';

interface PageNode {
  node: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      menuTitle?: string;
    };
  };
}

interface InfoMenuProps {
  pages: PageNode[];
  linkOnClick: (e: React.MouseEvent) => void;
}

const InfoMenu: React.FC<InfoMenuProps> = ({ linkOnClick, pages }) => {
  // Menu items par défaut basés sur l'ancien site Gatsby
  const defaultMenuItems = [
    { menuTitle: 'about', slug: '/about/', title: 'about' },
    { menuTitle: 'cartography', slug: '/cartography/', title: 'cartography' },
    { menuTitle: 'portfolio', slug: '/portfolio/', title: 'portfolio' },
    { menuTitle: 'contact', slug: '/contact/', title: 'contact' }
  ];

  // Utiliser les pages fournies ou les items par défaut
  const menuItems = pages && pages.length > 0 
    ? pages.map(page => ({
        menuTitle: page.node.frontmatter.menuTitle || page.node.frontmatter.title,
        slug: page.node.fields.slug,
        title: page.node.frontmatter.title
      }))
    : defaultMenuItems;

  return (
    <nav className={styles.infoMenu}>
      {menuItems.map((item, i) => (
        <Link
          key={item.slug}
          href={item.slug}
          onClick={linkOnClick}
          className={styles.link}
          data-shape="closed"
        >
          {item.menuTitle.toLowerCase()}
        </Link>
      ))}
    </nav>
  );
};

export default InfoMenu;
