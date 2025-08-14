import { IconButton, Tooltip } from '@mui/material'
import { ExpandIcon, FilterIcon, HomeIcon, SearchIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import * as React from 'react'

export default function RightSidebar() {
	const router = useRouter()
	
	const [expanded, setExpanded] = React.useState(false)

	const handleHome = () => {
		router.push('/')
	}

	const handleFilter = () => {
		console.log('Filter clicked')
	}

	const handleSearch = () => {
		console.log('Search clicked')
	}

	const handleExpand = () => {
		setExpanded((prev) => !prev)
	}

	const iconButtonStyles = {
		'&:hover': {
			bgcolor: 'rgba(132, 204, 22, 0.1)', // lime-500 with opacity
			color: '#84cc16', // lime-500
		},
		borderRadius: 2,
		color: '#6B7280', // text.secondary
		height: 48,
		transition: 'all 0.2s ease-in-out',
		width: 48,
	}

	return (
		<aside className="rightRail" aria-label="Actions">
			<div className="rightRailTop">
				{/* Accueil / Filtrer / Rechercher */}
				<Tooltip title="Accueil" placement="left">
					<IconButton
						onClick={handleHome}
						sx={iconButtonStyles}
						aria-label="Aller à l'accueil"
					>
						<HomeIcon size={20} />
					</IconButton>
				</Tooltip>

				<Tooltip title="Filtrer" placement="left">
					<IconButton
						onClick={handleFilter}
						sx={iconButtonStyles}
						aria-label="Filtrer les articles"
					>
						<FilterIcon size={20} />
					</IconButton>
				</Tooltip>

				<Tooltip title="Rechercher" placement="left">
					<IconButton
						onClick={handleSearch}
						sx={iconButtonStyles}
						aria-label="Rechercher"
					>
						<SearchIcon size={20} />
					</IconButton>
				</Tooltip>
			</div>

			<div className="rightRailBottom">
				{/* Bouton agrandir / fullscreen */}
				<Tooltip title={expanded ? "Réduire" : "Agrandir"} placement="left">
					<IconButton
						onClick={handleExpand}
						sx={{
							...iconButtonStyles,
							backgroundColor: expanded ? 'rgba(132, 204, 22, 0.1)' : 'transparent',
							color: expanded ? '#84cc16' : '#6B7280',
						}}
						aria-label={expanded ? "Réduire l'affichage" : "Agrandir l'affichage"}
					>
						<ExpandIcon size={20} />
					</IconButton>
				</Tooltip>
			</div>
		</aside>
	)
}
