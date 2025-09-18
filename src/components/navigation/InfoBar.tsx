import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setNavigatorPosition } from '../../store/navigationSlice';
import styles from './InfoBar.module.css';
import TopMenu from './TopMenu';

interface InfoBarProps {
  pages?: any[];
}

const InfoBar: React.FC<InfoBarProps> = ({ pages = [] }) => {
  const dispatch = useDispatch();
  const navigatorPosition = useSelector((state: any) => state.navigation?.navigatorPosition || 'is-aside');

  // Configuration par défaut
  const config = {
    siteDescription: "GeoDeveloper & GeoDesigner",
    siteTitle: "Mandjo Béa Boré"
  };

  const homeLinkOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Feature navigator logic from Gatsby
    if (navigatorPosition === "is-aside") {
      dispatch(setNavigatorPosition("is-featured"));
    }
  };

  const pageLinkOnClick = (e: React.MouseEvent) => {
    // Move navigator aside logic from Gatsby
    if (navigatorPosition === "is-featured") {
      dispatch(setNavigatorPosition("is-aside"));
    }
  };

  return (
    <header 
      className={`${styles.infoBar} ${navigatorPosition}`}
      role="banner"
    >
      <h1 className={styles.title}>
        <Link href="/" onClick={homeLinkOnClick}>
          {config.siteTitle}
          <small>{config.siteDescription}</small>
        </Link>
      </h1>
      
      <Link 
        href="/" 
        onClick={homeLinkOnClick}
        className={styles.avatarLink}
      >
        <div className={styles.avatar}>
          <Image
            src="/images/avatar.jpg" // Assurez-vous que cette image existe
            alt="Avatar"
            width={36}
            height={36}
            priority
            unoptimized
          />
        </div>
      </Link>
      
      <TopMenu 
        pages={pages}
        pageLinkOnClick={pageLinkOnClick}
        homeLinkOnClick={homeLinkOnClick}
      />
    </header>
  );
};

export default InfoBar;
