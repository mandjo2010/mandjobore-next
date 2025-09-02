import React from 'react'

import NavigatorBorderScrollbar from '@/components/NavigatorBorderScrollbar-fixed'

export default function TestBorderScrollbar() {
  const scrollableRef = React.useRef<HTMLDivElement>(null)

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>🎯 Test NavigatorBorderScrollbar - Thumb Flottant</h1>
      
      <p>
        Test de la barre de défilement auto-hide avec <strong>thumb flottant</strong>.
        Le chemin est transparent, seul le thumb cylindrique est visible pour un effet moderne et épuré.
      </p>
      
      <div style={{ border: '2px solid #4CAF50', height: '400px', marginTop: '20px', position: 'relative' }}>
        {/* Zone scrollable simulant le Navigator */}
        <div
          ref={scrollableRef}
          style={{
            height: '100%',
            msOverflowStyle: 'none',
            overflowX: 'hidden',
            overflowY: 'auto',
            padding: '20px',
            // Masquer la scrollbar native
            scrollbarWidth: 'none'
          }}
          className="navigator-test"
        >
          <style jsx>{`
            .navigator-test::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          <h2>📜 Contenu scrollable</h2>
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} style={{ 
              backgroundColor: i % 2 === 0 ? '#f0f8ff' : '#f5f5f5', 
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '10px',
              padding: '15px'
            }}>
              <strong>Article {i + 1}</strong> - Contenu de test pour forcer le défilement vertical.
              La barre auto-hide devrait apparaître sur le bord droit de cette zone.
            </div>
          ))}
        </div>
        
        {/* Barre de défilement auto-hide sur le bord droit */}
        <NavigatorBorderScrollbar 
          targetElementRef={scrollableRef}
          className="test-border-scrollbar"
        />
        
        {/* Ligne de démarcation simulée */}
        <div style={{
          backgroundColor: '#e0e0e0',
          bottom: 0,
          position: 'absolute',
          right: -1,
          top: 0,
          width: '1px'
        }} />
      </div>
      
      <div style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', marginTop: '20px', padding: '15px' }}>
        <h3>🎯 Test de comportement :</h3>
        <ul>
          <li>✅ Scrollbar invisible par défaut</li>
          <li>✅ Apparition au survol de la zone</li>
          <li>✅ Auto-hide après 1 seconde</li>
          <li>✅ <strong>Thumb flottant</strong> - Pas de track visible</li>
          <li>✅ <strong>Design épuré</strong> - Effet moderne</li>
          <li>✅ <strong>Contraste élevé</strong> pour accessibilité</li>
          <li>✅ Draggable pour navigation</li>
        </ul>
      </div>
    </div>
  )
}
