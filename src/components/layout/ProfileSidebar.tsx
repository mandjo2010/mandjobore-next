import * as React from 'react'
import Link from 'next/link'
import {
	Box,
	Typography,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Avatar,
	Divider,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import type { Post } from '@/types'

export type ProfileSidebarProps = {
	onPostsListToggle?: () => void
	showPostsList?: boolean
	posts?: Post[]
	defaultCollapsed?: boolean
}

export default function ProfileSidebar({
	onPostsListToggle,
	showPostsList = false,
	posts = [],
	defaultCollapsed = false,
}: ProfileSidebarProps) {
	const [collapsed, setCollapsed] = React.useState<boolean>(!!defaultCollapsed)

	const toggleBox = () => setCollapsed((v) => !v)
	const toggleList = () => onPostsListToggle?.()

	return (
		<Box
			component='aside'
			sx={{
				position: 'sticky',
				top: 0,
				height: '100dvh',
				display: 'flex',
				flexDirection: 'column',
				borderRight: '1px solid',
				borderColor: 'divider',
				px: 2,
				py: 2,
				minWidth: 280,
				bgcolor: 'background.paper',
			}}
		>
			{/* Header avec avatar + titre + bouton “Expand the box” */}
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
				<Avatar
					// TODO: remplace la source par ton avatar réel si besoin
					src=''
					alt='Mandjo Béa Boré'
					sx={{
						width: 48,
						height: 48,
						borderRadius: '65% 75%',
						border: '1px solid',
						borderColor: 'divider',
					}}
				/>
				<Box sx={{ flex: 1, minWidth: 0 }}>
					<Typography variant='h6' sx={{ lineHeight: 1.1 }} noWrap>
						Mandjo Béa Boré
					</Typography>
					<Typography variant='caption' color='text.secondary' noWrap>
						GeoDeveloper & GeoDesigner
					</Typography>
				</Box>
				<IconButton
					aria-label={
						collapsed ? 'Expand the box' : 'Collapse the box'
					}
					onClick={toggleBox}
					size='small'
				>
					{collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
				</IconButton>
			</Box>

			{/* Corps */}
			<Box sx={{ flex: 1, overflow: 'auto' }}>
				{showPostsList && posts?.length ? (
					<List dense disablePadding>
						{posts.map((p) => (
							<ListItemButton
								key={p.slug}
								component={Link}
								href={`/posts/${p.slug}`}
							>
								{p.coverImage ? (
									<Avatar
										src={p.coverImage}
										alt=''
										sx={{
											mr: 1,
											width: 40,
											height: 40,
											borderRadius: '75% 65%',
											flexShrink: 0,
										}}
									/>
								) : null}
								<ListItemText
									primary={p.title}
									primaryTypographyProps={{ fontWeight: 600 }}
									secondary={p.excerpt}
								/>
							</ListItemButton>
						))}
					</List>
				) : (
					!collapsed && (
						<Box sx={{ pr: 1 }}>
							<Typography variant='body2' sx={{ mb: 2 }}>
								Bonjour ! Je conçois des cartes, des dataviz
								spatiales et j’écris sur la géo-tech.
							</Typography>

							<Divider sx={{ my: 1 }} />

							{/* Liens rapides / sociaux — placeholders */}
							<Box
								sx={{
									display: 'flex',
									gap: 1,
									flexWrap: 'wrap',
									alignItems: 'center',
								}}
							>
								<Link href='/about'>About</Link>
								<Link href='/portfolio'>Portfolio</Link>
								<Link href='/contact'>Contact</Link>
							</Box>
						</Box>
					)
				)}
			</Box>

			{/* Pied */}
			{posts?.length ? (
				<Box
					sx={{
						mt: 'auto',
						pt: 1,
						borderTop: '1px solid',
						borderColor: 'divider',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography variant='overline'>List of posts</Typography>
					<IconButton
						aria-label={
							showPostsList
								? 'Collapse the list'
								: 'Expand the list'
						}
						onClick={toggleList}
						size='small'
					>
						{showPostsList ? (
							<ExpandLessIcon />
						) : (
							<ExpandMoreIcon />
						)}
					</IconButton>
				</Box>
			) : null}
		</Box>
	)
}
