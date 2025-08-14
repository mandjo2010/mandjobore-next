import { createTheme } from '@mui/material/styles';
import Color from 'color';

import colors from './colors';

export const theme = createTheme({
  bars: {
    colors: {
      background: colors.background,
      icon: colors.gray,
      text: colors.gray,
    },
    sizes: { actionsBar: 60, infoBar: 60 },
  },
  base: {
    colors: {
      accent: colors.accent,
      background: colors.background,
      lines: colors.superLightGray,
      link: colors.accent,
      linkHover: Color(colors.accent).lighten(0.1).string(),
      text: colors.dark,
    },
    fonts: {
      styledFamily: 'Open Sans',
      styledFonts: '300,400,600',
      unstyledFamily: `Arial`,
    },
    sizes: { linesMargin: '20px' },
  },
  // TODO: Add footer to custom theme type
  // footer: {
  //   colors: {
  //     link: colors.accent,
  //     linkHover: Color(colors.accent).lighten(0.2).string(),
  //     text: Color(colors.gray).lighten(0.5).string(),
  //   },
  //   fonts: { footnote: { lineHeight: 1.4, size: 0.8 } },
  // },
  info: {
    colors: {
      background: colors.background,
      menuLink: colors.gray,
      menuLinkHover: colors.accent,
      socialIcons: colors.lightGray,
      socialIconsHover: colors.accent,
      text: colors.gray,
    },
    fonts: { boxTitleSize: 1.3, boxTitleSizeL: 1.7, boxTitleSizeM: 1.5 },
    sizes: { headerHeight: 170, width: 320 },
  },
  main: {
    colors: {
      background: colors.background,
      blockquoteFrame: colors.lightGray,
      content: colors.dark,
      contentHeading: colors.gray,
      fbCommentsColorscheme: 'light',
      footer: colors.gray,
      link: colors.accent,
      linkHover: colors.dark,
      meta: colors.gray,
      subTitle: colors.gray,
      title: colors.gray,
    },
    fonts: {
      content: { lineHeight: 1.6, size: 1.0, sizeL: 1.1, sizeM: 1.15 },
      contentHeading: {
        h2Size: 1.5,
        h3Size: 1.3,
        lineHeight: 1.3,
        weight: 600,
      },
      footer: { lineHeight: 1.4, size: 1 },
      meta: { size: 0.9, weight: 600 },
      subTitle: {
        lineHeight: 1.1,
        size: 1.5,
        sizeL: 1.95,
        sizeM: 1.8,
        weight: 300,
      },
      title: {
        lineHeight: 1.1,
        size: 1.9,
        sizeL: 2.7,
        sizeM: 2.5,
        weight: 600,
      },
    },
    sizes: { articleMaxWidth: '50em' },
  },
  // TODO: Add custom properties to theme type definition
  // mediaQueryTresholds: { L: 1024, M: 600 },
  navigator: {
    colors: {
      background: colors.background,
      postsHeader: colors.gray,
      postsListItemLink: colors.gray,
      postsListItemLinkHover: colors.accent,
    },
    sizes: {
      closedHeight: 80,
      fontIncraseForL: 1.3,
      fontIncraseForM: 1.15,
      postsListItemH1Font: 1.3,
      postsListItemH2Font: 1.1,
    },
  },

  // MUI palette/typography pour coller au rendu
  palette: {
    action: { hover: 'rgba(0, 0, 0, 0.01)' },
    background: { default: colors.background, paper: colors.white },
    primary: { main: colors.accent },
    text: { primary: colors.dark, secondary: colors.gray },
  },
  typography: {
    fontFamily: `Arial, sans-serif`,
    fontSize: 16,
  },
});

export default theme;