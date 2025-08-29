'use client';

import React from 'react';

/**
 * Composant squelette pour les articles en cours de chargement
 * Améliore l'UX pendant les transitions
 */
export const ArticleSkeleton = () => (
  <div
    style={{
      padding: '16px 20px',
      borderBottom: '1px solid #f0f0f0',
      animation: 'pulse 1.5s ease-in-out infinite alternate'
    }}
  >
    <div
      className="skeleton-line"
      style={{
        width: '70%',
        height: '20px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        borderRadius: '4px',
        marginBottom: '8px',
        animation: 'shimmer 1.5s infinite'
      }}
    />
    <div
      className="skeleton-line"
      style={{
        width: '90%',
        height: '14px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        borderRadius: '4px',
        marginBottom: '6px',
        animation: 'shimmer 1.5s infinite',
        animationDelay: '0.2s'
      }}
    />
    <div
      className="skeleton-line"
      style={{
        width: '80%',
        height: '14px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        borderRadius: '4px',
        marginBottom: '12px',
        animation: 'shimmer 1.5s infinite',
        animationDelay: '0.4s'
      }}
    />
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          width: '60px',
          height: '20px',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          borderRadius: '10px',
          animation: 'shimmer 1.5s infinite',
          animationDelay: '0.6s'
        }}
      />
      <div
        style={{
          width: '80px',
          height: '12px',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          borderRadius: '6px',
          animation: 'shimmer 1.5s infinite',
          animationDelay: '0.8s'
        }}
      />
    </div>

    <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: -200px 0;
        }
        100% {
          background-position: calc(200px + 100%) 0;
        }
      }

      @keyframes pulse {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0.8;
        }
      }

      .skeleton-line {
        background-size: 200px 100%;
        background-repeat: no-repeat;
      }
    `}</style>
  </div>
);

/**
 * Container de squelettes pour simuler une liste d'articles
 */
export const ArticleSkeletonList = ({ count = 5 }: { count?: number }) => (
  <div style={{ width: '100%' }}>
    {Array.from({ length: count }).map((_, i) => (
      <ArticleSkeleton key={i} />
    ))}
  </div>
);

/**
 * Squelette spécialisé pour la recherche
 */
export const SearchSkeleton = () => (
  <div
    style={{
      padding: '20px',
      textAlign: 'center',
      color: '#666',
      fontSize: '14px'
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '3px solid #f0f0f0',
        borderTop: '3px solid #4285f4',
        borderRadius: '50%',
        margin: '0 auto 12px',
        animation: 'spin 1s linear infinite'
      }}
    />
    <div>Recherche en cours...</div>

    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

/**
 * Hook pour gérer les états de chargement
 */
export const useLoadingStates = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);
  const showSearching = () => setIsSearching(true);
  const hideSearching = () => setIsSearching(false);

  return {
    isLoading,
    isSearching,
    showLoading,
    hideLoading,
    showSearching,
    hideSearching
  };
};
