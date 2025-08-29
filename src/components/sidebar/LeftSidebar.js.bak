import Link from 'next/link'
import { Box, Typography, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

const Title = styled(Typography)(({ _theme }) => ({
	fontWeight: 700,
	marginTop: 8,
}))

export default function LeftSidebar() {
	return (
		<Box>
			<Title variant='h6'>Mandjo Béa Boré</Title>
			<Typography
				variant='body2'
				sx={{ color: (t) => t.custom.info.colors.text }}
			>
				Data analyst - Developer
			</Typography>

			<Box sx={{ mt: 2 }}>
				<Stack spacing={0.5}>
					<Link href='/pages/1--about'>About</Link>
					<Link href='/pages/2--starters'>Cartography</Link>
					<Link href='/portfolio'>Portfolio</Link>
					<Link href='/project'>Project</Link>
					<Link href='/contact'>Contact</Link>
				</Stack>
			</Box>

			<Box sx={{ mt: 3 }}>
				<Typography variant='overline' sx={{ color: 'text.secondary' }}>
					LIST OF POSTS
				</Typography>
				<Box sx={{ mt: 1 }}>
					<button>Expand the list</button>
				</Box>
			</Box>
		</Box>
	)
}
