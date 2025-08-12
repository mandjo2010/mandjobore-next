import { Box, Stack, Button, Typography } from '@mui/material'

export default function RightActions({
	onBack,
	onSearch,
	onFullscreen,
	onScrollTop,
	showFontSize,
}) {
	return (
		<Box>
			<Stack spacing={1}>
				<Button variant='text' onClick={onBack}>
					BACK TO THE LIST
				</Button>
				<Button variant='text'>FILTER BY CATEGORY</Button>
				<Button variant='text' onClick={onSearch}>
					SEARCH
				</Button>
				<Button variant='text' onClick={onFullscreen}>
					FULLSCREEN
				</Button>
				<Button variant='text' onClick={onScrollTop}>
					SCROLL TO TOP
				</Button>
				{showFontSize && (
					<Button variant='text'>CHANGE FONT SIZE</Button>
				)}
			</Stack>
		</Box>
	)
}
