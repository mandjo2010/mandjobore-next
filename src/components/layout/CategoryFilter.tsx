/**
 * CategoryFilter - Composant reproduisant le CategoryFilter de l'ancien ActionsBar
 * Basé sur src/components/ActionsBar/CategoryFilter.js du starter Gatsby original
 */
'use client'

import { FilterList, Check } from '@mui/icons-material'
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'

import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

interface CategoryFilterProps {
  categories: string[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const { categoryFilter, setCategoryFilter } = useGatsbyUIStore()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCategorySelect = (category: string) => {
    setCategoryFilter(category)
    handleClose()
  }

  // Toutes les catégories disponibles incluant "all posts"
  const allCategories = ['all posts', ...categories]

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        sx={{
          '&:hover': { color: 'primary.main' },
          color: 'text.secondary',
          ...(categoryFilter !== 'all posts' && {
            color: 'primary.main'
          })
        }}
        title="Filter by category"
        size="small"
      >
        <FilterList fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: '200px',
            minWidth: '160px'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {allCategories.map((category) => (
          <MenuItem
            key={category}
            onClick={() => handleCategorySelect(category)}
            sx={{
              alignItems: 'center',
              display: 'flex',
              fontSize: '0.9em',
              gap: 1,
              textTransform: 'capitalize'
            }}
          >
            {categoryFilter === category && (
              <Check fontSize="small" sx={{ color: 'primary.main' }} />
            )}
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                textTransform: category === 'all posts' ? 'lowercase' : 'capitalize'
              }}
            >
              {category}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
