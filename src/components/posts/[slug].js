import ThreeColumns from '../../src/components/layout/ThreeColumns'
import LeftSidebar from '../../src/components/sidebar/LeftSidebar'
import RightActions from '../../src/components/sidebar/RightActions'
import { getAllPosts, getPostBySlug } from '../../lib/content'
import { Box, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function PostDetail({ post }) {
	const { slug, frontmatter, content } = post

	// chemin public des images relatives
	const imagesBase = `/content/posts/${slug}/`

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
							a: ({ href = '', children }) => (
								<a
									href={href}
									target={
										href.startsWith('http')
											? '_blank'
											: undefined
									}
									rel='noreferrer'
								>
									{children}
								</a>
							),
						}}
					>
						{content}
					</ReactMarkdown>
				</Box>
			}
			right={
				<RightActions
					onBack={() => window.location.assign('/')}
					onSearch={() => {}}
					onFullscreen={() =>
						document.documentElement.requestFullscreen?.()
					}
					onScrollTop={() =>
						window.scrollTo({ top: 0, behavior: 'smooth' })
					}
					showFontSize
				/>
			}
		/>
	)
}

export async function getStaticPaths() {
	const posts = getAllPosts()
	return {
		paths: posts.map((p) => ({ params: { slug: p.slug } })),
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const post = getPostBySlug(params.slug)
	return { props: { post } }
}
