import { useMemo } from 'react';
import { useFilters } from '../store/ui';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category?: string | null;
  date: string;
  content?: string;
}

/**
 * Hook de recherche et filtrage des posts
 * Réplique la logique de recherche de Gatsby
 */
export function useSearch(posts: Post[]) {
  const { categoryFilter, searchQuery } = useFilters();

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filtre par catégorie principale
    if (categoryFilter && categoryFilter !== 'all posts') {
      result = result.filter(post => 
        post.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Recherche textuelle (titre, excerpt, contenu)
    if (searchQuery && searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(post => {
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category?.toLowerCase().includes(query) ||
          (post.content && post.content.toLowerCase().includes(query))
        );
      });
    }

    // Tri par date (plus récent en premier)
    return result.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [posts, categoryFilter, searchQuery]);

  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    posts.forEach(post => {
      if (post.category) {
        categorySet.add(post.category);
      }
    });
    return Array.from(categorySet).sort();
  }, [posts]);

  const searchStats = useMemo(() => ({
    totalPosts: posts.length,
    filteredPosts: filteredPosts.length,
    hasActiveFilters: categoryFilter !== 'all posts' || 
                     searchQuery.length > 0,
    categoriesCount: categories.length
  }), [posts.length, filteredPosts.length, categoryFilter, searchQuery, categories.length]);

  return {
    filteredPosts,
    categories,
    searchStats
  };
}

/**
 * Hook pour les suggestions de recherche
 */
export function useSearchSuggestions(posts: Post[], query: string) {
  return useMemo(() => {
    if (!query || query.length < 2) return [];

    const suggestions = new Set<string>();
    const queryLower = query.toLowerCase();

    posts.forEach(post => {
      // Suggestions de titres
      if (post.title.toLowerCase().includes(queryLower)) {
        suggestions.add(post.title);
      }

      // Suggestions de catégories
      if (post.category && post.category.toLowerCase().includes(queryLower)) {
        suggestions.add(post.category);
      }

      // Suggestions de mots clés de l'excerpt
      const words = post.excerpt.toLowerCase().split(/\s+/);
      words.forEach(word => {
        if (word.length > 3 && word.includes(queryLower)) {
          suggestions.add(word);
        }
      });
    });

    return Array.from(suggestions).slice(0, 8);
  }, [posts, query]);
}
