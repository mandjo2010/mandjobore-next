import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import * as React from 'react'

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
				backgroundColor: t.base.colors.lines,
				borderRadius: 2,
				height: {
					md: 'calc(100vh - 180px)',
					xs: 'calc(100vh - 160px)',
				},
				position: 'fixed',
				right: { md: 56, xs: 44 },
				top: { md: 96, xs: 88 },
				width: 2,
				zIndex: 1,
			}}
		>
			<Box
				sx={{
					backgroundColor: t.base.colors.accent,
					borderRadius: 2,
					bottom: 0,
					height: `calc(${pct * 100}% + 1px)`,
					left: 0,
					position: 'absolute',
					width: 2,
				}}
			/>
		</Box>
	)
}
