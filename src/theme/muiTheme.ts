import { createTheme } from '@mui/material/styles';

// Thème Material-UI inspiré de l'ancien projet Gatsby
export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        },
      },
    },
  },
  palette: {
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  typography: {
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    fontFamily: '"Open Sans"',
    h1: {
      fontFamily: '"Open Sans"',
      fontSize: '27px',
      fontWeight: 600,
      lineHeight: '31px',
    },
    h2: {
      color: 'rgb(85, 85, 85)',
      fontFamily: '"Open Sans"',
      fontSize: '23px',
      fontWeight: 300,
      lineHeight: '27px',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
  },
});

export default theme;
