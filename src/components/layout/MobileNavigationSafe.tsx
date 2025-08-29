'use client';

import Link from 'next/link'
import * as React from 'react'
import { useState } from 'react'
import { useMinimalFilters } from '../../store/ui-minimal'
import { useStaticResponsive } from '../../hooks/useStaticResponsive'

/**
 * Navigation mobile - Version TEST avec store minimal
 * - Version simplifiée pour éliminer les boucles
 */
export const MobileNavigation = () => {
  const { isMobile, isTablet } = useStaticResponsive();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { categoryFilter, setCategoryFilter } = useMinimalFilters();

  // N'afficher que sur mobile/tablette
  if (!isMobile && !isTablet) return null;

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  const categories = [
    { id: 'all posts', label: '📋 Tous les articles', icon: '📋' },
    { id: 'Développement', label: '💻 Développement', icon: '💻' },
    { id: 'Data viz', label: '📊 Data Viz', icon: '📊' },
    { id: 'Spatial Data', label: '🗺️ Données Spatiales', icon: '🗺️' },
    { id: 'Agro', label: '🌱 Agriculture', icon: '🌱' },
    { id: 'Satellite', label: '🛰️ Satellite', icon: '🛰️' },
  ];

  return (
    <>
      {/* Bouton hamburger flottant */}
      <button
        onClick={toggleNav}
        className="mobile-menu-toggle"
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 1000,
          background: '#ffffff',
          border: '2px solid #e0e0e0',
          borderRadius: '12px',
          width: '48px',
          height: '48px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
          transform: isNavOpen ? 'rotate(90deg)' : 'rotate(0deg)'
        }}
        onMouseEnter={(e) => {
          if (!isNavOpen) {
            e.currentTarget.style.background = '#f8f9fa';
            e.currentTarget.style.borderColor = '#4285f4';
          }
        }}
        onMouseLeave={(e) => {
          if (!isNavOpen) {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.borderColor = '#e0e0e0';
          }
        }}
      >
        <div
          style={{
            width: '20px',
            height: '2px',
            background: '#333',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
            transform: isNavOpen ? 'rotate(45deg) translateY(6px)' : 'none'
          }}
        />
        <div
          style={{
            width: '20px',
            height: '2px',
            background: '#333',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
            opacity: isNavOpen ? 0 : 1
          }}
        />
        <div
          style={{
            width: '20px',
            height: '2px',
            background: '#333',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
            transform: isNavOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
          }}
        />
      </button>

      {/* Overlay avec navigation */}
      {isNavOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 999,
            transition: 'opacity 0.3s ease',
            backdropFilter: 'blur(4px)'
          }}
          onClick={closeNav}
        >
          {/* Panel de navigation */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: isMobile ? '280px' : '320px',
              height: '100vh',
              background: '#ffffff',
              boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
              transform: 'translateX(0)',
              transition: 'transform 0.3s ease',
              padding: '80px 24px 24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* En-tête */}
            <div style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '16px' }}>
              <h2 style={{ 
                margin: 0, 
                fontSize: '20px',
                fontWeight: '600',
                color: '#333',
                fontFamily: "'Open Sans', sans-serif"
              }}>
                Navigation
              </h2>
            </div>

            {/* Navigation principale */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Pages
              </h3>
              
              <Link 
                href="/" 
                onClick={closeNav}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  textDecoration: 'none',
                  color: '#333',
                  fontSize: '15px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.borderColor = '#4285f4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
              >
                🏠 Accueil
              </Link>

              <Link 
                href="/pages/about" 
                onClick={closeNav}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  textDecoration: 'none',
                  color: '#333',
                  fontSize: '15px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.borderColor = '#4285f4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
              >
                👤 À propos
              </Link>
            </div>

            {/* Filtres par catégorie */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Catégories
              </h3>
              
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setCategoryFilter(category.id);
                    closeNav();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: `1px solid ${categoryFilter === category.id ? '#4285f4' : '#e0e0e0'}`,
                    background: categoryFilter === category.id ? '#f0f7ff' : 'transparent',
                    color: categoryFilter === category.id ? '#4285f4' : '#333',
                    fontSize: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (categoryFilter !== category.id) {
                      e.currentTarget.style.background = '#f8f9fa';
                      e.currentTarget.style.borderColor = '#4285f4';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (categoryFilter !== category.id) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = '#e0e0e0';
                    }
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavigation;
