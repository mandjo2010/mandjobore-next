import * as React from 'react'
import Link from 'next/link'
import {
	ListItemButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Typography,
} from '@mui/material'
import type { Post } from '@/types'
import { Chip } from '@mui/material'
import { normalizeCategory, toLabel } from '@/lib/categories'

/**
 * Item de la liste d’articles, 100% client-safe.
 */
export default function ArticleListItem({
	post,
	active = false,
}: {
	post: Post
	active?: boolean
}) {
	const href = `/posts/${post.slug}`
	const coverSrc = post.coverImage
	const catSlug = normalizeCategory(post.category || '')
	const catLabel = catSlug ? toLabel(catSlug) : ''

	return (
		<Link href={href} passHref legacyBehavior>
			<ListItemButton
				component='a'
				selected={active}
				data-testid='post-card'
				data-category={catSlug}
				sx={{
					gap: 2,
					py: 1.25,
					alignItems: 'center',
					'&.Mui-selected': {
						backgroundColor: 'action.hover',
					},
				}}
			>
				<ListItemAvatar sx={{ minWidth: 56 }}>
					<Avatar
						src={coverSrc}
						alt={post.title}
						sx={{ width: 48, height: 48 }}
						variant='circular'
					/>
				</ListItemAvatar>

				<ListItemText
					primary={
						<>
							<Typography
								variant='h6'
								sx={{ fontWeight: 600, lineHeight: 1.2 }}
							>
								{post.title}
							</Typography>
							{catSlug && (
								<Chip
									label={catLabel}
									size='small'
									aria-label={`Catégorie : ${catLabel}`}
									sx={{ mt: 0.5 }}
								/>
							)}
						</>
					}
					secondary={
						post.excerpt ? (
							<Typography
								component='span'
								variant='body2'
								sx={{
									color: (t) => t.main.colors.meta,
								}}
							>
								{post.excerpt}
							</Typography>
						) : null
					}
				/>
			</ListItemButton>
		</Link>
	)
}
