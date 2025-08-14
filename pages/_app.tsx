import createCache from '@emotion/cache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import { Open_Sans } from 'next/font/google'
import Head from 'next/head'
import * as React from 'react'

import { useFontSizeController } from '../src/hooks/useFontSizeController'
import GlobalCss from '../src/theme/GlobalCss'
import '../src/styles/typography.css'
import '../src/styles/font-size.css'

const openSans = Open_Sans({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-open-sans',
	weight: ['300', '400', '600'],
})

const theme = createTheme({
	typography: {
		fontFamily: '"Open Sans", Arial, sans-serif',
	},
})

const createEmotionCache = () => createCache({ key: 'css', prepend: true })
const clientSideEmotionCache = createEmotionCache()

// Composant wrapper pour utiliser le hook
function AppWrapper({ Component, pageProps }: { Component: React.ComponentType<any>; pageProps: Record<string, unknown> }) {
	// Applique la taille de police au niveau global
	useFontSizeController();
	
	return <Component {...pageProps} />;
}

export default function MyApp(props: {
	Component: React.ComponentType<any> // eslint-disable-line @typescript-eslint/no-explicit-any
	pageProps: Record<string, unknown>
	emotionCache?: EmotionCache
}) {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta
					name='viewport'
					content='initial-scale=1, width=device-width'
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<GlobalCss />
				<main className={openSans.className}>
					<AppWrapper Component={Component} pageProps={pageProps} />
				</main>
			</ThemeProvider>
		</CacheProvider>
	)
}
