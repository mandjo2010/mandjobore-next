'use client';

import { 
  Close as CloseIcon, 
  FormatSize as FormatSizeIcon
} from '@mui/icons-material';
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
  Box,
  Slider
} from '@mui/material';
import React from 'react';

import { usePreferences } from '@/store/ui';

interface FontSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FONT_SIZE_PRESETS = [
  { description: '87.5%', label: 'Petit', value: 0.875 },
  { description: '100%', label: 'Normal', value: 1.0 },
  { description: '112.5%', label: 'Moyen', value: 1.125 },
  { description: '125%', label: 'Grand', value: 1.25 },
  { description: '150%', label: 'Très grand', value: 1.5 }
];

const FontSizeModal: React.FC<FontSizeModalProps> = ({ isOpen, onClose }) => {
  const { fontSize, setFontSize } = usePreferences();

  const handlePresetSelect = (value: number) => {
    setFontSize(value);
    // Appliquer immédiatement au document
    document.documentElement.style.fontSize = `${value * 16}px`;
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setFontSize(value);
    document.documentElement.style.fontSize = `${value * 16}px`;
  };

  const handleReset = () => {
    setFontSize(1.0);
    document.documentElement.style.fontSize = '16px';
  };

  // Marques pour le slider
  const sliderMarks = FONT_SIZE_PRESETS.map(preset => ({
    label: preset.description,
    value: preset.value
  }));

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
          <FormatSizeIcon sx={{ color: '#709425' }} />
          <Typography variant="h6" component="span">
            Taille de police
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        {/* Affichage de la taille actuelle */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Taille actuelle :
          </Typography>
          <Chip
            label={`${Math.round(fontSize * 100)}%`}
            color="primary"
            sx={{ 
              bgcolor: '#709425',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600
            }}
          />
        </Box>

        {/* Slider pour ajustement fin */}
        <Box sx={{ mb: 3, px: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Ajustement précis :
          </Typography>
          <Slider
            value={fontSize}
            onChange={handleSliderChange}
            min={0.75}
            max={2.0}
            step={0.125}
            marks={sliderMarks}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
            sx={{
              '& .MuiSlider-markLabel': {
                fontSize: '0.75rem'
              },
              '& .MuiSlider-thumb': {
                backgroundColor: '#709425'
              },
              '& .MuiSlider-track': {
                backgroundColor: '#709425'
              },
              color: '#709425'
            }}
          />
        </Box>

        {/* Presets rapides */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Tailles prédéfinies :
        </Typography>
        <List sx={{ pt: 0 }}>
          {FONT_SIZE_PRESETS.map((preset) => (
            <ListItem key={preset.value} disablePadding>
              <ListItemButton
                onClick={() => handlePresetSelect(preset.value)}
                selected={Math.abs(fontSize - preset.value) < 0.01}
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
                  primary={preset.label}
                  secondary={preset.description}
                  sx={{
                    fontSize: fontSize === preset.value ? '1.1rem' : '1rem',
                    transition: 'font-size 0.2s ease'
                  }}
                />
                {Math.abs(fontSize - preset.value) < 0.01 && (
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

        {/* Aperçu */}
        <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, mt: 3, p: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Aperçu du texte :
          </Typography>
          <Typography 
            sx={{ 
              fontSize: `${fontSize}rem`,
              lineHeight: 1.5,
              transition: 'font-size 0.2s ease'
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>

        {/* Bouton reset */}
        {fontSize !== 1.0 && (
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
                primary="Réinitialiser (100%)"
                sx={{ textAlign: 'center' }}
              />
            </ListItemButton>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FontSizeModal;
