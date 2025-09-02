   import Link from 'next/link'
import { Box, Typography } from '@mui/material'

export default function PostCard({ post }) {
	const { slug, frontmatter } = post
	return (
		<Box
			sx={{
				mb: 1.5,
				pb: 1,
			}}
		>
			<Link href={`/posts/${slug}`}>
				<Typography variant='h6'>{frontmatter.title}</Typography>
			</Link>
			{frontmatter.date && (
				<Typography variant='caption' sx={{ color: 'text.secondary' }}>
					{frontmatter.date}
				</Typography>
			)}
			{frontmatter.subTitle && (
				<Typography 
					component="h2"
					className="blog-subtitle article-subtitle post-subtitle"
					sx={{ 
						mt: 1,
						fontFamily: '"Open Sans" !important',
						fontSize: '23px !important',
						fontWeight: '300 !important',
						lineHeight: '27px !important',
						color: 'rgb(85, 85, 85) !important',
						fontStyle: 'normal !important',
						cursor: 'pointer',
						'&:hover': {
							color: 'rgb(112, 148, 37) !important'
						}
					}}
				>
					{frontmatter.subTitle}
				</Typography>
			)}
			<Box sx={{ mt: 1 }}>
				<Link href={`/posts/${slug}`}>Read more →</Link>
			</Box>
		</Box>
	)
}
