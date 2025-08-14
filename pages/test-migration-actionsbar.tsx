import Head from 'next/head';
import React from 'react';

import ActionsBar from '@/components/layout/ActionsBar';
import MainLayout from '@/components/layout/MainLayout';
import LeftSidebar from '@/components/sidebar/LeftSidebar';

/**
 * Page de test pour la migration ActionsBar - Style "This.png"
 * Valide que la migration Gatsby → Next.js respecte toutes les contraintes
 * ActionsBar dans la sidebar droite avec disposition en 2 groupes
 */
export default function TestActionsBarMigrationPage() {
  return (
    <>
      <Head>
        <title>Test Migration ActionsBar - Sidebar Droite</title>
        <meta name="description" content="Page de test pour la migration de la barre d'actions dans la sidebar droite" />
      </Head>

      <MainLayout
        left={<LeftSidebar />}
        right={<ActionsBar />}
        categories={['Programming', 'Design', 'AI', 'Data Science', 'GIS']}
        activeCategory="all posts"
        onCategoryChange={(category) => console.log('Category changed:', category)}
      >
        {/* Contenu principal dans la colonne centrale */}
        <div className="space-y-8">
          {/* Header de test */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  🎯 Test Migration ActionsBar
                </h1>
                <p className="text-gray-600">
                  Barre d'actions dans la <strong>sidebar droite</strong> avec style "This.png"
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-green-600 font-medium">✅ Migration Terminée</div>
                <div className="text-xs text-gray-500">Gatsby → Next.js + Sidebar Droite</div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">👀 Regardez à droite !</h3>
              <p className="text-blue-800 text-sm">
                La barre d'actions est maintenant dans la <strong>sidebar droite</strong> (3ème colonne) 
                avec la disposition en 2 groupes comme sur mandjobore.com
              </p>
            </div>
          </div>

          {/* Section de validation */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              📋 Validation Sidebar Droite
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">✅ Style "This.png" Respecté</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Icônes dans des cercles blancs</li>
                  <li>• Ombre douce subtile</li>
                  <li>• Position sidebar droite (64px)</li>
                  <li>• Material-UI v7</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">🎯 Disposition mandjobore.com</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <strong>Groupe haut :</strong> Home, Search, Filter</li>
                  <li>• <strong>Groupe bas :</strong> Font, Fullscreen, Scroll</li>
                  <li>• Espacement vertical entre groupes</li>
                  <li>• Responsive overlay sur mobile</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Instructions de test */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-medium text-green-900 mb-3">🧪 Instructions de Test</h3>
            <ol className="list-decimal list-inside space-y-2 text-green-800 text-sm">
              <li>Vérifiez la <strong>sidebar droite</strong> avec les icônes en cercles blancs</li>
              <li>Testez le <strong>groupe du haut</strong> : Home, Search, Filter</li>
              <li>Testez le <strong>groupe du bas</strong> : Font Size, Fullscreen</li>
              <li>Scrollez pour voir apparaître "Retour en haut"</li>
              <li>Sur mobile : la barre devient un overlay en bas à droite</li>
              <li>Vérifiez les modals : filtre catégories et ajustement police</li>
            </ol>
          </div>

          {/* Fonctionnalités détaillées */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              🚀 Fonctionnalités dans la Sidebar
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mr-3">
                    🏠
                  </div>
                  <div>
                    <div className="font-medium">Home</div>
                    <div className="text-sm text-gray-600">Navigation accueil</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mr-3">
                    🔍
                  </div>
                  <div>
                    <div className="font-medium">Search</div>
                    <div className="text-sm text-gray-600">Recherche globale</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mr-3">
                    🏷️
                  </div>
                  <div>
                    <div className="font-medium">Filter</div>
                    <div className="text-sm text-gray-600">Filtre par catégorie</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mr-3">
                    📝
                  </div>
                  <div>
                    <div className="font-medium">Font Size</div>
                    <div className="text-sm text-gray-600">Ajustement police</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mr-3">
                    🖥️
                  </div>
                  <div>
                    <div className="font-medium">Fullscreen</div>
                    <div className="text-sm text-gray-600">Mode plein écran</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mr-3">
                    ⬆️
                  </div>
                  <div>
                    <div className="font-medium">Scroll Top</div>
                    <div className="text-sm text-gray-600">Retour en haut</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu pour tester le scroll */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">📜 Test du Scroll</h2>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium mb-3">Section de Scroll {i + 1}</h3>
                <p className="text-gray-600 mb-4">
                  Scrollez vers le bas pour voir apparaître le bouton "Retour en haut" 
                  dans le groupe du bas de la sidebar droite.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Migration:</strong> Gatsby → Next.js<br />
                      <strong>Style:</strong> This.png (cercles blancs)<br />
                      <strong>Position:</strong> Sidebar droite
                    </div>
                    <div>
                      <strong>Layout:</strong> 3 colonnes<br />
                      <strong>Responsive:</strong> Overlay mobile<br />
                      <strong>Groupes:</strong> Haut (nav) + Bas (outils)
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center py-8 border-t border-gray-200">
            <p className="text-gray-500">
              🎉 ActionsBar migrée avec succès dans la sidebar droite !<br />
              <span className="text-sm">Style "This.png" • Disposition mandjobore.com • 2 groupes</span>
            </p>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
