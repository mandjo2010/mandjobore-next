import Head from 'next/head'
import * as React from 'react'

// import { useFontSizeController } from '../src/hooks/useFontSizeController'
import '../src/styles/typography.css'
import '../src/styles/font-size.css'
import '../src/styles/layout.css' // CSS de layout absolue
import '../src/styles/gatsby-theme.css' // Variables et styles du thème Gatsby
import '../src/styles/scrollbar-hidden.css' // Masquage complet des barres de défilement

// Composant wrapper pour utiliser le hook
function AppWrapper({ Component, pageProps }: { Component: React.ComponentType<any>; pageProps: Record<string, unknown> }) {
	// useFontSizeController();
	
	return <Component {...pageProps} />;
}

export default function MyApp(props: {
	Component: React.ComponentType<any> // eslint-disable-line @typescript-eslint/no-explicit-any
	pageProps: Record<string, unknown>
}) {
	const { Component, pageProps } = props
	
	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='initial-scale=1, width=device-width'
				/>
			</Head>
			<main style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}>
				<AppWrapper Component={Component} pageProps={pageProps} />
			</main>
		</>
	)
}
