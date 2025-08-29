'use client';

import React, { useEffect, useRef } from 'react';
import { usePreferences } from '@/store/ui';

interface FontSizeDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}

const FONT_SIZES = [
  { label: '100%', value: 1.0 },
  { label: '125%', value: 1.25 },
  { label: '150%', value: 1.5 },
];

const FontSizeDropdown: React.FC<FontSizeDropdownProps> = ({ isOpen, onClose, anchorEl }) => {
  const { fontSize, setFontSize } = usePreferences();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Positionnement dynamique et visibilité contrôlée
  useEffect(() => {
    if (isOpen && anchorEl && dropdownRef.current) {
      const rect = anchorEl.getBoundingClientRect();
      const dropdown = dropdownRef.current;
      // Rendre invisible le temps de calculer la hauteur
      dropdown.style.visibility = 'hidden';
      dropdown.style.display = 'block';
      // Utiliser setTimeout pour attendre le layout
      setTimeout(() => {
        const height = dropdown.offsetHeight;
        dropdown.style.position = 'fixed';
        dropdown.style.top = `${rect.top - height - 8}px`;
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.right = '';
        dropdown.style.zIndex = '1000';
        dropdown.style.visibility = 'visible';
      }, 0);
    }
  }, [isOpen, anchorEl]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, anchorEl]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleFontSizeSelect = (value: number) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value * 16}px`;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0, // sera ajusté dynamiquement
        left: 0, // sera ajusté dynamiquement
        zIndex: 1000,
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        border: '1px solid rgba(0,0,0,0.08)',
        minWidth: '140px',
        padding: '6px 0',
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#222',
        outline: 'none',
        visibility: 'hidden', // visible après positionnement
      }}
    >
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {FONT_SIZES.map(opt => (
          <li key={opt.value}>
            <button
              type="button"
              onClick={() => handleFontSizeSelect(opt.value)}
              style={{
                width: '100%',
                background: Math.abs(fontSize - opt.value) < 0.01 ? '#e6f0fa' : 'transparent',
                color: '#222',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'Arial, sans-serif',
                fontSize: '18px',
                padding: '7px 18px',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: 400,
                transition: 'background 0.18s',
                marginBottom: '2px',
              }}
              onMouseEnter={e => {
                if (Math.abs(fontSize - opt.value) >= 0.01) {
                  e.currentTarget.style.background = '#f5faff';
                }
              }}
              onMouseLeave={e => {
                if (Math.abs(fontSize - opt.value) >= 0.01) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FontSizeDropdown;
