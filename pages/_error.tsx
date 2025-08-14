import { Box, Button, Container, Typography } from '@mui/material'
import { NextPageContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface ErrorProps {
	statusCode?: number
	err?: Error & { statusCode?: number }
}

function Error({ err, statusCode }: ErrorProps) {
	const router = useRouter()

	const getErrorMessage = () => {
		if (statusCode === 404) {
			return 'Cette page est introuvable.'
		}
		if (statusCode === 500) {
			return 'Une erreur interne s\'est produite.'
		}
		return 'Une erreur inattendue s\'est produite.'
	}

	const getErrorTitle = () => {
		if (statusCode) {
			return `Erreur ${statusCode}`
		}
		return 'Erreur'
	}

	return (
		<>
			<Head>
				<title>{getErrorTitle()} | Mandjo Béa Boré</title>
			</Head>
			<Container maxWidth="md">
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						minHeight: '100vh',
						textAlign: 'center',
					}}
				>
					<Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', mb: 2 }}>
						{statusCode || 'Erreur'}
					</Typography>
					<Typography variant="h4" sx={{ mb: 2 }}>
						{getErrorTitle()}
					</Typography>
					<Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 500, mb: 4 }}>
						{getErrorMessage()}
					</Typography>
					{process.env.NODE_ENV === 'development' && err && (
						<Typography variant="body2" sx={{ color: 'error.main', fontFamily: 'monospace', mb: 2 }}>
							{err.message}
						</Typography>
					)}
					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button
							variant="contained"
							onClick={() => router.back()}
							sx={{ '&:hover': { backgroundColor: '#65a30d' }, backgroundColor: '#84cc16' }}
						>
							Retour
						</Button>
						<Link href="/" passHref>
							<Button variant="outlined">
								Accueil
							</Button>
						</Link>
					</Box>
				</Box>
			</Container>
		</>
	)
}

Error.getInitialProps = ({ err, res }: NextPageContext) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default Error
