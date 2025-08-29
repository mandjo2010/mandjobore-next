# Layout Inspiré de Gatsby

Ce document explique le nouveau layout principal qui reproduit exactement la structure et les fonctionnalités de l'ancien projet Gatsby.

## 🎯 Objectif

Adapter l'architecture du layout `src/layouts/index.js` de Gatsby vers Next.js en conservant :
- La même structure de composants
- Les mêmes fonctionnalités (responsive, localStorage, throttling)
- La même gestion d'état
- Les mêmes optimisations

## 📁 Structure des Fichiers

```
src/components/layout/
├── GatsbyInspiredLayout.tsx    # Layout principal (équivalent de layouts/index.js)
├── LayoutWrapper.tsx           # Conteneur principal
├── Navigator.tsx               # Navigation entre articles (modifié pour props)
├── ActionsBar.tsx              # Barre d'actions avec catégories
├── InfoBar.tsx                 # Barre d'informations (nouveau)
└── InfoBox.tsx                 # Panneau latéral (modifié pour props)

src/store/ui.ts                 # Store Zustand (équivalent Redux)
src/theme/muiTheme.ts           # Thème Material-UI

pages/demo-gatsby-layout.tsx    # Page de démonstration
```

## 🔄 Correspondance Gatsby → Next.js

| Gatsby (ancien) | Next.js (nouveau) | Fonction |
|-----------------|-------------------|----------|
| `layouts/index.js` | `GatsbyInspiredLayout.tsx` | Layout principal |
| Redux store | Zustand store (`ui.ts`) | Gestion d'état |
| GraphQL query | `getStaticProps` | Récupération des données |
| `componentDidMount` | `useEffect` | Gestion lifecycle |
| `localStorage` | Zustand persist | Persistance préférences |
| `timeoutThrottlerHandler` | `timeoutThrottlerHandler` | Throttling resize |

## ⚙️ Fonctionnalités Reproduites

### 1. Gestion Responsive
```typescript
// Détection automatique de la largeur d'écran
const checkIsWideScreen = () => window.innerWidth >= 1024;
setIsWideScreen(checkIsWideScreen());

// InfoBox affiché seulement sur grands écrans
{isWideScreen && <InfoBox pages={pages} parts={parts} />}
```

### 2. Persistance localStorage
```typescript
// Sauvegarde/récupération fontSize comme dans Gatsby
useEffect(() => {
  const storedFontSize = parseFloat(localStorage.getItem('font-size-increase') || '1.0');
  if (storedFontSize >= 1.0 && storedFontSize <= 1.5) {
    setFontSize(storedFontSize);
  }
}, []);
```

### 3. Throttling Resize
```typescript
// Même mécanisme de throttling que l'original
const timeoutThrottlerHandler = (timeouts, name, delay, handler) => {
  if (timeouts[name]) clearTimeout(timeouts[name]);
  timeouts[name] = setTimeout(handler, delay);
};

const resizeThrottler = () => {
  return timeoutThrottlerHandler(timeoutsRef.current, 'resize', 500, () => {
    setIsWideScreen(checkIsWideScreen());
  });
};
```

### 4. Extraction des Catégories
```typescript
// Reproduction exacte de getCategories()
const categories = posts.reduce((list: string[], post) => {
  const category = post.category;
  if (category && !list.includes(category)) {
    return list.concat(category);
  }
  return list;
}, []);
```

## 🎨 Structure du Layout

```jsx
<LayoutWrapper>
  {/* Contenu principal avec fontSize appliqué */}
  <div style={{ fontSize: `${fontSize}rem` }}>
    {children}
  </div>

  {/* Composants reproduisant la structure Gatsby */}
  <Navigator posts={posts} />
  <ActionsBar categories={categories} />
  <InfoBar pages={pages} parts={parts} />
  
  {/* InfoBox conditionnel comme dans Gatsby */}
  {isWideScreen && <InfoBox pages={pages} parts={parts} />}
</LayoutWrapper>
```

## 📊 Gestion des Données

### Posts (équivalent GraphQL allMarkdownRemark posts)
```typescript
interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  cover?: string;
  date: string;
}
```

### Pages (équivalent GraphQL allMarkdownRemark pages)
```typescript
interface Page {
  slug: string;
  title: string;
  menuTitle?: string;
}
```

### Parts (équivalent GraphQL allMarkdownRemark parts)
```typescript
interface Part {
  title: string;
  html: string;
}
```

## 🚀 Utilisation

### 1. Layout Principal
```tsx
import GatsbyInspiredLayout from '@/components/layout/GatsbyInspiredLayout';

export default function MyPage({ posts, pages, parts }) {
  return (
    <GatsbyInspiredLayout
      posts={posts}
      pages={pages}
      parts={parts}
      seo={{
        title: 'Mon Titre',
        description: 'Ma Description',
        url: 'https://monsite.com/ma-page',
      }}
    >
      <div>Mon contenu</div>
    </GatsbyInspiredLayout>
  );
}
```

### 2. Récupération des Données
```tsx
export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPostsForList();
  const pages = getAllPages(); // À implémenter
  const parts = getAllParts(); // À implémenter

  return { props: { posts, pages, parts } };
};
```

## 🔧 Store UI (Zustand)

Le store reproduit l'état Redux original :

```typescript
interface UIState {
  // Responsive (nouveau, inspiré de l'ancien isWideScreen)
  isWideScreen: boolean;
  setIsWideScreen: (isWide: boolean) => void;

  // Préférences (équivalent fontSizeIncrease)
  fontSize: number;
  setFontSize: (size: number) => void;

  // Navigation (nouveau système Gatsby)
  navigatorPosition: NavigatorPosition;
  navigatorShape: NavigatorShape;
  
  // Filtres
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
}
```

## 📝 TODO / Améliorations

1. **Données réelles** : Remplacer les données mockées par de vraies requêtes
2. **Images optimisées** : Intégrer Next.js Image optimization
3. **Animation** : Ajouter les transitions CSS du Navigator
4. **Tests** : Ajouter des tests unitaires pour chaque composant
5. **A11y** : Améliorer l'accessibilité
6. **Performance** : Optimiser les re-renders

## 🎯 Démonstration

Visitez `/demo-gatsby-layout` pour voir le layout en action avec :
- Tous les composants intégrés
- Données réelles des posts
- Gestion responsive
- Persistance des préférences

## 🔍 Debugging

Pour débugger le layout :

1. **Store UI** : Utilisez React DevTools avec Zustand
2. **Responsive** : Redimensionnez la fenêtre pour tester isWideScreen
3. **localStorage** : Vérifiez `mandjobore-ui-store` dans les DevTools
4. **Props** : Vérifiez que posts/pages/parts sont bien passés

Cette implémentation reproduit fidèlement le comportement de l'ancien layout Gatsby tout en tirant parti des avantages de Next.js et des hooks React modernes.
