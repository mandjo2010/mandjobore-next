import Link from 'next/link'
import { Box, Typography } from '@mui/material'

export default function PostCard({ post }) {
	const { slug, frontmatter } = post
	return (
		<Box
			sx={{
				mb: 3,
				pb: 2,
				borderBottom: '1px solid',
				borderColor: 'divider',
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
				<Typography variant='body2' sx={{ mt: 1 }}>
					{frontmatter.subTitle}
				</Typography>
			)}
			<Box sx={{ mt: 1 }}>
				<Link href={`/posts/${slug}`}>Read more →</Link>
			</Box>
		</Box>
	)
}
