'use client';

import { Close as CloseIcon, FilterList as FilterIcon } from '@mui/icons-material';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Chip,
  Box
} from '@mui/material';
import React from 'react';

import { useUIStore } from '@/store/ui';

interface CategoryFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Liste des catégories disponibles (à adapter selon votre contenu)
const CATEGORIES = [
  { count: 0, id: 'all posts', label: 'Tous les articles' },
  { count: 3, id: 'programmation', label: 'Programmation' },
  { count: 2, id: 'design', label: 'Design' },
  { count: 4, id: 'intelligence-artificielle', label: 'Intelligence Artificielle' },
  { count: 5, id: 'data-science', label: 'Data Science' },
  { count: 6, id: 'gis', label: 'Systèmes d\'Information Géographique' },
  { count: 3, id: 'web-development', label: 'Développement Web' },
  { count: 2, id: 'machine-learning', label: 'Machine Learning' }
];

const CategoryFilterModal: React.FC<CategoryFilterModalProps> = ({ isOpen, onClose }) => {
  const { categoryFilter, resetFilters, setCategoryFilter } = useUIStore();

  const handleCategorySelect = (categoryId: string) => {
    setCategoryFilter(categoryId);
    onClose();
  };

  const handleReset = () => {
    resetFilters();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
        }
      }}
    >
      <DialogTitle
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          pb: 1
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
          <FilterIcon sx={{ color: '#709425' }} />
          <Typography variant="h6" component="span">
            Filtrer par catégorie
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        {categoryFilter !== 'all posts' && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Filtre actuel :
            </Typography>
            <Box sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
              <Chip
                label={CATEGORIES.find(cat => cat.id === categoryFilter)?.label || categoryFilter}
                color="primary"
                variant="filled"
                sx={{ 
                  '&:hover': { bgcolor: '#5a7a1e' },
                  bgcolor: '#709425'
                }}
                onDelete={handleReset}
              />
            </Box>
          </Box>
        )}

        <List sx={{ pt: 0 }}>
          {CATEGORIES.map((category) => (
            <ListItem key={category.id} disablePadding>
              <ListItemButton
                onClick={() => handleCategorySelect(category.id)}
                selected={categoryFilter === category.id}
                sx={{
                  '&.Mui-selected': {
                    '&:hover': {
                      bgcolor: 'rgba(112, 148, 37, 0.15)'
                    },
                    bgcolor: 'rgba(112, 148, 37, 0.1)'
                  },
                  borderRadius: 1,
                  mb: 0.5
                }}
              >
                <ListItemText
                  primary={category.label}
                  secondary={category.id === 'all posts' ? 
                    'Afficher tous les articles' : 
                    `${category.count} article${category.count > 1 ? 's' : ''}`
                  }
                />
                {categoryFilter === category.id && (
                  <Chip
                    size="small"
                    label="Actuel"
                    color="primary"
                    sx={{ 
                      bgcolor: '#709425',
                      color: 'white',
                      fontSize: '0.75rem'
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {categoryFilter !== 'all posts' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <ListItemButton
              onClick={handleReset}
              sx={{
                '&:hover': {
                  bgcolor: 'rgba(112, 148, 37, 0.05)'
                },
                border: '1px solid #709425',
                borderRadius: 1,
                justifyContent: 'center',
                maxWidth: 200
              }}
            >
              <ListItemText
                primary="Réinitialiser les filtres"
                sx={{ textAlign: 'center' }}
              />
            </ListItemButton>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFilterModal;
