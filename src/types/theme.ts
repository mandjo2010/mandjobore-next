import type { Theme } from '@mui/material/styles'

// Re-export the app theme type from MUI after augmentation
// The actual shape is declared in `src/theme/mui-augment.d.ts`
export type CustomTheme = Theme
