import { Drawer, Box, Typography, Stack, ButtonBase } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import * as React from 'react'

type Props = {
	open: boolean
	onClose: () => void
	categories: string[]
	active?: string
	onSelect: (cat?: string) => void
}

export default function RightFilter({
	active,
	categories,
	onClose,
	onSelect,
	open,
}: Props) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const t: any = useTheme()

	return (
		<Drawer
			anchor='right'
			open={open}
			onClose={onClose}
			PaperProps={{ sx: { width: 240 } }}
		>
			<Box sx={{ p: 2 }}>
				<Typography
					variant='h6'
					sx={{ color: t.main.colors.title, fontWeight: 700, mb: 2 }}
				>
					Filter by category
				</Typography>

				<Stack spacing={1.5}>
					<ButtonBase
						onClick={() => (onSelect(undefined), onClose())}
						sx={{
							color: !active
								? t.base.colors.accent
								: t.navigator.colors.postsListItemLink,
							fontWeight: 600,
							justifyContent: 'flex-start',
							px: 0,
						}}
					>
						all posts
					</ButtonBase>

					{categories.map((c) => (
						<ButtonBase
							key={c}
							onClick={() => (onSelect(c), onClose())}
							sx={{
								color:
									active === c
										? t.base.colors.accent
										: t.navigator.colors.postsListItemLink,
								fontWeight: 600,
								justifyContent: 'flex-start',
								px: 0,
							}}
						>
							{c}
						</ButtonBase>
					))}
				</Stack>
			</Box>
		</Drawer>
	)
}
