import * as React from 'react'
import { Box, Typography, Stack, Chip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { normalizeCategory, toLabel } from '@/lib/categories'

type Props = {
	categories: string[]
	selected?: string // '' or undefined => all posts (slug preferred)
	// legacy support: some callers use `active` instead of `selected`
	active?: string
	onChange: (value: string) => void // '' => all posts, value is a slug
}

export default function CategoryFilter({
	categories,
	selected,
	active, // legacy prop
	onChange,
}: Props) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const t: any = useTheme()
	const nav = t?.navigator ?? {}
	const base = t?.base ?? {}
	const info = t?.info ?? {}

	// Build stable options: [{ value: slug, label: }]
	const options = React.useMemo(() => {
		const slugs = Array.from(new Set(categories.map((c) => normalizeCategory(c)).filter(Boolean)))
		return slugs.map((s) => ({ value: s, label: toLabel(s) }))
	}, [categories])

	// Current value is a slug; if only legacy `active` is provided, normalize it
	const current = selected ?? (active ? normalizeCategory(active) : '')
	const isAll = !current

	const handleChange = (value: string) => {
		onChange(value || '')
	}

	return (
		<Box sx={{ p: 2 }}>
			<Typography
				variant="h6"
				sx={{
					color: nav.colors?.postsHeader ?? '#555',
					mb: 2,
					fontWeight: 600,
					fontSize: `${info.fonts?.boxTitleSize ?? 1.3}rem`,
				}}
			>
				Filter by category
			</Typography>

			<Stack spacing={1.5} direction="column" alignItems="flex-start">
				{/* Chip "Tous" */}
				<Chip
					label="all posts"
					variant={isAll ? 'filled' : 'outlined'}
					onClick={() => handleChange('')}
					sx={{
						bgcolor: isAll ? base.colors?.accent ?? '#0aa' : 'transparent',
						color: isAll
							? base.colors?.background ?? '#fff'
							: nav.colors?.postsListItemLink ?? '#666',
						borderColor: nav.colors?.postsListItemLink ?? '#666',
						fontWeight: 600,
						'&:hover': {
							bgcolor: isAll ? base.colors?.accent ?? '#0aa' : info.colors?.background ?? '#f7f7f7',
							color: isAll
								? base.colors?.background ?? '#fff'
								: nav.colors?.postsListItemLinkHover ?? '#111',
						},
						'& .MuiChip-label': {
							px: 1.5,
						},
					}}
				/>

				{/* Chips des catégories (slug + joli label) */}
				{options.map((opt) => {
					const isActive = current === opt.value
					return (
						<Chip
							key={opt.value}
							label={opt.label}
							variant={isActive ? 'filled' : 'outlined'}
							onClick={() => handleChange(opt.value)}
							sx={{
								bgcolor: isActive ? base.colors?.accent ?? '#0aa' : 'transparent',
								color: isActive
									? base.colors?.background ?? '#fff'
									: nav.colors?.postsListItemLink ?? '#666',
								borderColor: nav.colors?.postsListItemLink ?? '#666',
								fontWeight: 600,
								'&:hover': {
									bgcolor: isActive ? base.colors?.accent ?? '#0aa' : info.colors?.background ?? '#f7f7f7',
									color: isActive
										? base.colors?.background ?? '#fff'
										: nav.colors?.postsListItemLinkHover ?? '#111',
								},
								'& .MuiChip-label': {
									px: 1.5,
								},
							}}
						/>
					)
				})}
			</Stack>
		</Box>
	)
}