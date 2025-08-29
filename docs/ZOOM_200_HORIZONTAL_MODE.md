# Zoom 200% - Mode Horizontal des Sidebars

## Vue d'ensemble

À partir d'un zoom de 200% (ou sur très petits écrans), l'interface bascule automatiquement en mode horizontal pour optimiser l'expérience utilisateur. Les sidebars verticales deviennent des barres horizontales pour maximiser l'espace disponible pour le contenu principal.

## Comportement

### Mode Normal (100-175% zoom)
- **ProfileSidebar** : Colonne gauche verticale (320px de largeur)
- **ActionsBar** : Colonne droite verticale (64px de largeur)
- **Contenu** : Colonne centrale

### Mode Horizontal (200%+ zoom ou écrans < 600px)
- **ProfileSidebar** : Barre horizontale en haut (80px de hauteur)
- **ActionsBar** : Barre horizontale en bas (80px de hauteur)
- **Contenu** : Prend toute la largeur, hauteur ajustée (100vh - 160px)

## Détection Technique

La fonction `isHighZoomHorizontalMode()` utilise deux critères :

```typescript
const actualWidth = window.innerWidth;
const deviceRatio = window.devicePixelRatio || 1;

const isHighZoom = deviceRatio >= 1.8;
const isNarrowWidth = actualWidth <= 960;

return (isHighZoom && isNarrowWidth) || actualWidth <= 600;
```

### Critères de basculement :
1. **Zoom élevé ET largeur réduite** : `devicePixelRatio ≥ 1.8` ET `innerWidth ≤ 960px`
2. **Très petit écran** : `innerWidth ≤ 600px`

## Adaptations des Composants

### ProfileSidebar

#### Mode Vertical (Desktop)
- Layout en colonne avec avatar, nom, bio, liens sociaux, navigation et tech stack
- Largeur fixe de 320px
- Scroll vertical si nécessaire

#### Mode Horizontal (Zoom 200%+)
- Layout en ligne avec tous les éléments sur une seule rangée
- Avatar plus petit (48px vs 72px)
- Éléments compactés et espacement réduit
- Navigation et tech stack en ligne
- Hauteur fixe de 80px avec scroll horizontal si nécessaire

### ActionsBar

#### Mode Vertical (Desktop)
- Boutons d'action disposés en 2 groupes (haut/bas)
- Hauteur pleine écran (100vh)
- Boutons de 48px

#### Mode Horizontal (Zoom 200%+)
- Tous les boutons sur une seule ligne
- Hauteur fixe de 80px
- Boutons plus petits (40px)
- Espacement réduit entre les boutons

## Styles CSS

### ProfileSidebar.module.css

Les classes suivantes gèrent le mode horizontal :

- `.sidebarHorizontal` : Container principal horizontal
- `.profileContentHorizontal` : Contenu en ligne
- `.profileHeaderHorizontal` : Header compact avec avatar et nom
- `.profileSocialHorizontal` : Icônes sociales en ligne
- `.profileNavHorizontal` : Navigation en ligne
- `.builtWithHorizontal` : Tech stack compact

### ActionsBar.module.css

Les classes pour le mode horizontal :

- `.actionsContainerHorizontal` : Container principal horizontal
- `.horizontalGroup` : Groupe de boutons en ligne

## Breakpoints Responsive

### Utilisation avec Material-UI

Le système utilise `useZoomTolerantBreakpoints()` au lieu des breakpoints Material-UI standards pour une meilleure détection du zoom.

```typescript
const { isWide, isMedium, isHorizontalMode } = useZoomTolerantBreakpoints();
```

### Comparaison

| Condition | Standard MUI | Zoom-Tolerant |
|-----------|--------------|---------------|
| Large Screen | `useMediaQuery(theme.breakpoints.up('lg'))` | `isWide` |
| Medium Screen | `useMediaQuery(theme.breakpoints.up('md'))` | `isMedium` |
| Horizontal Mode | `useMediaQuery(theme.breakpoints.down('sm'))` | `isHorizontalMode` |

## Tests

### Page de Test
Une page de démonstration est disponible à `/test-zoom-200` pour tester le comportement.

### Procédure de Test
1. Naviguer vers `/test-zoom-200`
2. Utiliser Ctrl/Cmd + Plus pour zoomer à 200%
3. Vérifier que :
   - ProfileSidebar s'affiche en haut en mode horizontal
   - ActionsBar s'affiche en bas en mode horizontal
   - Le contenu principal utilise toute la largeur
   - Tous les éléments restent fonctionnels

### Niveaux de Zoom à Tester
- **100%** : Mode vertical normal
- **150%** : Toujours en mode vertical
- **200%** : Basculement en mode horizontal
- **250%+** : Mode horizontal avec éléments encore plus compacts

## Accessibilité

### Considerations
- Tous les éléments restent accessibles au clavier en mode horizontal
- Les contrastes sont maintenus
- Les tailles de police restent lisibles
- Les zones de clic sont suffisamment grandes (minimum 32px)

### Support Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Suppression des animations de transition */
}
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  /* Bordures supplémentaires pour les éléments interactifs */
}
```

## Performance

### Optimisations
- Utilisation de `throttle` pour les événements de resize
- Classes CSS pré-calculées pour éviter les recalculs
- Lazy loading des composants non critiques

### Impact
- Basculement instantané sans flash
- Pas de recalcul de layout lourd
- Transitions fluides si activées

## Maintenance

### Fichiers Concernés
- `src/utils/zoomTolerantBreakpoints.ts` : Logique de détection
- `src/components/layout/MainLayout.tsx` : Orchestration des modes
- `src/components/layout/ProfileSidebar.tsx` : Composant ProfileSidebar
- `src/components/layout/ActionsBar.tsx` : Composant ActionsBar
- `src/components/layout/ProfileSidebar.module.css` : Styles ProfileSidebar
- `src/components/layout/ActionsBar.module.css` : Styles ActionsBar

### Points d'Attention
- Tester sur différents navigateurs (Chrome, Firefox, Safari, Edge)
- Vérifier sur différentes résolutions d'écran
- Valider le comportement avec des dispositifs tactiles
- S'assurer de la compatibilité avec les outils d'accessibilité

## Extensions Futures

### Améliorations Possibles
1. **Mode portrait/paysage** : Adaptation supplémentaire pour les tablettes
2. **Préférences utilisateur** : Permettre de forcer un mode ou l'autre
3. **Animation de transition** : Ajouter des animations lors du basculement
4. **Densité d'affichage** : Options compactes/confortables supplémentaires
