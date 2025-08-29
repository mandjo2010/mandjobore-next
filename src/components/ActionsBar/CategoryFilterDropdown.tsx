'use client';

import React, { useEffect, useRef } from 'react';

import { useUIStore } from '@/store/ui';
import animations from '@/styles/AdvancedAnimations.module.css';

interface CategoryFilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  categories: string[];
}

// Liste des catégories disponibles (à adapter selon votre contenu)
const CATEGORIES = [
  { count: 0, id: 'all posts', label: 'all posts' },
  { count: 3, id: 'programmation', label: 'Data viz' },
  { count: 2, id: 'design', label: 'Satellite' },
  { count: 4, id: 'intelligence-artificielle', label: 'Spatial Data' },
  { count: 5, id: 'data-science', label: 'Agro' },
];

const CategoryFilterDropdown: React.FC<CategoryFilterDropdownProps> = ({ 
  anchorEl, 
  categories, 
  isOpen,
  onClose 
}) => {
  const { categoryFilter, setCategoryFilter } = useUIStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Position the dropdown directly under the anchor element
  useEffect(() => {
    if (isOpen && anchorEl && dropdownRef.current) {
      const rect = anchorEl.getBoundingClientRect();
      const dropdown = dropdownRef.current;
      
      // Position to the left of the button with proper spacing
      dropdown.style.position = 'fixed';
      dropdown.style.top = `${rect.bottom + 12}px`; // More space between icon and dropdown
      dropdown.style.right = `${window.innerWidth - rect.right + 8}px`; // Position to the left of the icon
      dropdown.style.zIndex = '1000';
    }
  }, [isOpen, anchorEl]);

  // Close on outside click
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

  // Close on escape key
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

  const handleCategorySelect = (categoryId: string) => {
    setCategoryFilter(categoryId);
    onClose();
  };

  if (!isOpen) return null;

  // Use dynamic categories if provided, otherwise use default ones
  const categoriesToShow = categories.length > 0 
    ? ['all posts', ...categories]
    : CATEGORIES.map(cat => cat.label);

  return (
    <div 
      ref={dropdownRef}
      role="dialog" 
      aria-modal="true" 
      className={`catDialog ${animations.elegantDropdown} ${isOpen ? animations.open : ''}`}
      style={{
        backdropFilter: 'blur(10px)',
        background: 'rgba(255,255,255,0.98)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        display: 'block',
        height: 'auto',
        inset: 'auto',
        position: 'fixed',
        width: 'auto',
        zIndex: 1000,
      }}
    >
      <div className={`catBox ${animations.navigationFeatured}`} style={{ minWidth: '180px', padding: '8px 12px' }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {categoriesToShow.map((c, index) => (
            <li key={c} style={{ marginBottom: '2px' }}>
              <button
                className={`${c === categoryFilter ? 'isActive' : ''} ${animations.interactiveElement} ${animations.feedbackElement}`}
                onClick={() => handleCategorySelect(c)}
                style={{
                  background: c === categoryFilter ? '#f0f8ff' : 'transparent',
                  animationDelay: `${index * 0.05}s`,
                  border: 'none',
                  borderRadius: '6px',
                  color: 'rgba(0, 0, 0, 0.87)',
                  cursor: 'pointer',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '27px',
                  padding: '6px 10px',
                  textAlign: 'left',
                  transition: 'background-color 0.2s ease',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  if (c !== categoryFilter) {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (c !== categoryFilter) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilterDropdown;
