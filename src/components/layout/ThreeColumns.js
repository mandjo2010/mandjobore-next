import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

export const Shell = styled('div')(({ theme }) => ({
	display: 'grid',
	gap: '24px',
	gridTemplateColumns: '320px 1fr 320px',
	margin: '0 auto',
	maxWidth: '1280px',
	padding: '24px',
	[theme.breakpoints.down('md')]: {
		gridTemplateColumns: '1fr',
	},
	[theme.breakpoints.down(theme.custom.mediaQueryTresholds.L)]: {
		gridTemplateColumns: '280px 1fr 280px',
	},
}))

export const LeftCol = styled(Box)(() => ({
	alignSelf: 'start',
	position: 'sticky',
	top: 0,
}))

export const CenterCol = styled(Box)(({ theme }) => ({
	margin: '0 auto',
	maxWidth: theme.custom.main.sizes.articleMaxWidth,
	width: '100%',
}))

export const RightCol = styled(Box)(() => ({
	alignSelf: 'start',
	position: 'sticky',
	top: 0,
}))

export default function ThreeColumns({ center, left, right }) {
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
