import { Box, Drawer, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import * as React from 'react'

import CategoryFilter from '../sidebar/CategoryFilter'

interface MainLayoutProps {
	left: React.ReactNode
	right: React.ReactNode
	children: React.ReactNode
	categories?: string[]
	activeCategory?: string
	onCategoryChange?: (c?: string) => void
}

export default function MainLayout({
	activeCategory,
	categories = [],
	children,
	left,
	onCategoryChange,
	right,
}: MainLayoutProps) {
	const theme = useTheme() as Theme & import('@/types/theme').CustomTheme

	// States pour les interactions
	const [filterOpen, setFilterOpen] = React.useState(false)

	// Media queries
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))
	const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'))

	const handleCategoryChange = (value: string) => {
		onCategoryChange?.(value || undefined)
		setFilterOpen(false)
	}

	return (
		<Box
			sx={{
				bgcolor: theme?.base?.colors?.background ?? 'background.default',
				display: 'flex',
				height: '100vh',
				overflow: 'hidden',
			}}
		>
			{/* Colonne gauche: ProfileSidebar - 320px, visible sur md+ */}
			{isMediumScreen && (
				<Box
					component="aside"
					sx={{
						bgcolor: theme?.info?.colors?.background ?? 'background.paper',
						borderRight: `1px solid ${theme?.base?.colors?.lines ?? '#eee'}`,
						flexShrink: 0,
						height: '100vh',
						overflow: 'visible', // Remove scrollbar
						p: 2,
						position: 'sticky',
						top: 0,
						width: 320,
					}}
				>
					{left}
				</Box>
			)}

			{/* Colonne centrale: Contenu principal */}
			<Box
				component="main"
				sx={{
					// Styles pour le contenu markdown
					'& h1': {
						color: theme?.main?.colors?.contentHeading ?? '#333',
						fontSize: `${theme?.main?.fonts?.contentHeading?.h2Size ?? 2.2}rem`,
						fontWeight: theme?.main?.fonts?.contentHeading?.weight ?? 700,
						lineHeight: theme?.main?.fonts?.contentHeading?.lineHeight ?? 1.2,
						mb: 2,
						mt: 0,
					},
					'& h2': {
						color: theme?.main?.colors?.contentHeading ?? '#333',
						fontSize: `${theme?.main?.fonts?.contentHeading?.h2Size ?? 1.8}rem`,
						fontWeight: theme?.main?.fonts?.contentHeading?.weight ?? 600,
						lineHeight: theme?.main?.fonts?.contentHeading?.lineHeight ?? 1.25,
						mb: 1,
						mt: 3,
					},
					'& h3': {
						color: theme?.main?.colors?.contentHeading ?? '#333',
						fontSize: `${theme?.main?.fonts?.contentHeading?.h3Size ?? 1.3}rem`,
						fontWeight: theme?.main?.fonts?.contentHeading?.weight ?? 600,
						lineHeight: theme?.main?.fonts?.contentHeading?.lineHeight ?? 1.3,
						mb: 1,
						mt: 2,
					},
					'& img': {
						height: 'auto',
						maxWidth: '100%',
					},
					'& p, & li': {
						fontSize: `${theme?.main?.fonts?.content?.size ?? 1}rem`,
						lineHeight: theme?.main?.fonts?.content?.lineHeight ?? 1.6,
						[theme.breakpoints.up('lg')]: {
							fontSize: `${theme?.main?.fonts?.content?.sizeL ?? 1.1}rem`,
						},
						[theme.breakpoints.up('md')]: {
							fontSize: `${theme?.main?.fonts?.content?.sizeM ?? 1.15}rem`,
						},
					},
					bgcolor: theme?.main?.colors?.background ?? 'background.paper',
					borderRight: isLargeScreen
						? `1px solid ${theme?.base?.colors?.lines ?? '#eee'}`
						: 'none',
					color: theme?.main?.colors?.content ?? 'text.primary',
					flex: 1,
					height: '100vh',
					overflowY: 'auto',
					position: 'relative',
					px: { md: 3, xs: 2 },
					py: 2,
				}}
			>
				{children}
			</Box>

			{/* Colonne droite: Actions Bar - 64px fixe, visible sur lg+ */}
			{isLargeScreen && (
				<Box
					component="aside"
					sx={{
						bgcolor: theme?.info?.colors?.background ?? 'background.paper',
						flexShrink: 0,
						height: '100vh',
						width: 64,
					}}
				>
					{right}
				</Box>
			)}

			{/* Drawer pour le filtre de catégories */}
			<Drawer
				anchor="right"
				open={filterOpen}
				onClose={() => setFilterOpen(false)}
				PaperProps={{
					sx: {
						bgcolor: theme?.info?.colors?.background ?? 'background.paper',
						width: 280,
					},
				}}
			>
				<CategoryFilter
					categories={categories}
					selected={activeCategory}
					onChange={handleCategoryChange}
				/>
			</Drawer>

			{/* Search overlay au niveau layout */}
			{/* <SearchOverlay posts={searchPosts} /> */}
		</Box>
	)
}
