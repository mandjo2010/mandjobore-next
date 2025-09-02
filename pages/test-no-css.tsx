import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

/**
 * TEST SANS CSS GLOBAL
 * Pour isoler le problème de react-custom-scrollbars-2
 */

export default function TestNoCss() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <style jsx global>{`
        /* Annulation TEMPORAIRE du CSS global masquant les scrollbars */
        * {
          scrollbar-width: auto !important;
          -ms-overflow-style: auto !important;
        }
        
        *::-webkit-scrollbar {
          display: block !important;
          width: auto !important;
          height: auto !important;
          background: auto !important;
          opacity: 1 !important;
        }
        
        *::-webkit-scrollbar-track {
          display: block !important;
          background: auto !important;
          width: auto !important;
          height: auto !important;
          opacity: 1 !important;
        }
        
        *::-webkit-scrollbar-thumb {
          display: block !important;
          background: auto !important;
          border: auto !important;
          width: auto !important;
          height: auto !important;
          opacity: 1 !important;
        }
      `}</style>
      
      <h1>🧪 Test sans CSS global masquant</h1>
      
      <p style={{ marginBottom: '20px' }}>
        Ce test annule temporairement le CSS global qui masque les scrollbars.
        La barre devrait maintenant être visible !
      </p>
      
      <div style={{ 
        backgroundColor: '#f9f9f9', 
        border: '3px solid #FF0000', 
        height: '400px',
        width: '100%'
      }}>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          universal={true}
          style={{ height: '100%', width: '100%' }}
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: '#FF0000',
                border: '2px solid #000',  // Bordure noire pour visibilité max
                borderRadius: '6px',
                cursor: 'pointer',
                width: '14px'
              }}
            />
          )}
          renderTrackVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: '#FFFF00',
                border: '1px solid #000',  // Bordure pour délimiter
                borderRadius: '6px',
                bottom: '2px',
                right: '2px',
                top: '2px',
                width: '14px'
              }}
            />
          )}
        >
          <div style={{ padding: '20px' }}>
            <h2>📜 Test de contenu scrollable</h2>
            {Array.from({ length: 50 }, (_, i) => (
              <div key={i} style={{ 
                backgroundColor: i % 2 === 0 ? '#e3f2fd' : '#f3e5f5', 
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginBottom: '10px',
                padding: '15px'
              }}>
                <strong>Element {i + 1}</strong> - Contenu de test pour forcer le défilement.
                Avec le CSS global annulé, vous devriez voir une barre ROUGE 
                sur fond JAUNE qui apparaît/disparaît automatiquement.
              </div>
            ))}
          </div>
        </Scrollbars>
      </div>
      
      <div style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', marginTop: '20px', padding: '15px' }}>
        <h3>🎯 Diagnostic :</h3>
        <ul>
          <li>✅ Si la barre apparaît : Problème = CSS global trop agressif</li>
          <li>❌ Si la barre n'apparaît pas : Problème = react-custom-scrollbars-2</li>
        </ul>
      </div>
    </div>
  )
}
