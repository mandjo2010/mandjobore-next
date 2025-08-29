'use client';

import React, { useState } from 'react';
import { useNavigatorActions } from '../../store/ui';

/**
 * Navigation mobile - Burger menu et overlay
 * Apparaît uniquement sur mobile/tablette
 */
export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { moveNavigatorFeatured } = useNavigatorActions();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigatorToggle = () => {
    // Utiliser les actions du système Gatsby original
    moveNavigatorFeatured();
    setIsOpen(false);
  };

  return (
    <>
      {/* Bouton hamburger */}
      <button
        onClick={toggleMenu}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 1000,
          background: '#ffffff',
          border: '2px solid #e0e0e0',
          borderRadius: '8px',
          width: '44px',
          height: '44px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f5f5f5';
          e.currentTarget.style.borderColor = '#4285f4';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#ffffff';
          e.currentTarget.style.borderColor = '#e0e0e0';
        }}
      >
        <div
          style={{
            width: '18px',
            height: '2px',
            background: '#333',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
            transform: isOpen ? 'rotate(45deg) translateY(6px)' : 'none'
          }}
        />
        <div
          style={{
            width: '18px',
            height: '2px',
            background: '#333',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
            opacity: isOpen ? 0 : 1
          }}
        />
        <div
          style={{
            width: '18px',
            height: '2px',
            background: '#333',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
            transform: isOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
          }}
        />
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            transition: 'opacity 0.3s ease'
          }}
          onClick={toggleMenu}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '280px',
              height: '100vh',
              background: '#ffffff',
              boxShadow: '2px 0 20px rgba(0,0,0,0.3)',
              transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.3s ease',
              padding: '80px 20px 20px',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ 
              margin: '0 0 20px 0', 
              fontSize: '18px',
              fontWeight: '600',
              color: '#333',
              borderBottom: '2px solid #f0f0f0',
              paddingBottom: '12px'
            }}>
              Navigation
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleNavigatorToggle}
                style={{
                  background: 'none',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#333',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.borderColor = '#4285f4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
              >
                📋 Articles
              </button>

              <button
                onClick={() => {
                  window.location.href = '/';
                  setIsOpen(false);
                }}
                style={{
                  background: 'none',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#333',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.borderColor = '#4285f4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
              >
                🏠 Accueil
              </button>

              <button
                onClick={() => {
                  window.location.href = '/pages/about';
                  setIsOpen(false);
                }}
                style={{
                  background: 'none',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#333',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.borderColor = '#4285f4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
              >
                👤 À propos
              </button>

              <button
                onClick={() => {
                  window.location.href = '/contact';
                  setIsOpen(false);
                }}
                style={{
                  background: 'none',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#333',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.borderColor = '#4285f4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
              >
                📧 Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
