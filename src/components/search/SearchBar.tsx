'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useFilters } from '../../store/ui';
import { useSearchSuggestions } from '../../hooks/useSearch';

interface SearchBarProps {
  posts: Array<{
    slug: string;
    title: string;
    excerpt: string;
    category?: string | null;
    date: string;
  }>;
  placeholder?: string;
  compact?: boolean;
}

/**
 * Barre de recherche avancée avec suggestions
 * Style moderne Gmail/Material Design
 */
export default function SearchBar({ 
  posts, 
  placeholder = "Rechercher dans les articles...", 
  compact = false 
}: SearchBarProps) {
  const { searchQuery, setSearchQuery } = useFilters();
  const [isActive, setIsActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestions = useSearchSuggestions(posts, searchQuery);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0 && suggestions.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div
      className="search-bar-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: compact ? '200px' : '100%'
      }}
    >
      <div
        className="search-input-wrapper"
        style={{
          position: 'relative',
          background: '#ffffff',
          borderRadius: '8px',
          border: `2px solid ${isActive ? '#4285f4' : '#e0e0e0'}`,
          transition: 'all 0.2s ease',
          boxShadow: isActive ? '0 2px 8px rgba(66, 133, 244, 0.2)' : '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        {/* Icône de recherche */}
        <div
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '16px',
            color: isActive ? '#4285f4' : '#9e9e9e',
            transition: 'color 0.2s ease'
          }}
        >
          🔍
        </div>

        {/* Champ de saisie */}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => {
            setIsActive(true);
            if (searchQuery.length > 0 && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: compact ? '8px 40px 8px 40px' : '12px 40px 12px 40px',
            border: 'none',
            outline: 'none',
            fontSize: compact ? '13px' : '14px',
            background: 'transparent',
            color: '#333',
            fontFamily: "'Open Sans', Arial, sans-serif"
          }}
        />

        {/* Bouton effacer */}
        {searchQuery && (
          <button
            onClick={handleClear}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '16px',
              color: '#9e9e9e',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '50%',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            ✕
          </button>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          className="search-suggestions"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid #e0e0e0',
            zIndex: 1000,
            marginTop: '4px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '10px 12px',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#333',
                borderBottom: index < suggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                transition: 'background-color 0.1s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span style={{ marginRight: '8px', color: '#9e9e9e' }}>🔍</span>
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {/* Indicateur de résultats */}
      {searchQuery && !showSuggestions && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            padding: '8px 12px',
            background: '#f8f9fa',
            border: '1px solid #e0e0e0',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            fontSize: '12px',
            color: '#666',
            textAlign: 'center'
          }}
        >
          Appuyez sur Entrée pour rechercher "{searchQuery}"
        </div>
      )}
    </div>
  );
}
