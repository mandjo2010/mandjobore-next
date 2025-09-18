import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from './InfoHeader.module.css';

interface InfoHeaderProps {
  info?: any;
  avatarOnClick: (e: React.MouseEvent) => void;
  expandOnClick: (e: React.MouseEvent) => void;
}

const InfoHeader: React.FC<InfoHeaderProps> = ({ 
  avatarOnClick, 
  expandOnClick, 
  info 
}) => {
  // Configuration par défaut - à adapter selon vos données
  const config = {
    siteDescription: "GeoDeveloper & GeoDesigner",
    siteTitle: "Mandjo Béa Boré"
  };

  return (
    <header className={styles.header}>
      <Link href="/" onClick={avatarOnClick} className={styles.avatarLink}>
        <div className={styles.avatar}>
          <Image
            src="/images/avatar.jpg" // Assurez-vous que cette image existe
            alt="Avatar"
            width={60}
            height={60}
            priority
            unoptimized
          />
        </div>
      </Link>
      
      <h1 className={styles.title}>
        <Link href="/" onClick={avatarOnClick}>
          {config.siteTitle}
          <small>{config.siteDescription}</small>
        </Link>
      </h1>
      
      <button 
        className={styles.expand}
        onClick={expandOnClick}
        aria-label="Expand the box"
        type="button"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
        </svg>
      </button>
    </header>
  );
};

export default InfoHeader;
