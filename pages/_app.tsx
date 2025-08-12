import * as React from 'react'
import Head from 'next/head'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createCache from '@emotion/cache'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from '../src/theme'
import GlobalCss from '../src/theme/GlobalCss'

const createEmotionCache = () => createCache({ key: 'css', prepend: true })
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props: {
	Component: React.ComponentType<any> // eslint-disable-line @typescript-eslint/no-explicit-any
	pageProps: Record<string, unknown>
	emotionCache?: EmotionCache
}) {
	const {
		Component,
		pageProps,
		emotionCache = clientSideEmotionCache,
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
				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	)
}
