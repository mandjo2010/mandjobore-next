import * as React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'
import createCache from '@emotion/cache'
import createEmotionServer from '@emotion/server/create-instance'

function createEmotionCache() {
	return createCache({ key: 'css', prepend: true })
}

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='fr'>
				<Head>
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link
						rel='preconnect'
						href='https://fonts.gstatic.com'
						crossOrigin=''
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap'
						rel='stylesheet'
					/>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
	const originalRenderPage = ctx.renderPage
	const cache = createEmotionCache()
	const { extractCriticalToChunks } = createEmotionServer(cache)

	ctx.renderPage = () =>
		originalRenderPage({
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			enhanceApp: (App: any) =>
				function EnhanceApp(props) {
					return <App emotionCache={cache} {...props} />
				},
		})

	const initialProps = await Document.getInitialProps(ctx)
	const emotionStyles = extractCriticalToChunks(initialProps.html)
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	))

	return {
		...initialProps,
		styles: (
			<>
				{initialProps.styles}
				{emotionStyleTags}
			</>
		),
	}
}
