/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// Couleurs inspirées de votre site actuel
				primary: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					900: '#0c4a6e',
				},
				secondary: {
					50: '#f8fafc',
					100: '#f1f5f9',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					900: '#0f172a',
				},
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Consolas', 'monospace'],
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						color: 'rgb(51, 65, 85)',
						h1: {
							color: 'rgb(15, 23, 42)',
						},
						h2: {
							color: 'rgb(15, 23, 42)',
						},
						h3: {
							color: 'rgb(15, 23, 42)',
						},
						'code::before': {
							content: '""',
						},
						'code::after': {
							content: '""',
						},
					},
				},
				dark: {
					css: {
						color: 'rgb(226, 232, 240)',
						h1: {
							color: 'rgb(248, 250, 252)',
						},
						h2: {
							color: 'rgb(248, 250, 252)',
						},
						h3: {
							color: 'rgb(248, 250, 252)',
						},
						strong: {
							color: 'rgb(248, 250, 252)',
						},
						a: {
							color: 'rgb(56, 189, 248)',
						},
						blockquote: {
							color: 'rgb(226, 232, 240)',
							borderLeftColor: 'rgb(56, 189, 248)',
						},
					},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		function({ addUtilities }) {
			const newUtilities = {
				'.line-clamp-2': {
					overflow: 'hidden',
					display: '-webkit-box',
					'-webkit-box-orient': 'vertical',
					'-webkit-line-clamp': '2',
				},
				'.line-clamp-3': {
					overflow: 'hidden',
					display: '-webkit-box',
					'-webkit-box-orient': 'vertical',
					'-webkit-line-clamp': '3',
				},
				'.scrollbar-hide': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				},
			}
			addUtilities(newUtilities)
		},
	],
}
