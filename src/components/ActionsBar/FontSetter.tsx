/**
 * TODO/MIGRATION BLOCK - FontSetter.tsx
 * - Component: FontSetter (Contrôle taille police)
 * - Migration target: Gatsby FontSetter to Next.js + Emotion/MUI
 * - Date: 2024-01-XX
 * - Removed: JSS injectSheet, Popper complex logic
 * - Refactor: Temporary simple IconButton implementation
 * - Theme access: Basic theme colors
 * - Pattern: Will be expanded with dropdown/modal later
 * - Last migration commit: feat(migration): migrate FontSetter.tsx to Emotion/MUI
 * - Dev referent: Next.js migration team
 */

'use client';

import React from 'react';
import { IconButton } from '@mui/material';
import { FormatSize } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface FontSetterProps {
  onIncreaseFont: (value: number) => void;
}

const FontButton = styled(IconButton)(({ theme }) => ({
  color: theme.bars?.colors?.icon || '#555',
}));

const FontSetter: React.FC<FontSetterProps> = ({ onIncreaseFont }) => {
  const handleClick = () => {
    // TODO: Implémenter dropdown ou modal
    onIncreaseFont(1.2);
  };
  
  return (
    <FontButton
      aria-label="Change font size"
      onClick={handleClick}
      title="Change font size"
    >
      <FormatSize />
    </FontButton>
  );
};

export default FontSetter; 