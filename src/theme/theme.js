import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
	base: {
		colors: {
			background: '#ffffff',
			text: '#333333',
			link: '#709425',
			linkHover: '#5f7f1f',
			accent: '#709425',
			lines: '#dedede',
		},
		sizes: { linesMargin: '20px' },
	},
	main: {
		colors: {
			background: '#ffffff',
			title: '#555555',
			subTitle: '#555555',
			content: '#333333',
			blockquoteFrame: '#bbbbbb',
			link: '#709425',
			linkHover: '#333333',
		},
		sizes: { articleMaxWidth: '50em' },
		fonts: {
			content: { size: 1.0, sizeM: 1.15, sizeL: 1.1, lineHeight: 1.6 },
			contentHeading: {
				h2Size: 1.5,
				h3Size: 1.3,
				weight: 600,
				lineHeight: 1.3,
			},
		},
	},
})
