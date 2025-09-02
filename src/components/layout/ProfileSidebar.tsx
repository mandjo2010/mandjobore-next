import { useMediaQuery, useTheme } from '@mui/material'
import { Github, Linkedin, Facebook, Twitter } from 'lucide-react'
import Image from 'next/image'

import animations from '@/styles/AdvancedAnimations.module.css'
import authorConfig from '@/config/author'

import InfoMenu from './InfoMenu'
import OrganicProfileBar from './OrganicProfileBar'
import styles from './ProfileSidebar.module.css'

interface ProfileSidebarProps {
  isHorizontal?: boolean
}

export default function ProfileSidebar({ isHorizontal }: ProfileSidebarProps) {
  const theme = useTheme()
  
  // Détection automatique du mode horizontal si pas spécifié
  const autoDetectHorizontal = useMediaQuery(theme.breakpoints.down('sm'))
  const shouldUseHorizontal = isHorizontal ?? autoDetectHorizontal
  const techStack = [
    { href: 'https://nextjs.org/', name: 'Next.js', src: '/images/svg-icons/nextjs.svg' },
    { href: 'https://reactjs.org/', name: 'React', src: '/images/svg-icons/react.svg' },
    { href: 'https://www.typescriptlang.org/', name: 'TypeScript', src: '/images/svg-icons/typescript.svg' },
    { href: 'https://mui.com/', name: 'Material-UI', src: '/images/svg-icons/material-ui.svg' },
    { href: 'https://graphql.org/', name: 'GraphQL', src: '/images/svg-icons/graphql.svg' },
    { href: 'https://webpack.js.org/', name: 'Webpack', src: '/images/svg-icons/webpack.svg' },
  ]

  if (shouldUseHorizontal) {
    // Mode horizontal (mobile/zoom élevé) - utilise les composants organiques
    return <OrganicProfileBar isVisible={true} />;
  }

  // Mode vertical (desktop)
  return (
    <aside className={`${styles.sidebar} ${animations.navigationTransition} ${animations.themeTransition}`}>
      <div className={styles.profileContent}>
        <div className={styles.profileHeader}>
          <div className={styles.profileAvatar}>
            <Image src={authorConfig.avatar} alt={authorConfig.authorName} fill sizes="72px" />
          </div>
          <h1 className={styles.authorName}>{authorConfig.infoTitle}</h1>
          <p className={styles.authorRole}>{authorConfig.infoTitleNote}</p>
        </div>

        <p className={styles.bioText}>
          {authorConfig.bio}
        </p>

        <div className={`${styles.profileSocial} ${animations.lazyLoadElement}`}>
          {authorConfig.authorSocialLinks.map((social) => {
            const getIcon = () => {
              switch (social.name) {
                case 'github': return <Github size={20} />;
                case 'linkedin': return <Linkedin size={20} />;
                case 'facebook': return <Facebook size={20} />;
                case 'twitter': return <Twitter size={20} />;
                default: return null;
              }
            };
            
            return (
              <a 
                key={social.name}
                href={social.url} 
                aria-label={social.name} 
                target="_blank" 
                rel="noreferrer" 
                className={animations.interactiveElement}
              >
                {getIcon()}
              </a>
            );
          })}
        </div>

        <InfoMenu 
          pages={[
            { slug: '/pages/about', title: 'about' },
            { slug: '/cartography', title: 'cartography' },
            { slug: '/portfolio', title: 'portfolio' }
          ]}
          className={`${animations.navigationFeatured} ${styles.profileNav}`}
        />
      </div>

      <div className={`${styles.builtWith} ${animations.lazyLoadElement}`}>
        <p className={styles.builtTitle}>BUILT WITH:</p>
        <ul className={styles.builtGrid}>
          {techStack.map((tech, index) => (
            <li key={tech.name}>
              <a 
                href={tech.href} 
                target="_blank" 
                rel="noreferrer"
                className={animations.interactiveElement}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img src={tech.src} alt={tech.name} width="28" height="28" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
