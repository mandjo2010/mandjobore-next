import * as React from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'

export default function ScrollProgress() {
	const t = useTheme() as Theme & import('@/types/theme').CustomTheme
	const [pct, setPct] = React.useState(0)

	React.useEffect(() => {
		const onScroll = () => {
			const sc = window.scrollY
			const h = document.documentElement.scrollHeight - window.innerHeight
			setPct(h > 0 ? Math.min(1, sc / h) : 0)
		}
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<Box
			aria-hidden
			sx={{
				position: 'fixed',
				right: { xs: 44, md: 56 },
				top: { xs: 88, md: 96 },
				height: {
					xs: 'calc(100vh - 160px)',
					md: 'calc(100vh - 180px)',
				},
				width: 2,
				backgroundColor: t.base.colors.lines,
				borderRadius: 2,
				zIndex: 1,
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					left: 0,
					bottom: 0,
					width: 2,
					borderRadius: 2,
					height: `calc(${pct * 100}% + 1px)`,
					backgroundColor: t.base.colors.accent,
				}}
			/>
		</Box>
	)
}
