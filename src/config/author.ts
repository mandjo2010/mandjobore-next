/**
 * Configuration de l'auteur
 * Centralise toutes les informations d'auteur utilisées dans l'application
 * Basé sur la structure config.js de Gatsby v1
 */

export interface AuthorConfig {
  infoTitle: string;
  infoTitleNote: string;
  authorName: string;
  bio: string;
  avatar: string;
  authorSocialLinks: Array<{
    name: string;
    url: string;
  }>;
}

const authorConfig: AuthorConfig = {
  // Nom principal et titre (comme config.infoTitle/infoTitleNote dans Gatsby v1)
  infoTitle: 'Mandjo Béa Boré',
  infoTitleNote: 'Data analyst - Developer',
  
  // Nom d'auteur complet
  authorName: 'Mandjo Béa Boré',
  
  // Bio/Description de l'auteur (remplace le contenu Markdown "info")
  bio: `I am a data analyst and developer specializing in spatial and geospatial applications. 
        I design and build applications to support data analysis including GIS and mapping solutions.`,
  
  // Avatar (chemin vers l'image)
  avatar: '/images/jpg/avatar.jpg',
  
  // Liens sociaux (comme config.authorSocialLinks dans Gatsby v1)
  authorSocialLinks: [
    { name: 'github', url: 'https://github.com/mandjo2010' },
    { name: 'twitter', url: 'https://x.com/kozoubea' },
    { name: 'linkedin', url: 'https://fr.linkedin.com/in/mandjobb' },
    { name: 'facebook', url: 'https://www.instagram.com/mandjo_bb/' },
    { name: 'email', url: 'mailto:contact@mandjobore.com' },
  ],
};

export default authorConfig;
