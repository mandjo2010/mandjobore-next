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
					<Typography 
						component='h1'
						className='blog-title'
						sx={{ 
							fontFamily: '"Open Sans" !important',
							fontStyle: 'normal !important',
							fontWeight: '600 !important',
							fontSize: '27px !important',
							lineHeight: '31px !important',
							color: 'rgb(51, 51, 51) !important',
							margin: '0 0 0.5rem 0 !important',
						}}
					>
						{frontmatter.title}
					</Typography>
					{frontmatter.subTitle && (
						<Typography 
							component='h2'
							className='blog-subtitle'
							sx={{ 
								fontFamily: '"Open Sans" !important',
								fontStyle: 'normal !important',
								fontWeight: '300 !important',
								fontSize: '23px !important',
								lineHeight: '27px !important',
								color: 'rgb(85, 85, 85) !important',
								margin: '0 0 1rem 0 !important',
							}}
						>
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
