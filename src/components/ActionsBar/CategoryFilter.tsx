/**
 * TODO/MIGRATION BLOCK - CategoryFilter.tsx
 * - Component: CategoryFilter (Filtre par catégories)
 * - Migration target: Gatsby CategoryFilter to Next.js + Emotion/MUI
 * - Date: 2024-01-XX
 * - Removed: JSS injectSheet, Popper complex logic
 * - Refactor: Temporary simple IconButton implementation
 * - Theme access: Basic theme colors
 * - Pattern: Will be expanded with dropdown/modal later
 * - Last migration commit: feat(migration): migrate CategoryFilter.tsx to Emotion/MUI
 * - Dev referent: Next.js migration team
 */

'use client';

import React from 'react';
import { IconButton } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface CategoryFilterProps {
  categories: string[];
  onFilterCategory: (category: string) => void;
}

const FilterButton = styled(IconButton)(({ theme }) => ({
  color: theme.bars?.colors?.icon || '#555',
}));

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  onFilterCategory 
}) => {
  const handleClick = () => {
    // TODO: Implémenter dropdown ou modal
    onFilterCategory('GIS Analysis');
  };
  
  return (
    <FilterButton
      aria-label="Filter by category"
      onClick={handleClick}
      title="Filter the list by category"
    >
      <FilterList />
    </FilterButton>
  );
};

export default CategoryFilter; 