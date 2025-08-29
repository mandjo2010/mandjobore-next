'use client';

import { useEffect } from 'react';
import { useMinimalFilters } from '../store/ui-minimal';

/**
 * Composant d'intégration de recherche
 * Synchronise automatiquement recherche et filtres
 * VERSION CORRIGÉE pour éviter les boucles infinies
 */
export default function SearchIntegration() {
  const { searchQuery, categoryFilter, setCategoryFilter } = useMinimalFilters();

  // Synchronisation automatique recherche ↔ filtres - CORRIGÉ
  useEffect(() => {
    if (searchQuery.length > 2) {
      // Mode recherche activé
      if (categoryFilter !== 'search') {
        setCategoryFilter('search');
      }
    } else if (categoryFilter === 'search') {
      // Retour à tous les articles quand recherche vide
      setCategoryFilter('all posts');
    }
    // PAS de setCategoryFilter dans les dépendances pour éviter la boucle !
  }, [searchQuery, categoryFilter]); // Supprimé setCategoryFilter des dépendances

  return null; // Composant invisible, juste pour la logique
}
