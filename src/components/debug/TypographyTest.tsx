import { Box, Typography } from '@mui/material'
import * as React from 'react'

/**
 * Composant de test pour vérifier la typographie
 * Reproduit exactement les styles Gatsby
 */
export default function TypographyTest() {
	return (
		<Box sx={{ maxWidth: '50em', mx: 'auto', p: 4 }}>
			{/* Test PRIORITÉ ULTRA-HAUTE avec h1/h2 explicites */}
			<h1 className="blog-title">
				✅ TITRE CORRIGÉ: 27px / 31px (h1 + classe CSS)
			</h1>
			<h2 className="blog-subtitle">
				✅ SOUS-TITRE CORRIGÉ: 23px / 27px (h2 + classe CSS)
			</h2>

			{/* Test avec Material-UI + styles inline */}
			<Typography
				component="h1"
				className="blog-title"
				sx={{
					color: 'rgb(51, 51, 51) !important',
					fontFamily: '"Open Sans", sans-serif !important',
					fontSize: '27px !important',
					fontStyle: 'normal !important',
					fontWeight: '600 !important',
					lineHeight: '31px !important',
					margin: '2rem 0 0.5rem 0 !important',
				}}
			>
				Titre MUI: 27px / 31px (Material-UI + Override)
			</Typography>

			<Typography
				component="h2"
				className="blog-subtitle"
				sx={{
					color: 'rgb(85, 85, 85) !important',
					fontFamily: '"Open Sans", sans-serif !important',
					fontSize: '23px !important',
					fontStyle: 'normal !important',
					fontWeight: '300 !important',
					lineHeight: '27px !important',
					margin: '0 0 1rem 0 !important',
				}}
			>
				Sous-titre MUI: 23px / 27px (Material-UI + Override)
			</Typography>

			{/* Vérification avec inspection */}
			<Typography variant="body1" sx={{ bgcolor: '#f0f8ff', border: '1px solid #ddd', mt: 4, p: 2 }}>
				<strong>🔍 VÉRIFICATION:</strong><br/>
				• Ouvrez DevTools (F12)<br/>
				• Inspectez les titres ci-dessus<br/>
				• Vérifiez: font-size: 27px et line-height: 31px pour le titre<br/>
				• Vérifiez: font-size: 23px et line-height: 27px pour le sous-titre<br/>
				• Les styles doivent avoir !important et être appliqués
			</Typography>

			{/* Test avec variables CSS */}
			<div style={{
				color: 'var(--title-color)',
				fontFamily: 'var(--title-font-family)',
				fontSize: 'var(--title-font-size)',
				fontWeight: 'var(--title-font-weight)',
				lineHeight: 'var(--title-line-height)',
				margin: '2rem 0 0.5rem 0'
			}}>
				Titre avec variables CSS (27px, 600, Open Sans)
			</div>

			<div style={{
				color: 'var(--subtitle-color)',
				fontFamily: 'var(--subtitle-font-family)',
				fontSize: 'var(--subtitle-font-size)',
				fontWeight: 'var(--subtitle-font-weight)',
				lineHeight: 'var(--subtitle-line-height)',
				margin: '0 0 1rem 0'
			}}>
				Sous-titre avec variables CSS (23px, 300, Open Sans)
			</div>

			{/* Comparaison avec texte normal */}
			<Typography variant="body1" sx={{ bgcolor: '#f5f5f5', mt: 4, p: 2 }}>
				<strong>Référence Gatsby:</strong> mandjobore.com<br/>
				<strong>Spécifications exactes:</strong><br/>
				• Titres: "Open Sans", 600, 27px, 31px line-height, rgb(51,51,51)<br/>
				• Sous-titres: "Open Sans", 300, 23px, 27px line-height, rgb(85,85,85)
			</Typography>
		</Box>
	)
}

/**
 * Hook utilitaire pour obtenir les styles typographiques
 */
export const useTypographyStyles = () => {
	return {
		subtitleStyle: {
			color: 'rgb(85, 85, 85)',
			fontFamily: '"Open Sans", sans-serif',
			fontSize: '23px',
			fontStyle: 'normal',
			fontWeight: 300,
			lineHeight: '27px',
		},
		titleStyle: {
			color: 'rgb(51, 51, 51)',
			fontFamily: '"Open Sans", sans-serif',
			fontSize: '27px',
			fontStyle: 'normal',
			fontWeight: 600,
			lineHeight: '31px',
		}
	}
}
