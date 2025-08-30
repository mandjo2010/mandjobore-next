import Head from 'next/head'
import * as React from 'react'

import GatsbyLayoutNew from '@/components/layout/GatsbyLayoutNew'

/**
 * PAGE DE TEST - MASQUAGE DES BARRES DE DÉFILEMENT
 * Cette page teste que les barres de défilement sont complètement masquées
 * sur tous les navigateurs, y compris les petites extrémités
 */

export default function TestScrollbar() {
	// Contenu factice pour tester le défilement
	const testContent = Array.from({ length: 100 }, (_, i) => (
		<div key={i} style={{ 
			backgroundColor: i % 2 === 0 ? '#f8f9fa' : '#ffffff', 
			border: '1px solid #e0e0e0', 
			borderRadius: '4px',
			margin: '10px 0',
			padding: '20px'
		}}>
			<h3>Section de test #{i + 1}</h3>
			<p>
				Ce contenu est généré pour tester le masquage complet des barres de défilement.
				La barre de défilement doit être complètement invisible, y compris les petites 
				extrémités et boutons. Aucune trace ne doit être visible, même lors du survol
				ou de l'interaction avec la page.
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
				incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
				nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			</p>
			<div style={{ 
				backgroundColor: '#f0f0f0', 
				borderRadius: '3px', 
				maxHeight: '100px',
				maxWidth: '400px',
				overflow: 'auto',
				padding: '10px'
			}}>
				<p>Zone défilable imbriquée - test scrollbar:</p>
				<div style={{ height: '200px', padding: '10px' }}>
					Contenu long qui devrait déclencher une barre de défilement verticale
					mais celle-ci doit rester complètement invisible. Test, test, test...
					Ligne supplémentaire pour forcer le défilement.
					Encore une ligne pour être sûr.
					Et encore une ligne de test.
					Dernière ligne pour ce test de défilement.
				</div>
			</div>
		</div>
	));

	return (
		<>
			<Head>
				<title>Test Masquage Barre de Défilement</title>
				<meta name="description" content="Page de test pour vérifier le masquage complet des barres de défilement" />
			</Head>
			
			<GatsbyLayoutNew 
				location={{ pathname: '/test-scrollbar' }}
				posts={[]}
				pages={[]}
				parts={[]}
			>
				<div style={{ 
					margin: '0 auto',
					maxWidth: '800px',
					padding: '20px'
				}}>
					<h1 style={{ 
						color: '#333', 
						marginBottom: '30px',
						textAlign: 'center'
					}}>
						Test du Masquage des Barres de Défilement
					</h1>
					
					<div style={{
						backgroundColor: '#e8f5e8',
						border: '1px solid #27ae60',
						borderRadius: '8px',
						marginBottom: '30px',
						padding: '20px'
					}}>
						<h2>Instructions de Test</h2>
						<ul>
							<li>✅ La barre de défilement principale doit être complètement invisible</li>
							<li>✅ Aucune trace, extrémité ou bouton ne doit être visible</li>
							<li>✅ Le défilement doit fonctionner avec la molette/touch</li>
							<li>✅ Les zones défilables imbriquées doivent aussi masquer leur scrollbar</li>
							<li>✅ Test valide sur Chrome, Firefox, Safari, Edge</li>
						</ul>
					</div>

					<div style={{
						backgroundColor: '#fff8dc',
						border: '1px solid #ffa500',
						borderRadius: '8px',
						marginBottom: '30px',
						padding: '20px'
					}}>
						<h3>Zone de Test Horizontal</h3>
						<div style={{ 
							backgroundColor: '#f5f5f5',
							overflowX: 'auto',
							padding: '10px'
						}}>
							<div style={{ 
								alignItems: 'center', 
								background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)', 
								borderRadius: '4px',
								color: 'white',
								display: 'flex',
								fontWeight: 'bold',
								height: '60px',
								justifyContent: 'center',
								width: '1200px'
							}}>
								Zone large pour tester le défilement horizontal - La scrollbar doit être invisible
							</div>
						</div>
					</div>

					{testContent}
					
					<div style={{
						backgroundColor: '#f0f8ff',
						border: '1px solid #4169e1',
						borderRadius: '8px',
						marginTop: '30px',
						padding: '20px',
						textAlign: 'center'
					}}>
						<h3>Fin du Test</h3>
						<p>
							Si vous pouvez voir cette section après avoir fait défiler la page
							et qu'aucune barre de défilement n'était visible, le test est réussi ! ✅
						</p>
					</div>
				</div>
			</GatsbyLayoutNew>
		</>
	)
}
