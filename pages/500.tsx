import { Box, Button, Container, Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Error500Props {
	err?: Error
}

export default function Custom500({ err }: Error500Props) {
	const router = useRouter()

	return (
		<>
			<Head>
				<title>500 - Erreur serveur | Mandjo Béa Boré</title>
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
						500
					</Typography>
					<Typography variant="h4" sx={{ mb: 2 }}>
						Erreur serveur
					</Typography>
					<Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 500, mb: 4 }}>
						Une erreur interne s'est produite. Veuillez réessayer plus tard.
					</Typography>
					{process.env.NODE_ENV === 'development' && err && (
						<Typography variant="body2" sx={{ color: 'error.main', fontFamily: 'monospace', mb: 2 }}>
							{err.message}
						</Typography>
					)}
					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button
							variant="contained"
							onClick={() => router.reload()}
							sx={{ '&:hover': { backgroundColor: '#65a30d' }, backgroundColor: '#84cc16' }}
						>
							Recharger
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

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	}
}
