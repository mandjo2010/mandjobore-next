# Navigation Gatsby-Style pour Next.js

Ce projet reproduit fidèlement le système de navigation de l'ancien site Gatsby v1, avec les mêmes animations, styles et fonctionnalités.

## Architecture

### Composants Principaux

1. **InfoBox** (`src/components/navigation/InfoBox.tsx`)
   - Sidebar principale pour desktop (width: 320px)
   - Contient l'avatar, les infos auteur, menu navigation et stack technique
   - Masquée sur mobile (< 1024px)

2. **InfoBar** (`src/components/navigation/InfoBar.tsx`) 
   - Barre de navigation mobile (height: 64px)
   - Avatar et menu déroulant
   - Masquée sur desktop (≥ 1024px)

3. **InfoMenu** (`src/components/navigation/InfoMenu.tsx`)
   - Menu de navigation avec liens : about, cartography, portfolio, contact
   - Texte en minuscules comme dans l'original Gatsby

4. **TopMenu** (`src/components/navigation/TopMenu.tsx`)
   - Menu déroulant pour mobile avec overlay

### État Redux

Le state management reproduit exactement l'ancien store Gatsby :

```typescript
interface NavigationState {
  navigatorPosition: "is-aside" | "is-featured" | "moving-featured"
  navigatorShape: "open" | "closed"
  navigatorFilter: string
  isWideScreen: boolean
  scrollToTop: boolean
  fontSizeIncrease: number
  categoryFilter: string
}
```

### Breakpoints

- **Mobile** : < 600px
- **Tablet** : 600px - 1023px  
- **Desktop** : ≥ 1024px (seuil L comme dans Gatsby)

## États de Navigation

### navigatorPosition
- `is-aside` : Sidebar fixe à gauche (défaut)
- `is-featured` : Sidebar en plein écran/overlay
- `moving-featured` : Animation de transition

### navigatorShape  
- `open` : Sidebar ouverte avec contenu complet
- `closed` : Sidebar réduite

## Styles CSS

Les styles reproduisent exactement les valeurs de l'ancien thème Gatsby :

- **Couleur accent** : #709425 (vert)
- **Couleur texte** : #555555
- **Couleur liens hover** : #709425
- **Police** : "Open Sans"
- **Transitions** : 0.5s ease (comme l'original)

## Utilisation

### Installation des Dépendances

```bash
npm install @reduxjs/toolkit react-redux
```

### Configuration dans _app.tsx

Le projet est déjà configuré avec :
- Provider Redux
- NavigationLayout avec logique responsive
- Detection automatique de la taille d'écran

### Personnalisation

Pour adapter le contenu :

1. **Menu items** : Modifier les `defaultMenuItems` dans `NavigationLayout.tsx`
2. **Info auteur** : Modifier `defaultInfo` dans `NavigationLayout.tsx`  
3. **Avatar** : Ajouter `avatar.jpg` dans `public/images/`
4. **Styles** : Ajuster les variables CSS dans les modules correspondants

## Fonctionnalités Gatsby Reproduites

✅ **InfoBox desktop avec sidebar fixe**
✅ **InfoBar mobile avec menu déroulant**  
✅ **Navigation states (is-aside, is-featured, etc.)**
✅ **Animations de transition fluides**
✅ **Breakpoints responsive identiques**
✅ **Typography et couleurs authentiques**  
✅ **Menu en minuscules** 
✅ **Redux state management**
✅ **Avatar avec bordure arrondie personnalisée**

## Structure des Fichiers

```
src/
├── components/
│   ├── navigation/
│   │   ├── InfoBox.tsx / .module.css
│   │   ├── InfoBar.tsx / .module.css  
│   │   ├── InfoMenu.tsx / .module.css
│   │   ├── InfoHeader.tsx / .module.css
│   │   ├── InfoText.tsx / .module.css
│   │   └── TopMenu.tsx / .module.css
│   ├── layout/
│   │   └── NavigationLayout.tsx / .module.css
│   └── providers/
│       └── ReduxProvider.tsx
└── store/
    ├── index.ts
    ├── hooks.ts
    └── navigationSlice.ts
```

Cette implémentation garantit une reproduction fidèle du système de navigation original tout en s'adaptant parfaitement à l'architecture Next.js.
