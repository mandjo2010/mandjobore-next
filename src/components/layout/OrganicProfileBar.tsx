import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

import organicStyles from '@/styles/OrganicShapes.module.css';
import animations from '@/styles/AdvancedAnimations.module.css';
import InfoMenu from './InfoMenu';

interface OrganicProfileBarProps {
  isVisible?: boolean;
}

export default function OrganicProfileBar({ isVisible = true }: OrganicProfileBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isVisible) return null;

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 20,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        pointerEvents: 'none'
      }}>
        
        {/* Côté gauche : Profil dans forme organique rouge */}
        <div className={`${organicStyles.organicContainer} ${organicStyles.organicProfile} ${animations.interactiveElement} ${animations.navigationTransition}`} 
             style={{ pointerEvents: 'auto' }}>
          <div className={organicStyles.organicContent}>
            <div className={organicStyles.profileInfo}>
              <div className={`${organicStyles.profileAvatar} ${animations.avatarInteractive}`}>
                <Image 
                  src="/images/avatar.svg" 
                  alt="Mandjo Béa Boré" 
                  fill 
                  sizes="42px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={organicStyles.profileText}>
                <h1 className={`${organicStyles.profileName} ${animations.responsiveTypography}`}>Mandjo Béa Boré</h1>
                <p className={`${organicStyles.profileRole} ${animations.responsiveTypography}`}>Data analyst - Developer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Côté droit : Icône menu (3 points verticaux) dans forme organique rouge */}
        <div className={`${organicStyles.organicContainer} ${organicStyles.organicNavigation} ${animations.interactiveElement} ${animations.feedbackElement}`}
             style={{ pointerEvents: 'auto' }}>
          <IconButton 
            onClick={() => setIsMenuOpen(true)}
            className={animations.tangibleNavigation}
            style={{ 
              color: 'white',
              padding: '8px'
            }}
            title="Menu de navigation"
          >
            <MoreVert />
          </IconButton>
        </div>
      </div>

      {/* Dialog pour le menu de navigation */}
      <Dialog
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: '#dc2626',
            borderRadius: '16px',
            padding: '16px'
          }
        }}
        className={animations.themeTransition}
      >
        <DialogContent style={{ padding: '16px' }} className={animations.navigationFeatured}>
          <InfoMenu 
            pages={[
              { slug: '/', title: 'accueil' },
              { slug: '/pages/about', title: 'about' },
              { slug: '/cartography', title: 'cartography' },
              { slug: '/portfolio', title: 'portfolio' }
            ]}
            variant="organic"
            linkOnClick={() => setIsMenuOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
