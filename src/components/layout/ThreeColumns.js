import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const Shell = styled('div')(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: '320px 1fr 320px',
	gap: '24px',
	maxWidth: '1280px',
	margin: '0 auto',
	padding: '24px',
	[theme.breakpoints.down(theme.custom.mediaQueryTresholds.L)]: {
		gridTemplateColumns: '280px 1fr 280px',
	},
	[theme.breakpoints.down('md')]: {
		gridTemplateColumns: '1fr',
	},
}))

export const LeftCol = styled(Box)(() => ({
	position: 'sticky',
	top: 0,
	alignSelf: 'start',
}))

export const CenterCol = styled(Box)(({ theme }) => ({
	maxWidth: theme.custom.main.sizes.articleMaxWidth,
	width: '100%',
	margin: '0 auto',
}))

export const RightCol = styled(Box)(() => ({
	position: 'sticky',
	top: 0,
	alignSelf: 'start',
}))

export default function ThreeColumns({ left, center, right }) {
	return (
		<Shell>
			<LeftCol component='aside' aria-label='Left sidebar'>
				{left}
			</LeftCol>
			<CenterCol component='main' aria-label='Main content'>
				{center}
			</CenterCol>
			<RightCol component='aside' aria-label='Right sidebar'>
				{right}
			</RightCol>
		</Shell>
	)
}
