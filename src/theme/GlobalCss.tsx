import { GlobalStyles, useTheme } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import type { CSSProperties } from 'react'

export default function GlobalCss() {
	const theme = useTheme() as Theme & import('@/types/theme').CustomTheme
	return (
		<GlobalStyles
			styles={{
				/* === NORMALIZE extrait de ton globals.js === */
				'article, aside, footer, header, nav, section, figcaption, figure, main':
					{ display: 'block' },
				h1: { fontSize: '2em', margin: [['0.67em', 0]] },
				hr: {
					boxSizing: 'content-box',
					height: 0,
					overflow: 'visible',
				},
				pre: { fontFamily: 'monospace, monospace', fontSize: '1em' },
				'a:active, a:hover': { outlineWidth: 0 },
				'abbr[title]': {
					borderBottom: 'none',
					textDecoration: 'underline',
				},
				'b, strong': { fontWeight: 'bolder' },
				'code, kbp, samp': {
					fontFamily: 'monospace, monospace',
					fontSize: '1em',
				},
				dfn: { fontStyle: 'italic' },
				mark: { backgroundColor: '#ff0', color: '#000' },
				small: { fontSize: '80%' },
				'sub, sup': {
					fontSize: '75%',
					lineHeight: 0,
					position: 'relative',
					verticalAlign: 'baseline',
				},
				sup: { top: '-0.5em' },
				sub: { bottom: '-0.25em' },
				'audio, video': { display: 'inline-block' },
				'audio:not([controls])': { display: 'none', height: 0 },
				img: { borderStyle: 'none', verticalAlign: 'middle' },
				'svg:not(:root)': { overflow: 'hidden' },
				'button, input, optgroup, select, textarea': {
					fontFamily: 'sans-serif',
					fontSize: '100%',
					lineHeight: '1.15',
					margin: 0,
				},
				'button, input': { overflow: 'visible' },
				'button, select': { textTransform: 'none' },
				'button, [type=reset], [type=submit]': {
					WebkitAppearance: 'button' as CSSProperties['WebkitAppearance'],
				},
				'button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner':
					{ borderStyle: 'none', padding: 0 },
				'button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring':
					{ outline: '1px dotted ButtonText' },
				fieldset: {
					border: '1px solid #c0c0c0',
					margin: [[0, '2px']],
					padding: [['0.35em', '0.625em', '0.75em']],
				},
				legend: {
					boxSizing: 'border-box',
					color: 'inherit',
					display: 'table',
					maxWidth: '100%',
					padding: 0,
					whiteSpace: 'normal',
				},
				progress: {
					display: 'inline-block',
					verticalAlign: 'baseline',
				},
				textarea: { overflow: 'auto' },
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
				'::-webkit-file-upload-button': {
					appearance: 'button',
					font: 'inherit',
				},
				'details, menu': { display: 'block' },
				summary: { display: 'list-item' },
				canvas: { display: 'inline-block' },
				template: { display: 'none' },
				'[hidden]': { display: 'none' },

				/* === TES styles globaux custom === */
				html: {
					boxSizing: 'border-box',
					WebkitTextSizeAdjust: '100%',
					MozTextSizeAdjust: 'none',
					msTextSizeAdjust: '100%',
					fontFamily: theme.base.fonts.unstyledFamily,
					lineHeight: '1.15',
					textSizeAdjust: '100%',
				},
				'html.wf-active': { fontFamily: theme.base.fonts.styledFamily },
				'*, *:before, *:after': { boxSizing: 'inherit' },
				noscript: {
					background: '#d00',
					color: '#fff',
					position: 'absolute',
					top: '50%',
					left: '50%',
					zIndex: 1000,
					transform: 'translate(-50%, -50%)',
					padding: '1.5rem 2.5rem',
					fontWeight: 400,
					borderRadius: '2px',
					boxShadow: '0 0 10px 52px rgba(255,255,255,.8)',
				},
				body: {
					margin: 0,
					background: theme.base.colors.background,
					WebkitTapHighlightColor: 'rgba(0,0,0,.05)',
				},
				main: { position: 'relative' },
				'h1, h2, h3': { fontWeight: 300 },
				a: {
					background: 'transparent',
					textDecorationSkip: 'objects' as CSSProperties['textDecorationSkip'],
					fontWeight: 'bold',
					textDecoration: 'none',
					transition: '0.3s',
					color: theme.base.colors.link,
					'&:hover': { color: theme.base.colors.linkHover },
				},
				'input:-webkit-autofill': {
					WebkitBoxShadow: '0 0 0 50px white inset',
				},
				":not(pre) > code[class*='language-']": {
					background: '#eee',
					color: '#666',
					textShadow: 'none',
					padding: '1px 5px',
					borderRadius: '2px',
				},
			}}
		/>
	)
}
