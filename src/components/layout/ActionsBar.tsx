import {
	Home,
	FilterList,
	Search,
	Fullscreen,
	FullscreenExit,
} from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import * as React from 'react'

type Props = {
	onHome?: () => void
	onToggleFilter?: () => void
	onSearch?: () => void
	onToggleExpand?: () => void
	expanded?: boolean
}

export default function ActionsBar({
	expanded = false,
	onHome,
	onSearch,
	onToggleExpand,
	onToggleFilter,
}: Props) {
	const t = useTheme() as Theme & import('@/types/theme').CustomTheme

	const barBg = t?.bars?.colors?.background ?? 'background.paper'
	const iconColor = t?.bars?.colors?.icon ?? 'text.secondary'
	const iconHover = t?.bars?.colors?.text ?? 'text.primary'
	const borderCol = t?.base?.colors?.lines ?? '#eee'

	return (
		<Box
			role="navigation"
			aria-label="Actions principales"
			sx={{
				alignItems: 'center',
				bgcolor: barBg,
				borderLeft: `1px solid ${borderCol}`,
				display: { lg: 'flex', xs: 'none' }, // Caché en < 1024px
				flexDirection: 'column',
				gap: 3,
				height: '100vh',
				justifyContent: 'center',
				position: 'fixed',
				right: 0,
				top: 0,
				width: '56px',
				zIndex: 10,
			}}
		>
			<Tooltip title="Accueil" placement="left">
				<IconButton
					aria-label="Aller à l'accueil"
					size="medium"
					onClick={onHome}
					sx={{ 
						'&:hover': { color: iconHover },
						color: iconColor,
					}}
				>
					<Home />
				</IconButton>
			</Tooltip>

			<Tooltip title="Filtrer par catégorie" placement="left">
				<IconButton
					aria-label="Catégories"
					data-testid="category-button"
					size="medium"
					onClick={onToggleFilter}
					sx={{ 
						'&:hover': { color: iconHover },
						color: iconColor,
					}}
				>
					<FilterList />
				</IconButton>
			</Tooltip>

			<Tooltip title="Rechercher" placement="left">
				<IconButton
					aria-label="Rechercher"
					data-testid="search-button"
					size="medium"
					onClick={onSearch}
					sx={{ 
						'&:hover': { color: iconHover },
						color: iconColor,
					}}
				>
					<Search />
				</IconButton>
			</Tooltip>

			<Tooltip title={expanded ? "Réduire" : "Étendre"} placement="left">
				<IconButton
					aria-label={expanded ? "Réduire l'affichage" : "Étendre l'affichage"}
					size="medium"
					onClick={onToggleExpand}
					sx={{ 
						'&:hover': { color: iconHover },
						color: iconColor,
					}}
				>
					{expanded ? <FullscreenExit /> : <Fullscreen />}
				</IconButton>
			</Tooltip>
		</Box>
	)
}
