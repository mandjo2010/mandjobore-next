import * as React from 'react'
import Link from 'next/link'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'

type NavLink = { label: string; href: string }

const NAV: NavLink[] = [
	{ label: 'About', href: '/pages/1--about' }, // mappe les contenus présents
	{ label: 'Cartography', href: '/pages/2--starters' },
	// { label: "Portfolio", href: "/pages/portfolio" }, // ajoute quand tu auras la page
	// { label: "Contact", href: "/pages/contact" },
]

export default function Header() {
	const t = useTheme() as Theme & import('@/types/theme').CustomTheme

	return (
		<Box
			component='header'
			sx={{
				height: t.bars.sizes.infoBar,
				color: t.bars.colors.text,
				bgcolor: t.bars.colors.background,
				borderBottom: `1px solid ${t.base.colors.lines}`,
			}}
		>
			<Container
				maxWidth='lg'
				sx={{ height: 1, display: 'flex', alignItems: 'center' }}
			>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					sx={{ width: 1 }}
				>
					<Typography sx={{ fontWeight: 600 }}>
						Mandjo&nbsp;Béa&nbsp;Boré
						<Typography
							component='span'
							sx={{
								ml: 1,
								color: t.main.colors.meta,
								fontSize: 14,
							}}
						>
							Data analyst · Developer
						</Typography>
					</Typography>

					<Stack
						direction='row'
						spacing={3}
						sx={{ a: { fontWeight: 600 } }}
					>
						{NAV.map((n) => (
							<Link
								key={n.label}
								href={n.href}
								style={{ color: t.bars.colors.text }}
							>
								{n.label}
							</Link>
						))}
					</Stack>
				</Stack>
			</Container>
		</Box>
	)
}
