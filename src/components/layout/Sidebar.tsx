import * as React from 'react'
import Link from 'next/link'
import {
	Box,
	Typography,
	List,
	ListItemButton,
	Stack,
	Chip,
} from '@mui/material'
import type { MDEntry } from '@/types'
import { useTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'

type Props = {
	posts: MDEntry[]
	categories: string[]
	activeCategory?: string
	onCategory?: (cat?: string) => void
}

export default function Sidebar({
	posts,
	categories,
	activeCategory,
	onCategory,
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
						fontWeight: 600,
						bgcolor: !activeCategory
							? t.base.colors.accent
							: 'transparent',
						color: !activeCategory
							? t.base.colors.background
							: t.navigator.colors.postsListItemLink,
						'&:hover': { opacity: 0.9, cursor: 'pointer' },
					}}
				/>
				{categories.map((c) => (
					<Chip
						key={c}
						label={c}
						onClick={() => onCategory?.(c)}
						variant={activeCategory === c ? 'filled' : 'outlined'}
						sx={{
							textTransform: 'none',
							fontWeight: 600,
							bgcolor:
								activeCategory === c
									? t.base.colors.accent
									: 'transparent',
							color:
								activeCategory === c
									? t.base.colors.background
									: t.navigator.colors.postsListItemLink,
							'&:hover': { opacity: 0.9, cursor: 'pointer' },
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
								px: 0,
								color: t.navigator.colors.postsListItemLink,
								'&:hover': {
									color: t.navigator.colors
										.postsListItemLinkHover,
								},
							}}
						>
							<Typography
								sx={{
									fontWeight: 600,
									fontSize: `${t.navigator.sizes.postsListItemH1Font}rem`,
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
