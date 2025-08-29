'use client';

import React, { useState } from 'react';

interface ActionsBarProps {
  categories?: string[];
}

/**
 * ActionsBar Avancée - Colonne droite style Gmail
 * Filtres, actions, et outils
 */
export default function ActionsBarAdvanced({ categories = [] }: ActionsBarProps) {
  const [selectedCategory, setSelectedCategory] = useState('all posts');
  const [fontSize, setFontSize] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div
      className="actions-bar-advanced"
      style={{
        width: '100%',
        height: '100vh',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Open Sans', Arial, sans-serif",
        overflow: 'hidden',
        borderLeft: '1px solid #e0e0e0'
      }}
    >
      {/* Actions principales */}
      <div
        className="main-actions"
        style={{
          padding: '12px 0',
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        <ActionButton icon="✏️" tooltip="Écrire" primary />
        <ActionButton icon="🔍" tooltip="Rechercher" />
        <ActionButton icon="⭐" tooltip="Favoris" />
        <ActionButton icon="📤" tooltip="Partager" />
      </div>

      {/* Filtres par catégorie */}
      <div
        className="category-filters"
        style={{
          padding: '12px 0',
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        <div
          style={{
            fontSize: '9px',
            fontWeight: '600',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textAlign: 'center',
            marginBottom: '8px'
          }}
        >
          Filtres
        </div>
        
        <FilterButton
          icon="📋"
          tooltip="Tous"
          active={selectedCategory === 'all posts'}
          onClick={() => setSelectedCategory('all posts')}
        />
        
        {categories.map((category) => (
          <FilterButton
            key={category}
            icon={getCategoryIcon(category)}
            tooltip={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>

      {/* Contrôles d'affichage */}
      <div
        className="display-controls"
        style={{
          padding: '12px 0',
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        <div
          style={{
            fontSize: '9px',
            fontWeight: '600',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textAlign: 'center',
            marginBottom: '8px'
          }}
        >
          Affichage
        </div>

        {/* Contrôle taille police */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '12px'
          }}
        >
          <button
            onClick={() => setFontSize(Math.min(fontSize + 0.1, 1.5))}
            style={{
              width: '40px',
              height: '32px',
              border: 'none',
              background: '#f8f9fa',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              marginBottom: '4px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e9ecef';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f8f9fa';
            }}
            title="Augmenter la taille"
          >
            A⁺
          </button>
          
          <div
            style={{
              fontSize: '8px',
              color: '#666',
              marginBottom: '4px'
            }}
          >
            {Math.round(fontSize * 100)}%
          </div>
          
          <button
            onClick={() => setFontSize(Math.max(fontSize - 0.1, 0.8))}
            style={{
              width: '40px',
              height: '32px',
              border: 'none',
              background: '#f8f9fa',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e9ecef';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f8f9fa';
            }}
            title="Diminuer la taille"
          >
            A⁻
          </button>
        </div>

        {/* Plein écran */}
        <ActionButton
          icon={isFullscreen ? "📱" : "🖥️"}
          tooltip={isFullscreen ? "Fenêtré" : "Plein écran"}
          active={isFullscreen}
          onClick={() => setIsFullscreen(!isFullscreen)}
        />
      </div>

      {/* Outils rapides */}
      <div
        className="quick-tools"
        style={{
          padding: '12px 0',
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        <div
          style={{
            fontSize: '9px',
            fontWeight: '600',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textAlign: 'center',
            marginBottom: '8px'
          }}
        >
          Outils
        </div>
        
        <ActionButton icon="📊" tooltip="Statistiques" />
        <ActionButton icon="⚙️" tooltip="Paramètres" />
        <ActionButton icon="💡" tooltip="Aide" />
        <ActionButton icon="🌓" tooltip="Mode sombre" />
      </div>

      {/* Scroll to top */}
      <div
        style={{
          marginTop: 'auto',
          padding: '12px 0'
        }}
      >
        <ActionButton
          icon="⬆️"
          tooltip="Haut de page"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </div>
    </div>
  );
}

// Composant ActionButton
interface ActionButtonProps {
  icon: string;
  tooltip: string;
  primary?: boolean;
  active?: boolean;
  onClick?: () => void;
}

function ActionButton({ icon, tooltip, primary = false, active = false, onClick }: ActionButtonProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '8px'
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: '44px',
          height: '44px',
          border: 'none',
          borderRadius: '8px',
          background: primary
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : active
            ? 'rgba(39, 174, 96, 0.1)'
            : '#f8f9fa',
          color: primary ? 'white' : active ? '#27ae60' : '#555',
          fontSize: '18px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: primary ? '0 2px 8px rgba(102, 126, 234, 0.3)' : 'none'
        }}
        onMouseEnter={(e) => {
          if (!primary) {
            e.currentTarget.style.background = active ? 'rgba(39, 174, 96, 0.2)' : '#e9ecef';
          }
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          if (!primary) {
            e.currentTarget.style.background = active ? 'rgba(39, 174, 96, 0.1)' : '#f8f9fa';
          }
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        title={tooltip}
      >
        {icon}
      </button>
    </div>
  );
}

// Composant FilterButton
interface FilterButtonProps {
  icon: string;
  tooltip: string;
  active?: boolean;
  onClick?: () => void;
}

function FilterButton({ icon, tooltip, active = false, onClick }: FilterButtonProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '6px'
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '6px',
          background: active ? 'rgba(39, 174, 96, 0.15)' : '#f8f9fa',
          color: active ? '#27ae60' : '#555',
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: active ? '2px solid #27ae60' : '2px solid transparent'
        }}
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.background = '#e9ecef';
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.background = '#f8f9fa';
          }
        }}
        title={tooltip}
      >
        {icon}
      </button>
    </div>
  );
}

// Fonction pour obtenir l'icône d'une catégorie
function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Développement': '💻',
    'Data viz': '📊',
    'Spatial Data': '🗺️',
    'Agro': '🌱',
    'Technologie': '⚡',
    'Design': '🎨',
    'Satellite': '🛰️'
  };
  return icons[category] || '📁';
}
