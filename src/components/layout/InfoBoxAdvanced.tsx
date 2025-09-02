'use client';

import React from 'react';

/**
 * InfoBox - Colonne gauche style Gmail
 * Navigation principale, profil, et menu
 */
export default function InfoBoxAdvanced() {
  return (
    <div
      className="info-box-advanced"
      style={{
        background: '#ffffff',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Open Sans', Arial, sans-serif",
        height: '100vh',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {/* Section Profil */}
      <div
        className="profile-section"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderBottom: '1px solid #f0f0f0',
          color: 'white',
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <div
          className="avatar"
          style={{
            alignItems: 'center',
            background: '#ffffff',
            border: '3px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            color: '#667eea',
            display: 'flex',
            fontSize: '32px',
            fontWeight: 'bold',
            height: '80px',
            justifyContent: 'center',
            margin: '0 auto 12px',
            width: '80px'
          }}
        >
          MB
        </div>
        <h2
          style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 4px 0'
          }}
        >
          Mandjo Béa Boré
        </h2>
        <p
          style={{
            fontSize: '12px',
            fontWeight: '300',
            margin: '0',
            opacity: 0.9
          }}
        >
          Data analyst - Developer
        </p>
      </div>

      {/* Navigation principale */}
      <nav
        className="main-nav"
        style={{
          borderBottom: '1px solid #f0f0f0',
          flex: 1,
          padding: '16px 0'
        }}
      >
        <NavItem icon="📥" label="Articles récents" active count={12} />
        <NavItem icon="⭐" label="Favoris" count={5} />
        <NavItem icon="📂" label="Catégories" count={7} />
        <NavItem icon="🔍" label="Recherche" />
        <NavItem icon="📄" label="Pages" count={3} />
        <NavItem icon="💼" label="Portfolio" />
        <NavItem icon="📞" label="Contact" />
      </nav>

      {/* Catégories */}
      <div
        className="categories-section"
        style={{
          borderBottom: '1px solid #f0f0f0',
          padding: '16px 0'
        }}
      >
        <div
          style={{
            color: '#888',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '1px',
            marginBottom: '8px',
            padding: '0 20px 12px',
            textTransform: 'uppercase'
          }}
        >
          🏷️ Catégories
        </div>
        <CategoryItem label="Développement" color="#27ae60" count={3} />
        <CategoryItem label="Data viz" color="#3498db" count={4} />
        <CategoryItem label="Spatial Data" color="#e74c3c" count={3} />
        <CategoryItem label="Agro" color="#f39c12" count={2} />
        <CategoryItem label="Technologie" color="#9b59b6" count={1} />
      </div>

      {/* Réseaux sociaux */}
      <div
        className="social-section"
        style={{
          background: '#fafafa',
          borderTop: '1px solid #f0f0f0',
          padding: '16px 20px'
        }}
      >
        <div
          style={{
            color: '#888',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '1px',
            marginBottom: '12px',
            textTransform: 'uppercase'
          }}
        >
          🔗 Liens
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <SocialIcon icon="🐙" label="GitHub" />
          <SocialIcon icon="💼" label="LinkedIn" />
          <SocialIcon icon="🐦" label="Twitter" />
          <SocialIcon icon="📧" label="Email" />
        </div>
      </div>
    </div>
  );
}

// Composant NavItem
interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  count?: number;
}

function NavItem({ active = false, count, icon, label }: NavItemProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        background: active ? 'rgba(39, 174, 96, 0.1)' : 'transparent',
        borderLeft: active ? '3px solid #27ae60' : '3px solid transparent',
        cursor: 'pointer',
        display: 'flex',
        padding: '8px 20px',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      <span style={{ fontSize: '16px', marginRight: '12px' }}>{icon}</span>
      <span
        style={{
          color: active ? '#27ae60' : '#555',
          flex: 1,
          fontSize: '14px',
          fontWeight: active ? '500' : '400'
        }}
      >
        {label}
      </span>
      {count && (
        <span
          style={{
            background: active ? '#27ae60' : '#ddd',
            borderRadius: '10px',
            color: active ? 'white' : '#666',
            fontSize: '11px',
            minWidth: '18px',
            padding: '2px 6px',
            textAlign: 'center'
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}

// Composant CategoryItem
interface CategoryItemProps {
  label: string;
  color: string;
  count: number;
}

function CategoryItem({ color, count, label }: CategoryItemProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        padding: '6px 20px',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <div
        style={{
          background: color,
          borderRadius: '50%',
          height: '8px',
          marginRight: '10px',
          width: '8px'
        }}
      />
      <span
        style={{
          color: '#555',
          flex: 1,
          fontSize: '13px'
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: '#888',
          fontSize: '11px'
        }}
      >
        {count}
      </span>
    </div>
  );
}

// Composant SocialIcon
interface SocialIconProps {
  icon: string;
  label: string;
}

function SocialIcon({ icon, label }: SocialIconProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        padding: '4px',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      title={label}
    >
      <span style={{ fontSize: '18px', marginBottom: '2px' }}>{icon}</span>
      <span style={{ color: '#666', fontSize: '9px' }}>
        {label.substring(0, 3)}
      </span>
    </div>
  );
}
