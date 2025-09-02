import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

export default function TestSimple() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🔧 Test ultra-simple</h1>
      
      <p>CSS global désactivé - Test basique de react-custom-scrollbars-2</p>
      
      <div style={{ border: '2px solid red', height: '300px' }}>
        <Scrollbars>
          <div style={{ background: 'linear-gradient(red, blue)', height: '1000px' }}>
            <h2>Contenu très haut pour forcer le scroll</h2>
            <p>La barre de défilement devrait être visible !</p>
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}
