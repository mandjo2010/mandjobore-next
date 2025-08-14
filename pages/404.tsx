import { Box, Button, Container, Typography } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Custom404() {
	const router = useRouter()

	return (
		<>
			<Head>
				<title>404 - Page non trouvée | Mandjo Béa Boré</title>
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
						404
					</Typography>
					<Typography variant="h4" sx={{ mb: 2 }}>
						Page non trouvée
					</Typography>
					<Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 500, mb: 4 }}>
						Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
					</Typography>
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
