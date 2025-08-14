import {
	Box,
	Typography,
	List,
	ListItemButton,
	Stack,
	Chip,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import Link from 'next/link'
import * as React from 'react'

import type { MDEntry } from '@/types'

type Props = {
	posts: MDEntry[]
	categories: string[]
	activeCategory?: string
	onCategory?: (cat?: string) => void
}

export default function Sidebar({
	activeCategory,
	categories,
	onCategory,
	posts,
}: Props) {
	const t = useTheme() as Theme & import('@/types/theme').CustomTheme

	return (
		<Box sx={{ color: t.navigator.colors.postsListItemLink }}>
			{/* Filtres catégories (horizontal chips comme sur le site live) */}
			<Stack direction='row' flexWrap='wrap' gap={1} sx={{ mb: 2 }}>
				<Chip
					label='all posts'
					onClick={() => onCategory?.(undefined)}
					variant={activeCategory ? 'outlined' : 'filled'}
					sx={{
						'&:hover': { cursor: 'pointer', opacity: 0.9 },
						bgcolor: !activeCategory
							? t.base.colors.accent
							: 'transparent',
						color: !activeCategory
							? t.base.colors.background
							: t.navigator.colors.postsListItemLink,
						fontWeight: 600,
					}}
				/>
				{categories.map((c) => (
					<Chip
						key={c}
						label={c}
						onClick={() => onCategory?.(c)}
						variant={activeCategory === c ? 'filled' : 'outlined'}
						sx={{
							'&:hover': { cursor: 'pointer', opacity: 0.9 },
							bgcolor:
								activeCategory === c
									? t.base.colors.accent
									: 'transparent',
							color:
								activeCategory === c
									? t.base.colors.background
									: t.navigator.colors.postsListItemLink,
							fontWeight: 600,
							textTransform: 'none',
						}}
					/>
				))}
			</Stack>

			<Typography
				sx={{
					color: t.navigator.colors.postsHeader,
					fontWeight: 700,
					mb: 1,
				}}
			>
				Articles
			</Typography>
			<List dense>
				{posts.map((p) => (
					<Link
						key={p.slug}
						href={`/posts/${p.slug}`}
						style={{ textDecoration: 'none' }}
					>
						<ListItemButton
							sx={{
								'&:hover': {
									color: t.navigator.colors
										.postsListItemLinkHover,
								},
								color: t.navigator.colors.postsListItemLink,
								px: 0,
							}}
						>
							<Typography
								sx={{
									fontSize: `${t.navigator.sizes?.postsListItemH1Font || 1.3}rem`,
									fontWeight: 600,
								}}
							>
								{p.data?.title}
							</Typography>
						</ListItemButton>
					</Link>
				))}
			</List>
		</Box>
	)
}
