import Head from 'next/head'
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

/**
 * PAGE DE TEST ULTIME - react-custom-scrollbars-2 pur
 * Test direct de la librairie sans aucune interference
 */

export default function TestScrollbarDirect() {
  return (
    <>
      <Head>
        <title>Test direct - react-custom-scrollbars-2</title>
      </Head>
      
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1>🔬 Test direct react-custom-scrollbars-2</h1>
        
        <p>
          Ce test utilise directement react-custom-scrollbars-2 sans aucune interference.
          La barre devrait apparaître et disparaître automatiquement (autoHide).
        </p>
        
        {/* Test direct de react-custom-scrollbars-2 */}
        <div className="spring-scrollbars" style={{ 
          border: '2px solid #4CAF50', 
          height: '400px', 
          marginTop: '20px',
          width: '100%'
        }}>
          <Scrollbars
            autoHide                          // ← AUTO-HIDE NATIF
            autoHideTimeout={1000}            // ← Cache après 1 seconde
            autoHideDuration={200}            // ← Animation 200ms
            universal={true}
            style={{ height: '100%', width: '100%' }}
            renderThumbVertical={({ style, ...props }) => (
              <div
                {...props}
                style={{
                  ...style,
                  backgroundColor: '#FF0000',  // ← ROUGE VISIBLE pour test
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '12px'               // ← Plus large pour être visible
                }}
              />
            )}
            renderTrackVertical={({ style, ...props }) => (
              <div
                {...props}
                style={{
                  ...style,
                  backgroundColor: '#FFFF00', // ← JAUNE VISIBLE pour test
                  borderRadius: '3px',
                  bottom: '2px',
                  right: '2px',
                  top: '2px',
                  width: '12px'
                }}
              />
            )}
          >
            <div style={{ padding: '20px' }}>
              <h2>📜 Contenu pour tester le scroll</h2>
              {Array.from({ length: 50 }, (_, i) => (
                <div key={i} style={{ 
                  backgroundColor: i % 2 === 0 ? '#f0f0f0' : '#e0e0e0', 
                  borderRadius: '4px',
                  marginBottom: '10px',
                  padding: '10px'
                }}>
                  <strong>Ligne {i + 1}</strong> - Du contenu pour forcer le défilement vertical. 
                  Vous devriez voir une barre de défilement ROUGE sur fond JAUNE qui apparaît 
                  et disparaît automatiquement avec autoHide.
                </div>
              ))}
            </div>
          </Scrollbars>
        </div>
        
        <p style={{ color: '#666', fontStyle: 'italic', marginTop: '20px' }}>
          ✅ Attendu : Barre de défilement ROUGE sur fond JAUNE<br/>
          ✅ Comportement : Apparition/disparition automatique<br/>
          ✅ Test : Déplacez la souris dans la zone verte
        </p>
      </div>
    </>
  )
}
