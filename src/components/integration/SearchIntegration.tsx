'use client';

import { useEffect } from 'react';

import { useMinimalFilters } from '../../store/ui-minimal';

interface SearchIntegrationProps {
  posts: Array<{
    slug: string;
    title: string;
    excerpt: string;
    category?: string | null;
    date: string;
  }>;
}

/**
 * Composant invisible pour synchroniser recherche et filtres
 * Implémente la logique de connexion entre SearchBar et Navigator
 */
export const SearchIntegration = ({ posts }: SearchIntegrationProps) => {
  const { categoryFilter, searchQuery, setCategoryFilter } = useMinimalFilters();

  // 🔄 Synchronisation automatique recherche ↔ filtres - CORRIGÉ
  useEffect(() => {
    if (searchQuery.length > 2) {
      // Mode recherche activé - garder le filtre actuel mais indiquer recherche active
      console.log('🔍 Mode recherche activé:', searchQuery);
    } else if (searchQuery.length === 0 && categoryFilter === 'search') {
      // Retour au filtre par défaut quand recherche vidée
      setCategoryFilter('all posts');
    }
    // PAS de setCategoryFilter dans les dépendances pour éviter la boucle !
  }, [searchQuery, categoryFilter]); // Supprimé setCategoryFilter des dépendances

  // Calcul des statistiques de recherche
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredResults = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      console.log(`📊 Recherche "${searchQuery}": ${filteredResults.length}/${posts.length} résultats`);
    }
  }, [searchQuery, posts]);

  return null; // Composant invisible, juste pour la logique
};

/**
 * Hook pour utiliser la recherche intégrée
 */
export const useIntegratedSearch = (posts: SearchIntegrationProps['posts']) => {
  const { categoryFilter, searchQuery } = useMinimalFilters();

  // Filtrage combiné recherche + catégorie
  const filteredPosts = posts.filter(post => {
    // Filtre par catégorie
    const categoryMatch = categoryFilter === 'all posts' || 
                         post.category === categoryFilter;

    // Filtre par recherche textuelle
    const searchMatch = searchQuery.length === 0 ||
                       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return categoryMatch && searchMatch;
  });

  // Statistiques
  const stats = {
    categoryActive: categoryFilter !== 'all posts',
    filtered: filteredPosts.length,
    hasActiveFilters: categoryFilter !== 'all posts' || searchQuery.length > 0,
    searchActive: searchQuery.length > 0,
    total: posts.length
  };

  return {
    filteredPosts,
    isLoading: false, // Pour compatibilité future
    stats
  };
};
