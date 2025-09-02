/**
 * Thème reproduisant exactement les valeurs du starter Gatsby de Greg Lobinski
 * Correspondance 1:1 avec src/styles/theme.js
 */
import { createTheme } from '@mui/material/styles'

// Couleurs exactes du starter Gatsby
const colors = {
  // Base colors from colors.js
  background: '#ffffff',
  text: '#333333',
  accent: '#709425', // Vert caractéristique
  
  // Info colors (InfoBox)
  infoBackground: '#ffffff',
  infoText: '#555555',
  
  // Navigator colors
  navigatorBackground: '#ffffff',
  navigatorText: '#333333',
  
  // Actions bar colors  
  actionsBackground: '#ffffff',
  actionsIcon: '#555555',
  
  // Lines and borders
  lines: '#e0e0e0'
}

// Breakpoints exacts de Gatsby
const breakpoints = {
  M: 600,  // Medium screens
  L: 1024  // Large screens (seuil InfoBox)
}

// Sizes exactes des composants Gatsby
const sizes = {
  // InfoBox (sidebar gauche)
  infoWidth: 320,
  
  // ActionsBar (sidebar droite)
  actionsBarWidth: 64,
  
  // Navigator heights en mode aside
  navigatorClosedHeight: 80,
  navigatorOpenHeight: 'auto',
  
  // Marges et paddings
  linesMargin: '10px'
}

// Polices exactes
const fonts = {
  // Open Sans utilisé dans Gatsby
  base: {
    family: '"Open Sans"',
    size: '16px',
    lineHeight: 1.6
  },
  
  // Titres d'articles - WhatFont exact
  title: {
    family: '"Open Sans"',
    size: '27px',
    lineHeight: '31px',
    letterSpacing: '-0.03em',
    fontWeight: 600
  },
  
  // Sous-titres - WhatFont exact
  subtitle: {
    family: '"Open Sans"', 
    size: '23px',
    lineHeight: '27px',
    fontWeight: 300,
    color: 'rgb(85, 85, 85)'
  }
}

export const gatsbyTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.accent
    },
    background: {
      default: colors.background,
      paper: colors.background
    },
    text: {
      primary: colors.text,
      secondary: '#888888'
    }
  },
  
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: breakpoints.M,
      lg: breakpoints.L,
      xl: 1920
    }
  },
  
  typography: {
    fontFamily: fonts.base.family,
    fontSize: 16,
    
    h1: {
      fontFamily: fonts.title.family,
      fontSize: fonts.title.size,
      lineHeight: fonts.title.lineHeight,
      letterSpacing: fonts.title.letterSpacing,
      fontWeight: fonts.title.fontWeight,
      color: colors.text
    },
    
    h2: {
      fontFamily: fonts.subtitle.family,
      fontSize: fonts.subtitle.size,
      lineHeight: fonts.subtitle.lineHeight,
      fontWeight: fonts.subtitle.fontWeight,
      color: fonts.subtitle.color
    }
  },
  
  // Extension du thème avec les valeurs Gatsby
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: fonts.base.family,
          fontSize: fonts.base.size,
          lineHeight: fonts.base.lineHeight,
          color: colors.text,
          backgroundColor: colors.background
        }
      }
    }
  }
})

// Variables CSS personnalisées pour les dimensions Gatsby
export const gatsbyVariables = {
  '--info-width': `${sizes.infoWidth}px`,
  '--actions-width': `${sizes.actionsBarWidth}px`,
  '--navigator-closed-height': `${sizes.navigatorClosedHeight}px`,
  '--breakpoint-L': `${breakpoints.L}px`,
  '--breakpoint-M': `${breakpoints.M}px`,
  '--accent-color': colors.accent,
  '--text-color': colors.text,
  '--lines-color': colors.lines
} as const

// Déclaration TypeScript pour étendre le thème MUI
declare module '@mui/material/styles' {
  interface Theme {
    gatsby: {
      colors: typeof colors
      breakpoints: typeof breakpoints  
      sizes: typeof sizes
      fonts: typeof fonts
    }
  }
}

// Extension du thème avec les valeurs Gatsby
export const extendedGatsbyTheme = createTheme(gatsbyTheme, {
  gatsby: {
    colors,
    breakpoints,
    sizes,
    fonts
  }
})
