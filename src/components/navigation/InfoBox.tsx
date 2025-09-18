import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setNavigatorShape } from '../../store/navigationSlice';
import SocialIcons from '../InfoBox/SocialIcons';
import StackIcons from '../InfoBox/StackIcons';
import styles from './InfoBox.module.css';
import InfoHeader from './InfoHeader';
import InfoMenu from './InfoMenu';
import InfoText from './InfoText';

interface InfoBoxProps {
  pages?: any[];
  parts?: any[];
  info?: any;
}

const InfoBox: React.FC<InfoBoxProps> = ({ info, pages = [], parts = [] }) => {
  const dispatch = useDispatch();
  const navigatorPosition = useSelector((state: any) => state.navigation?.navigatorPosition || 'is-aside');
  const navigatorShape = useSelector((state: any) => state.navigation?.navigatorShape || 'open');
  const isWideScreen = useSelector((state: any) => state.navigation?.isWideScreen || false);

  const expandOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setNavigatorShape("closed"));
  };

  const avatarOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Feature navigator - logic from original Gatsby code
    if (navigatorPosition === "is-aside") {
      dispatch(setNavigatorShape("open"));
    }
  };

  const menuLinkOnClick = (e: React.MouseEvent) => {
    // Move navigator aside - logic from original Gatsby code
    const target = e.currentTarget;
    const dataShape = target.getAttribute("data-shape");
    const newNavigatorShape = dataShape ? dataShape : "open";
    
    if (navigatorPosition === "is-featured") {
      dispatch(setNavigatorShape(newNavigatorShape));
    }
  };

  // Find info part from parts array (original Gatsby logic)
  const infoData = info || (parts.length > 0 ? parts.find((el: any) => el.node?.frontmatter?.title === "info") : null);

  return (
    <aside 
      className={`${styles.infoBox} ${styles[navigatorPosition]} ${styles[navigatorShape]}`}
      data-wide-screen={isWideScreen}
    >
      {infoData && (
        <InfoHeader
          info={infoData}
          avatarOnClick={avatarOnClick}
          expandOnClick={expandOnClick}
        />
      )}
      
      <div className={styles.wrapper}>
        {infoData && (
          <InfoText info={infoData} />
        )}
        
        <SocialIcons />
        
        {pages && pages.length > 0 && (
          <InfoMenu 
            pages={pages} 
            linkOnClick={menuLinkOnClick} 
          />
        )}
        
        <StackIcons />
      </div>
    </aside>
  );
};

export default InfoBox;
