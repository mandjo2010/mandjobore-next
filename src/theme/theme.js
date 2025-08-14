import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
	base: {
		colors: {
			accent: '#709425',
			background: '#ffffff',
			lines: '#dedede',
			link: '#709425',
			linkHover: '#5f7f1f',
			text: '#333333',
		},
		fonts: {
			styledFamily: '"Open Sans", sans-serif',
			styledFonts: '300,400,600',
			unstyledFamily: 'system-ui, sans-serif',
		},
		sizes: { linesMargin: '20px' },
	},
	main: {
		colors: {
			background: '#ffffff',
			blockquoteFrame: '#bbbbbb',
			content: '#333333',
			link: '#709425',
			linkHover: '#333333',
			subTitle: 'rgb(85, 85, 85)',
			title: 'rgb(51, 51, 51)',
		},
		fonts: {
			content: { lineHeight: 1.6, size: 1.0, sizeL: 1.1, sizeM: 1.15 },
			contentHeading: {
				h2Size: 1.5,
				h3Size: 1.3,
				lineHeight: 1.3,
				weight: 600,
			},
			// Configuration exacte selon spécifications - CORRECTION TAILLES
			subTitle: { 
				color: 'rgb(85, 85, 85)',
				fontFamily: '"Open Sans", sans-serif',
				lineHeight: 27, 
				size: 23, 
				sizeL: 23, // FORCÉ À 23px
				sizeM: 23, // FORCÉ À 23px
				weight: 300,
			},
			title: { 
				color: 'rgb(51, 51, 51)',
				fontFamily: '"Open Sans", sans-serif',
				lineHeight: 31, 
				size: 27, 
				sizeL: 27, // FORCÉ À 27px
				sizeM: 27, // FORCÉ À 27px
				weight: 600,
			},
		},
		sizes: { articleMaxWidth: '50em' },
	},
})
