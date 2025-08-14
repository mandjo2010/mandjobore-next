import React from 'react'

import ActionsBar from '@/components/layout/ActionsBar'

/**
 * Page de test pour la nouvelle ActionsBar
 * Permet de vérifier la conformité à la maquette "This.png"
 */
export default function TestActionsBarPage() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
        {/* Contenu principal pour simuler le site */}
        <main className="pr-16 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Test ActionsBar</h1>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Vérification de la maquette "This.png"</h2>
              <ul className="space-y-2 text-gray-700">
                <li>✅ Barre ancrée à droite de l'écran</li>
                <li>✅ Fine ligne de séparation à gauche (#E5E7EB)</li>
                <li>✅ Icônes outline style Lucide</li>
                <li>✅ Pas de fond ni bouton arrondi</li>
                <li>✅ Couleur #7A7A7A au repos</li>
                <li>✅ Plus sombre au hover/actif</li>
                <li>✅ Taille icônes 22px, strokeWidth 1.5</li>
                <li>✅ Espacement vertical régulier (space-y-6)</li>
                <li>✅ Ordre précis: Home, Menu, Search | Type, Maximize, ChevronUp</li>
                <li>✅ Aria-labels en français</li>
                <li>✅ Focus visible (ring bleu)</li>
                <li>✅ Navigation clavier</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Instructions de test</h2>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Vérifiez visuellement que la barre correspond à "This.png"</li>
                <li>Testez la navigation clavier (Tab, Enter, Escape)</li>
                <li>Vérifiez les états hover et focus</li>
                <li>Testez l'ouverture des menus (filtres et police)</li>
                <li>Vérifiez l'accessibilité avec un lecteur d'écran</li>
                <li>Testez toutes les fonctionnalités (scroll, recherche, etc.)</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Contenu pour test de scroll</h2>
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i} className="mb-4 text-gray-600">
                  Ceci est un paragraphe de test #{i + 1}. Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              ))}
            </div>
          </div>
        </main>

        {/* ActionsBar */}
        <ActionsBar />
      </div>
  )
}
