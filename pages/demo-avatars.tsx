import { Box, Typography, Switch, FormControlLabel } from '@mui/material'
import Head from 'next/head'
import * as React from 'react'

import GatsbyLayoutNew from '@/components/layout/GatsbyLayoutNew'
import { getArticleAvatar, getArticlePatternAvatar } from '@/utils/articleImages'

/**
 * PAGE DE DÉMONSTRATION - AVATARS D'ARTICLES
 * Cette page présente les différents types d'avatars disponibles
 */

export default function DemoAvatars() {
	const [usePatterns, setUsePatterns] = React.useState(false)
	
	// Données de test pour les articles
	const testArticles = [
		{ category: 'development', slug: 'react-hooks-guide', title: 'Guide Complet des React Hooks' },
		{ category: 'data', slug: 'python-data-analysis', title: 'Analyse de Données avec Python' },
		{ category: 'design', slug: 'css-grid-layout', title: 'Maîtriser CSS Grid Layout' },
		{ category: 'web', slug: 'javascript-async-await', title: 'JavaScript Async/Await Expliqué' },
		{ category: 'data', slug: 'machine-learning-basics', title: 'Introduction au Machine Learning' },
		{ category: 'development', slug: 'nextjs-deployment', title: 'Déployer une App Next.js' },
		{ category: 'design', slug: 'ui-ux-principles', title: 'Principes de Design UI/UX' },
		{ category: 'web', slug: 'api-rest-tutorial', title: 'Créer une API REST' },
		{ category: 'technology', slug: 'docker-containerization', title: 'Containerisation avec Docker' },
		{ category: 'tutorial', slug: 'git-workflow-guide', title: 'Workflow Git pour Équipes' }
	]

	return (
		<>
			<Head>
				<title>Démo Avatars d'Articles</title>
				<meta name="description" content="Démonstration des différents types d'avatars pour les articles" />
			</Head>
			
			<GatsbyLayoutNew 
				location={{ pathname: '/demo-avatars' }}
				posts={[]}
				pages={[]}
				parts={[]}
			>
				<div style={{ 
					margin: '0 auto',
					maxWidth: '900px',
					padding: '20px'
				}}>
					<h1 style={{ 
						color: '#333', 
						marginBottom: '30px',
						textAlign: 'center'
					}}>
						Démonstration des Avatars d'Articles
					</h1>
					
					<Box sx={{
						backgroundColor: '#f8f9fa',
						borderRadius: '8px',
						marginBottom: '30px',
						padding: '20px',
						textAlign: 'center'
					}}>
						<FormControlLabel
							control={
								<Switch
									checked={usePatterns}
									onChange={(e) => setUsePatterns(e.target.checked)}
									color="primary"
								/>
							}
							label={`Type d'avatar: ${usePatterns ? 'Patterns SVG' : 'Images Unsplash'}`}
							sx={{ fontSize: '1.1rem' }}
						/>
					</Box>

					<div style={{
						display: 'grid',
						gap: '20px',
						gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
						marginBottom: '30px'
					}}>
						{testArticles.map((article, index) => (
							<div key={article.slug} style={{
								alignItems: 'center',
								backgroundColor: '#ffffff',
								border: '1px solid #e0e0e0',
								borderRadius: '8px',
								display: 'flex',
								gap: '15px',
								padding: '20px'
							}}>
								<div style={{
									border: '2px solid #e0e0e0',
									borderRadius: '50%',
									flexShrink: 0,
									height: '60px',
									overflow: 'hidden',
									width: '60px'
								}}>
									<img 
										src={usePatterns 
											? getArticlePatternAvatar(article.slug, index)
											: getArticleAvatar(article.slug, article.category, article.title, index)
										}
										alt={`Avatar pour ${article.title}`}
										style={{
											height: '100%',
											objectFit: 'cover',
											width: '100%'
										}}
									/>
								</div>
								
								<div>
									<Typography variant="h6" sx={{ 
										fontSize: '0.95rem', 
										fontWeight: 600,
										marginBottom: '4px'
									}}>
										{article.title}
									</Typography>
									<Typography variant="body2" sx={{ 
										color: '#666',
										fontSize: '0.8rem',
										textTransform: 'capitalize'
									}}>
										{article.category}
									</Typography>
									<Typography variant="body2" sx={{ 
										color: '#999',
										fontFamily: 'monospace',
										fontSize: '0.75rem'
									}}>
										{article.slug}
									</Typography>
								</div>
							</div>
						))}
					</div>

					<div style={{
						backgroundColor: '#e8f5e8',
						border: '1px solid #27ae60',
						borderRadius: '8px',
						padding: '20px'
					}}>
						<h3 style={{ marginTop: 0 }}>Fonctionnalités des Avatars</h3>
						<ul style={{ marginBottom: 0 }}>
							<li>✅ <strong>Images basées sur catégories</strong> : Chaque catégorie a sa propre collection d'images thématiques</li>
							<li>✅ <strong>Détection automatique</strong> : Le système détecte la catégorie basée sur les mots-clés du titre</li>
							<li>✅ <strong>Consistance</strong> : Même article = même avatar (basé sur le hash du slug)</li>
							<li>✅ <strong>Fallback robuste</strong> : Patterns SVG générés si les images externes échouent</li>
							<li>✅ <strong>Performance</strong> : Images optimisées 120x120px via Unsplash</li>
							<li>✅ <strong>Accessibilité</strong> : Textes alternatifs descriptifs pour tous les avatars</li>
						</ul>
					</div>
				</div>
			</GatsbyLayoutNew>
		</>
	)
}
