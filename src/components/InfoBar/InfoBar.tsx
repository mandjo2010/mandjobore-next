/**
 * InfoBar - Barre d'info mobile reproduisant le design Gatsby original
 * Basé sur src/components/InfoBar/InfoBar.js du starter de Greg Lobinski
 */
'use client'

import { MoreVert } from '@mui/icons-material'
import { Box, Typography, Avatar, IconButton, Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'

import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

// Configuration comme InfoBox
const author = {
  avatar: '/images/jpg/avatar.jpg',
  name: 'Mandjo Béa Boré',
  tagline: 'Data Analyst & Developer'
}

interface Page {
  slug: string
  title: string
  menuTitle?: string
}

interface InfoBarProps {
  pages: Page[]
}

export default function InfoBar({ pages }: InfoBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { featureNavigator, moveNavigatorAside } = useGatsbyUIStore()
  
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const homeLinkOnClick = () => {
    featureNavigator()
    handleClose()
  }

  const pageLinkOnClick = () => {
    moveNavigatorAside()
    handleClose()
  }

  return (
    <Box
      component="aside"
      sx={{
        // Border bottom exact du theme original
        '&::before': {
          borderTop: '1px solid var(--color-lines)', // theme.base.colors.lines
          bottom: 0,
          content: '""',
          height: 0,
          left: 'var(--lines-margin)', // theme.base.sizes.linesMargin
          position: 'absolute',
          right: 'var(--lines-margin)'
        },
        // Masqué sur desktop comme dans l'original
        '@media (min-width: 1024px)': { // theme.mediaQueryTresholds.L
          display: 'none'
        },
        background: 'var(--bars-background)', // theme.bars.colors.background
        height: 'var(--layout-infobar-height)', // theme.bars.sizes.infoBar = 48px
        left: 0,
        // Reproduction exacte des styles infoBar du theme original
        position: 'absolute',
        
        top: 0,
        
        width: '100%'
      }}
    >
      {/* Avatar avec lien Home - styles exacts du theme original */}
      <Link 
        href="/" 
        onClick={homeLinkOnClick}
        style={{
          // Reproduction exacte des styles avatarLink du theme original
          display: 'block',
          float: 'left',
          margin: '13px 0 0 30px'
        }}
      >
        <Avatar
          src={author.avatar}
          alt={author.name}
          sx={{
            border: '1px solid #ddd',
            borderRadius: '65% 75%',
            height: '36px',
            // Reproduction exacte des styles avatar du theme original
            width: '36px'
          }}
        />
      </Link>

      {/* Titre avec nom et tagline - styles exacts du theme original */}
      <Typography
        component="h3"
        sx={{
          '& small': {
            display: 'block',
            fontSize: '0.65em',
            margin: '2px 0 0 0'
          },
          color: 'var(--bars-icon-color)', // theme.bars.colors.text
          // Reproduction exacte des styles title du theme original
          float: 'left',
          
          margin: '10px 0 0 15px'
        }}
      >
        {author.name}
        <small>{author.tagline}</small>
      </Typography>

      {/* Menu mobile - styles exacts du theme original */}
      <Box
        sx={{
          '@media (min-width: 768px)': { // theme.mediaQueryTresholds.M
            // Styles supplémentaires pour tablet si nécessaire
          },
          // Reproduction exacte des styles topMenu du theme original
          float: 'right',
          
          margin: '5px 10px 0 0'
        }}
      >
        <IconButton
          aria-label="More"
          aria-controls={open ? 'mobile-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            // Reproduction exacte des styles open du theme original
            color: 'var(--bars-icon-color)' // theme.bars.colors.icon
          }}
        >
          <MoreVert />
        </IconButton>
        
        <Menu
          id="mobile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
        >
          <MenuItem onClick={homeLinkOnClick}>
            Home
          </MenuItem>
          
          {pages.map((page) => (
            <MenuItem key={page.slug} onClick={pageLinkOnClick}>
              <Link 
                href={`/pages/${page.slug}`}
                style={{ 
                  color: 'inherit', 
                  display: 'block',
                  textDecoration: 'none',
                  width: '100%'
                }}
              >
                {page.menuTitle || page.title}
              </Link>
            </MenuItem>
          ))}
          
          <MenuItem onClick={pageLinkOnClick}>
            <Link 
              href="/services"
              style={{ 
                color: 'inherit', 
                display: 'block',
                textDecoration: 'none',
                width: '100%'
              }}
            >
              Services
            </Link>
          </MenuItem>
          
          <MenuItem onClick={pageLinkOnClick}>
            <Link 
              href="/contact/"
              style={{ 
                color: 'inherit', 
                display: 'block',
                textDecoration: 'none',
                width: '100%'
              }}
            >
              Contact
            </Link>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}
