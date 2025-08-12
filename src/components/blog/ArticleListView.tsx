import Link from 'next/link'
import Image from 'next/image'
import { Box, Typography, Chip } from '@mui/material'
import type { Post } from '@/types'
import { normalizeCategory, toLabel } from '@/lib/categories'

type Props = {
	posts: Post[]
}

export default function ArticleListView({ posts }: Props) {
	return (
		<Box component='ul' sx={{ listStyle: 'none', m: 0, p: 0 }}>
			{posts.map((p) => {
				const href = `/posts/${p.slug}`
				const title = p.title ?? p.slug
				const sub = p.excerpt
				const cover = p.coverImage
				const catSlug = normalizeCategory(p.category || '')
				const catLabel = catSlug ? toLabel(catSlug) : ''

				return (
					<Box
						component='li'
						key={p.slug}
						data-testid='post-card'
						data-category={catSlug}
						sx={{ display: 'flex', alignItems: 'center', mb: 3 }}
					>
						{cover && (
							<Image
								src={cover}
								alt=''
								width={90}
								height={90}
								style={{
									borderRadius: '75% 65%',
									flexShrink: 0,
								}}
							/>
						)}

						<Box sx={{ ml: 2 }}>
							<Link href={href}>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Typography
										variant='h5'
										sx={{ fontWeight: 600, lineHeight: 1.15 }}
									>
										{title}
									</Typography>
									{catSlug && (
										<Chip size='small' label={catLabel} aria-label={`Catégorie : ${catLabel}`} />
									)}
								</Box>
							</Link>

							{sub && (
								<Typography
									variant='subtitle1'
									sx={{ mt: 0.5 }}
								>
									{sub}
								</Typography>
							)}
						</Box>
					</Box>
				)
			})}
		</Box>
	)
}
