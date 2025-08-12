import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    base: {
      colors: {
        background: string
        text?: string
        link: string
        linkHover: string
        accent: string
        lines: string
      }
      sizes: { linesMargin: string }
      fonts: { unstyledFamily: string; styledFamily: string; styledFonts: string }
    }
    main: {
      colors: {
        background: string
        content: string
        link: string
        linkHover: string
        title: string
        blockquoteFrame: string
        contentHeading: string
        subTitle?: string
        meta?: string
        footer?: string
        fbCommentsColorscheme?: 'light' | 'dark'
      }
      fonts: {
        title?: { size: number; sizeM: number; sizeL: number; lineHeight: number; weight: number }
        content: { size: number; sizeM: number; sizeL: number; lineHeight: number }
        contentHeading: { h2Size: number; h3Size: number; lineHeight: number; weight: number }
        subTitle?: { size: number; sizeM: number; sizeL: number; lineHeight: number; weight: number }
        meta?: { size: number; weight: number }
        footer?: { size: number; lineHeight: number }
      }
      sizes: { articleMaxWidth: string }
    }
    info: {
      colors: {
        text: string
        background: string
        socialIcons?: string
        socialIconsHover?: string
        menuLink?: string
        menuLinkHover?: string
      }
      sizes: { width: number; headerHeight: number }
      fonts?: { boxTitleSize: number; boxTitleSizeM?: number; boxTitleSizeL?: number }
    }
    navigator: {
      colors: {
        background: string
        postsListItemLink: string
        postsListItemLinkHover?: string
        postsHeader?: string
      }
      sizes?: {
        closedHeight: number
        postsListItemH1Font: number
        postsListItemH2Font: number
        fontIncraseForM: number
        fontIncraseForL: number
      }
    }
    bars: {
      colors: { background: string; icon: string; text: string }
      sizes: { actionsBar: number; infoBar: number }
    }
  }

  interface ThemeOptions {
    base?: Partial<Theme['base']>
    main?: Partial<Theme['main']>
    info?: Partial<Theme['info']>
    navigator?: Partial<Theme['navigator']>
    bars?: Partial<Theme['bars']>
  }
}
