import { GlobalStyles } from '@mui/material'
import type { CSSProperties } from 'react'

export default function GlobalCss() {
	return (
		<GlobalStyles
			styles={{
				// === VARIABLES CSS GLOBALES POUR ANIMATIONS ===
				':root': {
					'--transition-smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
					'--transition-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
					'--organic-red': '#dc3545',
					'--organic-red-hover': '#c82333',
					'--shadow-elegant': '0 8px 25px rgba(0, 0, 0, 0.15)',
					'--shadow-strong': '0 10px 30px rgba(0, 0, 0, 0.1)',
					// Variables CSS supplémentaires - FUSION
					'--c-accent': '#709425',
					'--c-subtitle': 'rgb(85, 85, 85)',
					'--c-text': '#555555',
					'--c-title': 'rgb(51, 51, 51)',
					'--divider': '#eceff1',
					'--font-body': '"Open Sans", Arial, sans-serif',
					'--font-styled': '"Open Sans", sans-serif',
					'--subtitle-line-height': '27px',
					'--subtitle-size': '23px',
					'--title-line-height': '31px',
					'--title-size': '27px',
				},

				// === LAYOUT ET STRUCTURE ===
				// Hide scrollbars but keep functionality
				'*': {
					msOverflowStyle: 'none', // IE and Edge
					scrollbarWidth: 'none', // Firefox
				},

				// === NORMALIZE CSS ===
				'*, *:before, *:after': { boxSizing: 'inherit' },

				'*::-webkit-scrollbar': {
					display: 'none', // Chrome, Safari, and Opera
				},

				// === Actions Bar style "This.png" ===
				'.actions-container': {
					// Styles gérés directement en inline dans le composant Material-UI
				},

				// Nom de l'auteur (grand titre)
				'.authorName': {
					color: '#555555',
					fontFamily: '"Open Sans"',
					fontSize: '27.2px',
					fontWeight: 300,
					lineHeight: '27.2px',
					margin: 0,
				},

				// Titre/Rôle de l'auteur (petit)
				'.authorRole': {
					color: '#555555',
					fontFamily: '"Open Sans"',
					fontSize: '16.32px',
					fontWeight: 300,
					lineHeight: '16.32px',
					margin: '.25rem 0 0',
				},

				// === PROFIL / BIO (sidebar) ===
				'.bioText': {
					color: '#555555',
					fontFamily: '"Open Sans"',
					fontSize: '15.2px',
					fontWeight: 300,
					lineHeight: '22.8px',
					margin: '0 auto 16px',
					maxWidth: '320px',
					textAlign: 'center',
				},
				// Sous-titre d'article (style exact Gatsby)
				'.blog-subtitle, .article-subtitle, .post-subtitle': {
					color: 'rgb(85, 85, 85) !important',
					fontFamily: '"Open Sans", sans-serif !important',
					fontSize: '23px !important',
					fontStyle: 'normal !important',
					fontWeight: '300 !important',
					lineHeight: '27px !important',
					margin: '0 0 1rem 0 !important',
				},

				// === TYPOGRAPHIE DES ARTICLES - Migration Gatsby ===
				// Titre principal d'article (style exact Gatsby)
				'.blog-title, .article-title, .post-title': {
					color: 'rgb(51, 51, 51) !important',
					fontFamily: '"Open Sans", sans-serif !important',
					fontSize: '27px !important',
					fontStyle: 'normal !important',
					fontWeight: '600 !important',
					lineHeight: '31px !important',
					margin: '0 0 0.5rem 0 !important',
				},

				'.builtGrid': {
					display: 'flex',
					flexWrap: 'wrap',
					gap: '10px',
					justifyContent: 'center',
					listStyle: 'none',
					margin: 0,
					padding: 0,
				},
				'.builtGrid a': {
					alignItems: 'center',
					background: '#fff',
					border: '1px solid #e3e6ea',
					borderRadius: '6px',
					display: 'flex',
					height: '32px',
					justifyContent: 'center',
					transition: 'all 0.2s ease-in-out',
					width: '32px',
				},

				'.builtGrid a:hover': {
					borderColor: 'var(--c-accent)',
					transform: 'translateY(-1px)',
				},

				'.builtGrid img': {
					height: '20px',
					objectFit: 'contain',
					width: '20px',
				},

				'.builtTitle': {
					color: '#888',
					fontFamily: '"Open Sans"',
					fontSize: '0.75rem',
					fontWeight: 400,
					letterSpacing: '.3em',
					margin: '0 0 .5rem',
					textAlign: 'center',
					textTransform: 'lowercase',
				},

				// === Built with section - pinned to bottom ===
				'.builtWith': {
					bottom: '18px',
					left: '24px',
					position: 'absolute',
					right: '24px',
					textAlign: 'center',
				},

				'.catBox': {
					background: '#fff',
					border: '1px solid #e5e8ed',
					borderRadius: '12px',
					minWidth: '260px',
					padding: '16px 20px',
				},
				'.catBox button': {
					background: '#fff',
					border: '1px solid #e5e8ed',
					borderRadius: '10px',
					cursor: 'pointer',
					padding: '8px 12px',
					textAlign: 'left',
					width: '100%',
				},

				'.catBox button.isActive': {
					borderColor: 'var(--c-accent)',
				},

				'.catBox li + li': {
					marginTop: '8px',
				},
				'.catBox ul': {
					listStyle: 'none',
					margin: 0,
					padding: 0,
				},
				'.catClose': {
					all: 'unset',
					cursor: 'pointer',
					float: 'right',
					margin: '-4px -4px 8px 0',
				},
				// === Category Filter Panel ===
				'.catDialog': {
					background: 'rgba(255,255,255,.96)',
					display: 'grid',
					inset: 0,
					placeItems: 'center',
					position: 'fixed',
					zIndex: 60,
				},
				// Column borders that respect margins
				'.column-border-left': {
					background: 'var(--divider)',
					bottom: '120px', // End above footer margin
					left: '380px', // Width of left sidebar + some margin
					position: 'absolute',
					top: '80px', // Start below the top margin (avatar level)
					width: '1px',
					zIndex: 1,
				},

				'.column-border-right': {
					background: 'var(--divider)',
					bottom: '120px', // End above footer margin
					position: 'absolute',
					right: '60px', // Account for right rail
					top: '80px', // Start below the top margin
					width: '1px',
					zIndex: 1,
				},
				// Layout container with proper margins for borders
				'.layout-container': {
					height: '100vh',
					overflow: 'hidden',
					position: 'relative',
				},

				// Main content with custom scrollbar
				'.main-content': {
					height: '100vh',
					overflowX: 'hidden',
					overflowY: 'auto',
					scrollbarColor: '#e0e0e0 transparent',
					/* Custom scrollbar for main content */
					scrollbarWidth: 'thin',
				},
				'.main-content::-webkit-scrollbar': {
					display: 'block', // Show scrollbar in main content
					width: '8px',
				},
				'.main-content::-webkit-scrollbar-thumb': {
					background: '#e0e0e0',
					borderRadius: '4px',
				},
				'.main-content::-webkit-scrollbar-thumb:hover': {
					background: '#d0d0d0',
				},
				'.main-content::-webkit-scrollbar-track': {
					background: 'transparent',
				},
				// === MENUS DE NAVIGATION ===
				'.navMenu a, .nav-item': {
					color: '#7a7a7a',
					fontFamily: '"Open Sans"',
					fontSize: '16px',
					fontWeight: 300,
					lineHeight: '18.4px',
					textDecoration: 'none',
					transition: 'color 0.2s ease',
				},
				'.navMenu a:hover, .nav-item:hover': {
					color: 'var(--c-accent)',
				},

				'.postItem': {
					alignItems: 'flex-start',
					borderBottom: 'none',
					display: 'flex',
					gap: '16px',
					padding: '24px 0',
				},

				'.postItemLink': {
					alignItems: 'flex-start',
					color: 'inherit',
					cursor: 'pointer',
					display: 'flex',
					gap: '16px',
					textDecoration: 'none',
					transition: 'all 0.3s ease',
					width: '100%',
				},
				'.postItemLink:hover .postThumb': {
					transform: 'rotate(-12deg)',
				},
				// === Liste d'articles façon Gatsby ===
				'.postList': {
					listStyle: 'none',
					margin: 0,
					padding: 0,
				},
				'.postMeta': {
					flex: '1 1 auto',
					minWidth: 0,
				},

				// === Liens de navigation entre articles ===
				'.postNavLink, .backToList': {
					color: '#000000',
					fontFamily: '"Open Sans"',
					fontSize: '16px',
					fontWeight: 400,
					lineHeight: '18.4px',
					textDecoration: 'none',
				},
				// Sous-titre (excerpt) de l'article dans la liste
				'.postSubtitle, .postExcerpt': {
					color: 'rgb(85, 85, 85) !important',
					fontFamily: '"Open Sans", sans-serif !important',
					fontSize: '23px !important',
					fontStyle: 'normal !important',
					fontWeight: '300 !important',
					lineHeight: '27px !important',
					margin: '.25rem 0 0 !important',
					transition: 'color 0.3s ease',
				},
				'.postThumb': {
					background: '#eee',
					border: 'none',
					borderRadius: '45px / 55px',
					flex: '0 0 75px',
					height: '85px',
					overflow: 'hidden',
					position: 'relative',
					transform: 'rotate(8deg)',
					transition: 'transform 0.4s ease-in-out',
					width: '75px',
				},
				'.postThumb img': {
					height: '100%',
					objectFit: 'cover',
					transform: 'rotate(-8deg) scale(1.1)',
					width: '100%',
				},
				// === LISTING D'ARTICLES ===
				// Titre d'article dans la liste
				'.postTitle': {
					color: 'rgb(51, 51, 51) !important',
					fontFamily: '"Open Sans", sans-serif !important',
					fontSize: '27px !important',
					fontStyle: 'normal !important',
					fontWeight: '600 !important',
					lineHeight: '31px !important',
					margin: '0 !important',
					textTransform: 'capitalize',
					transition: 'color 0.3s ease',
				},
				'.postTitle a': { 
					color: 'inherit', 
					textDecoration: 'none' 
				},
				'.profileAvatar': {
					border: '1px solid #ddd',
					borderRadius: '65% 75%',
					height: '72px',
					overflow: 'hidden',
					position: 'relative',
					width: '72px',
				},
				'.profileContent': {
					alignItems: 'center',
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: 'column',
					paddingBottom: '100px',
				},

				'.profileHeader': {
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					gap: '.5rem',
				},
				'.profileNav': {
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					gap: '12px',
				},
				// === Profile social icons ===
				'.profileSocial': {
					display: 'flex',
					gap: '12px',
					justifyContent: 'center',
					margin: '10px 0 22px',
				},
				'.profileSocial a': {
					alignItems: 'center',
					backgroundColor: '#f8f9fa',
					border: '1px solid #e9ecef',
					borderRadius: '50%',
					color: '#6c757d',
					display: 'flex',
					height: '36px',
					justifyContent: 'center',
					transition: 'all 0.2s ease',
					width: '36px',
				},
				'.profileSocial a:hover': {
					backgroundColor: 'var(--c-accent)',
					color: '#fff',
					transform: 'translateY(-2px)',
				},
				// === Search overlay light background ===
				'.searchOverlay': {
					background: 'rgba(255,255,255,.96)',
				},
				// === Profile sidebar ===
				'.sidebar': {
					display: 'flex',
					flexDirection: 'column',
					height: '100vh',
					overflow: 'visible',
					padding: '24px',
					position: 'relative',
				},
				'::-webkit-file-upload-button': {
					appearance: 'button',
					font: 'inherit',
				},
				":not(pre) > code[class*='language-']": {
					background: '#eee',
					borderRadius: '2px',
					color: '#666',
					padding: '1px 5px',
					textShadow: 'none',
				},
				// Variables CSS - CORRECTION TAILLES EXACTES - SUPPRIMÉ (FUSIONNÉ AVEC LE PREMIER BLOC)

				// Responsive: layout fluide
				'@media (max-width: 640px)': {
					'.postItem': {
						gap: '12px',
						padding: '16px 0',
					},
					'.postThumb': {
						borderRadius: '35px / 45px',
						flex: '0 0 60px',
						height: '70px',
						width: '60px',
					},
				},

				'[hidden]': { display: 'none' },
				'[type=checkbox], [type=radio]': {
					boxSizing: 'border-box',
					padding: 0,
				},
				'[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button':
					{ height: 'auto' },
				'[type=search]': {
					appearance: 'textfield',
					outlineOffset: '-2px',
				},
				'[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration':
					{ appearance: 'none' },
				a: {
					'&:hover': { color: '#6a9c1a' },
					background: 'transparent',
					color: 'var(--c-accent)',
					fontWeight: 'bold',
					textDecoration: 'none',
					textDecorationSkip: 'objects' as CSSProperties['textDecorationSkip'],
					transition: '0.3s',
				},
				'a:active, a:hover': { outlineWidth: 0 },
				'abbr[title]': {
					borderBottom: 'none',
					textDecoration: 'underline',
				},
				'article, aside, footer, header, nav, section, figcaption, figure, main':
					{ display: 'block' },
				'audio, video': { display: 'inline-block' },
				'audio:not([controls])': { display: 'none', height: 0 },
				'b, strong': { fontWeight: 'bolder' },
				// Par défaut (corps de texte)
				body: {
					background: '#ffffff',
					color: 'var(--c-text)',
					fontFamily: 'var(--font-body)',
					fontSize: '17.6px',
					fontWeight: 300,
					lineHeight: '28.16px',
					margin: 0,
					overflowX: 'hidden', // Hide horizontal scrollbar
					WebkitTapHighlightColor: 'rgba(0,0,0,.05)',
				},
				'button, [type=reset], [type=submit]': {
					WebkitAppearance: 'button' as CSSProperties['WebkitAppearance'],
				},
				'button, input': { overflow: 'visible' },
				'button, input, optgroup, select, textarea': {
					fontFamily: 'sans-serif',
					fontSize: '100%',
					lineHeight: '1.15',
					margin: 0,
				},
				'button, select': { textTransform: 'none' },
				'button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring':
					{ outline: '1px dotted ButtonText' },
				'button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner':
					{ borderStyle: 'none', padding: 0 },
				canvas: { display: 'inline-block' },
				'code, kbp, samp': {
					fontFamily: 'monospace, monospace',
					fontSize: '1em',
				},
				'details, menu': { display: 'block' },
				dfn: { fontStyle: 'italic' },
				fieldset: {
					border: '1px solid #c0c0c0',
					margin: [[0, '2px']],
					padding: [['0.35em', '0.625em', '0.75em']],
				},
				// === RESET ET NORMALISATION ===
				// Reset des styles par défaut des titres pour éviter les conflits
				'h1, h2, h3, h4, h5, h6': {
					fontFamily: 'inherit !important',
					fontSize: 'inherit !important',
					fontWeight: 'inherit !important',
					lineHeight: 'inherit !important',
					margin: '0 !important',
				},
				// h1 par défaut supprimé pour éviter les conflits avec nos styles d'articles
				// 'h1, h2, h3': { fontWeight: 300 }, // Supprimé également
				hr: {
					boxSizing: 'content-box',
					height: 0,
					overflow: 'visible',
				},
				// Base font setup
				html: {
					boxSizing: 'border-box',
					fontFamily: 'var(--font-body)',
					lineHeight: '1.15',
					MozTextSizeAdjust: 'none',
					msTextSizeAdjust: '100%',
					textSizeAdjust: '100%',
					WebkitTextSizeAdjust: '100%',
				},
				img: { borderStyle: 'none', verticalAlign: 'middle' },
				'input:-webkit-autofill': {
					WebkitBoxShadow: '0 0 0 50px white inset',
				},
				legend: {
					boxSizing: 'border-box',
					color: 'inherit',
					display: 'table',
					maxWidth: '100%',
					padding: 0,
					whiteSpace: 'normal',
				},
				main: { 
					overflowX: 'hidden',
					position: 'relative',
				},
				mark: { backgroundColor: '#ff0', color: '#000' },
				noscript: {
					background: '#d00',
					borderRadius: '2px',
					boxShadow: '0 0 10px 52px rgba(255,255,255,.8)',
					color: '#fff',
					fontWeight: 400,
					left: '50%',
					padding: '1.5rem 2.5rem',
					position: 'absolute',
					top: '50%',
					transform: 'translate(-50%, -50%)',
					zIndex: 1000,
				},
				pre: { fontFamily: 'monospace, monospace', fontSize: '1em' },
				progress: {
					display: 'inline-block',
					verticalAlign: 'baseline',
				},
				small: { fontSize: '80%' },
				sub: { bottom: '-0.25em' },
				'sub, sup': {
					fontSize: '75%',
					lineHeight: 0,
					position: 'relative',
					verticalAlign: 'baseline',
				},
				summary: { display: 'list-item' },
				sup: { top: '-0.5em' },
				'svg:not(:root)': { overflow: 'hidden' },
				template: { display: 'none' },
				textarea: { overflow: 'auto' },
			}}
		/>
	)
}
