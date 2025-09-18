import React from 'react';

import styles from './InfoText.module.css';

interface InfoTextProps {
  info: any;
}

const InfoText: React.FC<InfoTextProps> = ({ info }) => {
  // Texte par défaut si pas d'info fournie
  const defaultText = `
    <p>Passionate GeoDeveloper & GeoDesigner creating innovative mapping solutions and geographic visualization tools.</p>
    <p>Specialized in web development, cartography, and spatial data analysis.</p>
  `;

  const text = info?.node?.html || info?.html || defaultText;

  return (
    <div 
      className={styles.text} 
      dangerouslySetInnerHTML={{ __html: text }} 
    />
  );
};

export default InfoText;
