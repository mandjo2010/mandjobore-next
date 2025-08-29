# Barres Latérales Organiques à 200% Zoom

## Vue d'ensemble

Ce document décrit l'implémentation des barres latérales avec formes organiques qui s'activent automatiquement à 200% de zoom du navigateur, créant une interface unique et artistique.

## Fonctionnalité

### Déclenchement automatique
- **Seuil** : 200% de zoom ou plus
- **Détection** : Utilise `devicePixelRatio` et `window.innerWidth`
- **Transition** : Les sidebars verticales deviennent des barres horizontales avec formes organiques

### Structure des barres

#### Barre supérieure (Header)
- **Position** : Fixée en haut de la page (`position: fixed, top: 20px`)
- **Composition** :
  - **Côté gauche** : Profil dans une forme organique rouge
    - Avatar circulaire (40px)
    - Nom "Mandjo Béa Boré"
    - Sous-titre "Data analyst - Developer"
    - Réseaux sociaux au survol
  - **Côté droit** : Navigation dans une forme organique rouge
    - Menu : Home, About, Cartography, Portfolio, Contact
    - Icône menu (3 points) pour options

#### Barre inférieure (Footer)
- **Position** : Fixée en bas de la page (`position: fixed, bottom: 20px`)
- **Composition** :
  - **Côté gauche** : Actions de navigation
    - Icône home
    - Icône menu
    - Icône recherche
  - **Côté droit** : Outils et actions
    - Filtre par catégorie
    - Taille de police
    - Plein écran
    - Retour en haut

## Design System

### Couleurs
- **Rouge principal** : `#dc2626`
- **Rouge gradient** : `#dc2626` → `#ef4444` → `#f87171`
- **Texte** : Blanc (`#ffffff`)
- **Boutons** : `rgba(255, 255, 255, 0.2)` avec survol à `0.3`

### Formes organiques
```css
/* Exemples de border-radius organiques */
.organicProfile {
  border-radius: 40px 60px 35px 50px;
}

.organicNavigation {
  border-radius: 25px 45px 30px 40px;
}

.organicActions {
  border-radius: 35px 25px 40px 30px;
}

.organicTools {
  border-radius: 45px 30px 25px 35px;
}
```

### Éléments pseudo
- **Appendices organiques** : Utilisation de `::before` et `::after`
- **Positionnement** : Ajout d'extensions naturelles aux formes
- **Z-index** : Gestion des couches pour l'effet de profondeur

## Composants

### Fichiers créés
- `OrganicProfileBar.tsx` - Barre de profil supérieure
- `OrganicActionsBar.tsx` - Barre d'actions inférieure
- `OrganicShapes.module.css` - Styles pour les formes organiques

### Logique de détection

```typescript
export function isHighZoomHorizontalMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  const actualWidth = window.innerWidth;
  const deviceRatio = window.devicePixelRatio || 1;
  
  const isHighZoom = deviceRatio >= 1.8;
  const isNarrowWidth = actualWidth <= 960;
  
  return (isHighZoom && isNarrowWidth) || actualWidth <= 600;
}
```

## Intégration

### Dans ProfileSidebar.tsx
```typescript
if (shouldUseHorizontal) {
  return <OrganicProfileBar isVisible={true} />;
}
```

### Dans ActionsBar.tsx
```typescript
{isHorizontalMode ? (
  <OrganicActionsBar isVisible={true} categories={categories} />
) : (
  // Mode vertical classique
)}
```

### Dans MainLayout.tsx
- Zones transparentes réservées pour les barres organiques
- Ajustement automatique de la hauteur du contenu
- Gestion du z-index pour éviter les superpositions

## Responsive Design

### Breakpoints
- **Desktop** : Mode vertical classique
- **Zoom 200%+** : Mode horizontal avec formes organiques
- **Mobile** : Mode horizontal avec formes organiques
- **Très petit écran** : Éléments cachés pour optimiser l'espace

### Adaptations
- Tailles d'icônes ajustées (18px → 16px sur mobile)
- Espacements réduits
- Éléments non-essentiels masqués sur très petits écrans

## Accessibilité

### Support des préférences
- `prefers-reduced-motion` : Désactive les animations
- `prefers-contrast` : Ajoute des bordures pour le haut contraste
- `prefers-color-scheme` : Ajustements pour le mode sombre

### Navigation
- Labels ARIA appropriés
- Support du focus clavier
- Boutons avec zones de clic suffisantes (minimum 32px)

## Performance

### Optimisations
- Positionnement `fixed` pour éviter le reflow
- `pointer-events: none` sur les conteneurs pour optimiser les clics
- `pointer-events: auto` uniquement sur les éléments interactifs
- Animations CSS plutôt que JavaScript

### Chargement
- Composants chargés uniquement quand nécessaires
- CSS modulaire pour éviter les conflits
- Images optimisées avec Next.js Image

## Tests et Démo

### Page de démonstration
- **URL** : `/demo-organic-zoom`
- **Fonctionnalités** : Bouton pour forcer le mode organique
- **Instructions** : Guide pour tester à 200% zoom

### Tests à effectuer
1. Zoom navigateur à 200%
2. Test sur différentes tailles d'écran
3. Vérification des interactions (clics, survols)
4. Test d'accessibilité clavier
5. Vérification du contraste

## Maintenance

### Ajustements futurs
- Couleurs personnalisables via theme
- Formes organiques générées dynamiquement
- Animations plus fluides
- Support de plus de breakpoints

### Points d'attention
- Performance sur appareils anciens
- Compatibilité navigateurs
- Cohérence avec le design system global
- Respect des guidelines d'accessibilité
