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
        width: '100%',
        height: '100vh',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Open Sans', Arial, sans-serif",
        overflow: 'hidden',
        borderRight: '1px solid #e0e0e0'
      }}
    >
      {/* Section Profil */}
      <div
        className="profile-section"
        style={{
          padding: '20px',
          textAlign: 'center',
          borderBottom: '1px solid #f0f0f0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <div
          className="avatar"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#ffffff',
            margin: '0 auto 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            color: '#667eea',
            fontWeight: 'bold',
            border: '3px solid rgba(255,255,255,0.3)'
          }}
        >
          MB
        </div>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 4px 0',
            color: 'white'
          }}
        >
          Mandjo Béa Boré
        </h2>
        <p
          style={{
            fontSize: '12px',
            margin: '0',
            opacity: 0.9,
            fontWeight: '300'
          }}
        >
          Data Analyst & Developer
        </p>
      </div>

      {/* Navigation principale */}
      <nav
        className="main-nav"
        style={{
          flex: 1,
          padding: '16px 0',
          borderBottom: '1px solid #f0f0f0'
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
          padding: '16px 0',
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: '600',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            padding: '0 20px 12px',
            marginBottom: '8px'
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
          padding: '16px 20px',
          borderTop: '1px solid #f0f0f0',
          background: '#fafafa'
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: '600',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '12px'
          }}
        >
          🔗 Liens
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
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

function NavItem({ icon, label, active = false, count }: NavItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 20px',
        cursor: 'pointer',
        background: active ? 'rgba(39, 174, 96, 0.1)' : 'transparent',
        borderLeft: active ? '3px solid #27ae60' : '3px solid transparent',
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
          fontSize: '14px',
          color: active ? '#27ae60' : '#555',
          fontWeight: active ? '500' : '400',
          flex: 1
        }}
      >
        {label}
      </span>
      {count && (
        <span
          style={{
            fontSize: '11px',
            background: active ? '#27ae60' : '#ddd',
            color: active ? 'white' : '#666',
            padding: '2px 6px',
            borderRadius: '10px',
            minWidth: '18px',
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

function CategoryItem({ label, color, count }: CategoryItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '6px 20px',
        cursor: 'pointer',
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
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: color,
          marginRight: '10px'
        }}
      />
      <span
        style={{
          fontSize: '13px',
          color: '#555',
          flex: 1
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '11px',
          color: '#888'
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '4px',
        borderRadius: '6px',
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
      <span style={{ fontSize: '9px', color: '#666' }}>
        {label.substring(0, 3)}
      </span>
    </div>
  );
}
