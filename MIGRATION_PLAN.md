# Plan de Migration Gatsby → Next.js

## 🎯 Phase 1: Layout Principal et InfoBox (PRIORITÉ)

### 1.1 Structure du Layout
- [ ] `src/components/layout/RootLayout.tsx` - Layout principal avec grille
- [ ] `src/components/layout/InfoBox.tsx` - Sidebar gauche (320px)
- [ ] `src/components/layout/Navigator.tsx` - Liste d'articles
- [ ] `src/components/layout/ActionsBar.tsx` - Barre d'actions droite
- [ ] `src/components/layout/MainContent.tsx` - Zone de contenu central

### 1.2 InfoBox (Sidebar gauche - 320px)
- [ ] Avatar auteur + nom/titre
- [ ] Bio (markdown)
- [ ] Icônes sociales (SVG personnalisés)
- [ ] Menu navigation (About, Cartography, Portfolio, Contact)
- [ ] Stack technique (icônes)
- [ ] Bouton "Expand the box" avec animation

### 1.3 Gestion d'état (Zustand)
```typescript
interface UIStore {
  navigatorPosition: 'is-featured' | 'is-aside' | 'moving-aside'
  navigatorShape: 'open' | 'closed'
  fontSize: number
  categoryFilter: string
}
```

## 🎨 Phase 2: Système de Design

### 2.1 Polices et Typographie
- [x] Open Sans (300, 400, 600) ✅
- [ ] IBM Plex Serif pour titres
- [ ] Tailles responsive (1.9em → 2.7em)

### 2.2 Thème et Couleurs
- [ ] Système de couleurs centralisé
- [ ] Mode sombre/clair
- [ ] Variables CSS pour transitions

### 2.3 Composants UI
- [ ] Boutons avec états hover
- [ ] Icônes SVG personnalisées
- [ ] Séparateurs (1px solid #dedede)

## 🔄 Phase 3: Interactions et Animations

### 3.1 Transitions Sidebar
- [ ] Animation "moving-aside" (300ms)
- [ ] Gestion des positions (featured/aside)
- [ ] Synchronisation état global

### 3.2 Fonctionnalités
- [ ] Filtrage par catégories
- [ ] Recherche globale
- [ ] Ajusteur taille police (100%/125%/150%)
- [ ] Scroll to top
- [ ] Mode plein écran

## 📱 Phase 4: Responsive et Performance

### 4.1 Breakpoints
- [ ] Mobile: 600px
- [ ] Desktop: 1024px
- [ ] Transformation composants

### 4.2 Optimisations
- [ ] Lazy loading images
- [ ] React.memo pour composants
- [ ] next/image pour optimisation

## 📝 Phase 5: Articles et Contenu

### 5.1 Structure Article
- [ ] Header (titre, sous-titre, date)
- [ ] Content (markdown → HTML)
- [ ] Footer (partage, bio auteur, commentaires)

### 5.2 Liste d'Articles
- [ ] Miniatures (60x60px → 90x90px)
- [ ] Filtrage temps réel
- [ ] Pagination/infinite scroll

## ⚙️ Phase 6: Intégrations

### 6.1 Réseaux Sociaux
- [ ] react-share pour partage
- [ ] Commentaires Facebook
- [ ] Liens sociaux sidebar

### 6.2 SEO et Métadonnées
- [ ] next/head optimisé
- [ ] Open Graph
- [ ] Structured data

---

## 🎯 PROCHAINE ÉTAPE RECOMMANDÉE

**Commencer par créer le store Zustand et la structure de layout principal.**

Voulez-vous que je commence par implémenter:
1. Le store global Zustand ?
2. La structure RootLayout avec grille ?
3. Le composant InfoBox (sidebar) ?
