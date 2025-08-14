import Head from 'next/head';
import React from 'react';

import { ActionsBar } from '@/components/ActionsBar';

/**
 * Page de test pour la nouvelle ActionsBar migrée de Gatsby
 * Style "This.png" - Icônes avec fond circulaire blanc
 */
export default function TestActionsBarPage() {
  return (
    <>
      <Head>
        <title>Test ActionsBar - Migration Gatsby vers Next.js</title>
        <meta name="description" content="Test de la barre d'actions migrée avec style This.png" />
      </Head>

      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        minHeight: '100vh',
        padding: '2rem',
        position: 'relative'
      }}>
        {/* Contenu de test pour simuler une page */}
        <div style={{
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          margin: '0 auto',
          maxWidth: '800px',
          padding: '2rem'
        }}>
          <h1 style={{ 
            borderBottom: '3px solid #709425', 
            color: '#333', 
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem'
          }}>
            Test ActionsBar - Migration Réussie ✅
          </h1>
          
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#555', marginBottom: '1rem' }}>Style "This.png" Implémenté</h2>
            <ul style={{ color: '#666', lineHeight: '1.8' }}>
              <li>✅ <strong>Icônes dans des cercles blancs</strong> avec ombre douce</li>
              <li>✅ <strong>Position côté gauche</strong> de l'écran (fixe)</li>
              <li>✅ <strong>Espacement vertical</strong> entre les boutons</li>
              <li>✅ <strong>Fond circulaire blanc</strong> (#ffffff)</li>
              <li>✅ <strong>Ombre subtile</strong> : box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)</li>
              <li>✅ <strong>Icônes noires épaisses</strong> Material-UI v7</li>
              <li>✅ <strong>Responsive design</strong> : barre horizontale en bas sur mobile</li>
            </ul>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#555', marginBottom: '1rem' }}>Fonctionnalités Disponibles</h2>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '1rem' }}>
                <h3 style={{ color: '#709425', marginBottom: '0.5rem' }}>🏠 Home</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Navigation vers l'accueil</p>
              </div>
              
              <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '1rem' }}>
                <h3 style={{ color: '#709425', marginBottom: '0.5rem' }}>🔍 Search</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Ouverture de la recherche</p>
              </div>
              
              <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '1rem' }}>
                <h3 style={{ color: '#709425', marginBottom: '0.5rem' }}>🗂️ Filter</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Filtre par catégorie avec modal</p>
              </div>
              
              <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '1rem' }}>
                <h3 style={{ color: '#709425', marginBottom: '0.5rem' }}>🔤 Font Size</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Ajustement taille police avec modal</p>
              </div>
              
              <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '1rem' }}>
                <h3 style={{ color: '#709425', marginBottom: '0.5rem' }}>⬆️ Scroll Top</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Retour en haut (apparaît après 300px)</p>
              </div>
              
              <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '1rem' }}>
                <h3 style={{ color: '#709425', marginBottom: '0.5rem' }}>🔲 Fullscreen</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Mode plein écran</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#555', marginBottom: '1rem' }}>Technologies Utilisées</h2>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '0.5rem',
              marginBottom: '1rem' 
            }}>
              {[
                'Next.js 15', 'Material-UI v7', 'TypeScript', 'Zustand', 
                'CSS Modules', 'React Hooks', 'Responsive Design'
              ].map(tech => (
                <span key={tech} style={{
                  background: '#709425',
                  borderRadius: '20px',
                  color: 'white',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  padding: '0.25rem 0.75rem'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contenu de scroll pour tester le bouton "retour en haut" */}
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ color: '#555', marginBottom: '1rem' }}>Test du Scroll</h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Faites défiler cette page vers le bas pour voir apparaître le bouton "Retour en haut" dans la barre d'actions.
            </p>
            
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} style={{ 
                background: i % 2 === 0 ? '#f8f9fa' : '#ffffff', 
                border: '1px solid #eee',
                borderRadius: '4px',
                margin: '1rem 0',
                padding: '1rem'
              }}>
                <h3>Section de test #{i + 1}</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Notre nouvelle ActionsBar */}
        <ActionsBar />
      </div>
    </>
  );
}
