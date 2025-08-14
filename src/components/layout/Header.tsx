import { Box, Container, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import Link from 'next/link'
import * as React from 'react'

type NavLink = { label: string; href: string }

const NAV: NavLink[] = [
	{ href: '/pages/1--about', label: 'About' }, // mappe les contenus présents
	{ href: '/pages/2--starters', label: 'Cartography' },
	// { label: "Portfolio", href: "/pages/portfolio" }, // ajoute quand tu auras la page
	// { label: "Contact", href: "/pages/contact" },
]

export default function Header() {
	const t = useTheme() as Theme & import('@/types/theme').CustomTheme

	return (
		<Box
			component='header'
			sx={{
				bgcolor: t.bars.colors.background,
				borderBottom: `1px solid ${t.base.colors.lines}`,
				color: t.bars.colors.text,
				height: t.bars.sizes.infoBar,
			}}
		>
			<Container
				maxWidth='lg'
				sx={{ alignItems: 'center', display: 'flex', height: 1 }}
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
								color: t.main.colors.meta,
								fontSize: 14,
								ml: 1,
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
