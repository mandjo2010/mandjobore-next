import { Avatar, Stack } from '@mui/material'

export default function PostAuthor({
	html,
	name,
	avatarSrc,
}: {
	html: string
	name: string
	avatarSrc: string
}) {
	return (
		<Stack
			direction={{ xs: 'column', sm: 'row' }}
			spacing={2}
			alignItems='center'
			sx={{ mt: 6, pt: 4, borderTop: '1px solid #ddd' }}
		>
			<Avatar
				src={avatarSrc}
				alt={name}
				sx={{
					width: 60,
					height: 60,
					border: '1px solid #ddd',
					borderRadius: '65% 75%',
				}}
			/>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</Stack>
	)
}
