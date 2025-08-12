import * as React from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import {
	Home,
	FilterList,
	Search,
	Fullscreen,
	FullscreenExit,
} from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'

type Props = {
	onHome?: () => void
	onToggleFilter?: () => void
	onSearch?: () => void
	onToggleExpand?: () => void
	expanded?: boolean
}

export default function ActionsBar({
	onHome,
	onToggleFilter,
	onSearch,
	onToggleExpand,
	expanded = false,
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
				position: 'fixed',
				right: 0,
				top: 0,
				height: '100vh',
				width: '56px',
				display: { xs: 'none', lg: 'flex' }, // Caché en < 1024px
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 3,
				bgcolor: barBg,
				borderLeft: `1px solid ${borderCol}`,
				zIndex: 10,
			}}
		>
			<Tooltip title="Accueil" placement="left">
				<IconButton
					aria-label="Aller à l'accueil"
					size="medium"
					onClick={onHome}
					sx={{ 
						color: iconColor,
						'&:hover': { color: iconHover },
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
						color: iconColor,
						'&:hover': { color: iconHover },
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
						color: iconColor,
						'&:hover': { color: iconHover },
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
						color: iconColor,
						'&:hover': { color: iconHover },
					}}
				>
					{expanded ? <FullscreenExit /> : <Fullscreen />}
				</IconButton>
			</Tooltip>
		</Box>
	)
}
