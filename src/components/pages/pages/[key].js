import ThreeColumns from '../../src/components/layout/ThreeColumns'
import LeftSidebar from '../../src/components/sidebar/LeftSidebar'
import RightActions from '../../src/components/sidebar/RightActions'
import { getAllPages, getPageByKey } from '../../lib/content'
import { Box, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function PageDetail({ page }) {
	const { key, frontmatter, content } = page
	const imagesBase = `/content/pages/${key}/`

	return (
		<ThreeColumns
			left={<LeftSidebar />}
			center={
				<Box sx={{ maxWidth: '50em', mx: 'auto' }}>
					<Typography variant='h4' sx={{ mb: 1 }}>
						{frontmatter.title}
					</Typography>
					{frontmatter.subTitle && (
						<Typography variant='h6' sx={{ mb: 2 }}>
							{frontmatter.subTitle}
						</Typography>
					)}
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						components={{
							img: ({ src = '', alt }) => (
								<img
									src={
										src.startsWith('http')
											? src
											: imagesBase + src.replace('./', '')
									}
									alt={alt}
									style={{ maxWidth: '100%' }}
								/>
							),
						}}
					>
						{content}
					</ReactMarkdown>
				</Box>
			}
			right={
				<RightActions
					onBack={() => window.history.back()}
					onSearch={() => {}}
					onFullscreen={() =>
						document.documentElement.requestFullscreen?.()
					}
					onScrollTop={() =>
						window.scrollTo({ top: 0, behavior: 'smooth' })
					}
				/>
			}
		/>
	)
}

export async function getStaticPaths() {
	const pages = getAllPages()
	return {
		paths: pages.map((p) => ({ params: { key: p.key } })),
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const page = getPageByKey(params.key)
	return { props: { page } }
}
