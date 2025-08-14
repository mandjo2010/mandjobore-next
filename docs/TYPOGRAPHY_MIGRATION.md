# Guide de Migration Typographique - Gatsby vers Next.js

## Vue d'ensemble

Ce document détaille la migration complète des styles typographiques de l'ancien projet Gatsby vers le nouveau projet Next.js, en respectant exactement les spécifications de design.

## Configuration des Polices

### Google Fonts Integration
- **Police principale**: "Open Sans"
- **Poids chargés**: 300, 400, 600
- **Configuration**: Via next/font/google + lien direct dans _document.tsx

### Fichiers modifiés:
- `pages/_document.tsx` - Intégration Google Fonts
- `pages/_app.tsx` - Configuration Next.js + import CSS
- `src/styles/typography.css` - Styles CSS dédiés

## Spécifications Exactes

### Titres d'Articles (blog-title)
```css
font-family: "Open Sans", sans-serif
font-style: normal
font-weight: 600
font-size: 27px
line-height: 31px
color: rgb(51, 51, 51) /* #333333 */
```

### Sous-titres d'Articles (blog-subtitle)
```css
font-family: "Open Sans", sans-serif
font-style: normal
font-weight: 300
font-size: 23px
line-height: 27px
color: rgb(85, 85, 85) /* #555555 */
```

## Classes CSS Disponibles

### Classes principales
- `.blog-title` / `.article-title` / `.post-title` - Titres d'articles
- `.blog-subtitle` / `.article-subtitle` / `.post-subtitle` - Sous-titres
- `.post-list-title` - Titres dans les listes d'articles
- `.post-list-subtitle` - Sous-titres dans les listes

### Variables CSS
```css
:root {
  /* Titres */
  --title-font-family: "Open Sans", sans-serif;
  --title-font-size: 27px;
  --title-line-height: 31px;
  --title-font-weight: 600;
  --title-color: rgb(51, 51, 51);
  
  /* Sous-titres */
  --subtitle-font-family: "Open Sans", sans-serif;
  --subtitle-font-size: 23px;
  --subtitle-line-height: 27px;
  --subtitle-font-weight: 300;
  --subtitle-color: rgb(85, 85, 85);
}
```

## Utilisation dans les Composants

### Material-UI avec classes CSS
```tsx
<Typography
  component="h1"
  className="blog-title"
  sx={{
    fontFamily: '"Open Sans", sans-serif !important',
    fontWeight: '600 !important',
    fontSize: '27px !important',
    lineHeight: '31px !important',
    color: 'rgb(51, 51, 51) !important',
  }}
>
  Titre de l'article
</Typography>
```

### HTML pur avec classes
```html
<h1 class="blog-title">Titre de l'article</h1>
<h2 class="blog-subtitle">Sous-titre de l'article</h2>
```

### Avec variables CSS
```css
.custom-title {
  font-family: var(--title-font-family);
  font-size: var(--title-font-size);
  line-height: var(--title-line-height);
  font-weight: var(--title-font-weight);
  color: var(--title-color);
}
```

## Composants Modifiés

### Pages principales
- `pages/posts/[slug].tsx` - Articles de blog
- `pages/pages/[slug].tsx` - Pages statiques

### Composants legacy
- `src/components/posts/[slug].js`
- `src/components/pages/pages/[key].js`

### Configuration
- `src/theme/theme.js` - Thème Material-UI
- `src/theme/GlobalCss.tsx` - Styles globaux CSS-in-JS

## Contraintes Respectées

### ✅ Valeurs exactes
- Pas de conversion em/rem, utilisation des pixels exacts
- Respect des tailles: 27px pour titres, 23px pour sous-titres
- Couleurs exactes: rgb(51,51,51) et rgb(85,85,85)

### ✅ Cohérence
- Styles appliqués uniformément dans toute l'application
- Classes CSS réutilisables
- Variables CSS centralisées

### ✅ Performance
- Preconnect Google Fonts
- Font-display: swap
- CSS optimisé

### ✅ Accessibilité
- Contraste suffisant
- Focus styles
- Semantic HTML (h1, h2)

### ✅ Responsive
- Maintien des tailles exactes sur tous écrans
- Pas de responsive pour respecter les specs

## Comparaison avec Gatsby

| Élément | Gatsby (référence) | Next.js (implémenté) | Status |
|---------|-------------------|---------------------|--------|
| Police | "Open Sans" | "Open Sans" | ✅ |
| Titre size | 27px | 27px | ✅ |
| Titre weight | 600 | 600 | ✅ |
| Titre color | #333333 | rgb(51,51,51) | ✅ |
| Sous-titre size | 23px | 23px | ✅ |
| Sous-titre weight | 300 | 300 | ✅ |
| Sous-titre color | #555555 | rgb(85,85,85) | ✅ |

## Testing

### Composant de test
Utilisez `src/components/debug/TypographyTest.tsx` pour vérifier le rendu:

```tsx
import TypographyTest from '@/components/debug/TypographyTest'

// Dans votre page de test
<TypographyTest />
```

### Hook utilitaire
```tsx
import { useTypographyStyles } from '@/components/debug/TypographyTest'

const { titleStyle, subtitleStyle } = useTypographyStyles()
```

## Maintenance

### Ajout de nouveaux éléments typographiques
1. Définir les variables CSS dans `typography.css`
2. Créer les classes correspondantes
3. Mettre à jour la configuration du thème si nécessaire
4. Documenter les nouveaux styles

### Modification des styles existants
⚠️ **Attention**: Ne pas modifier les valeurs exactes (27px, 23px, etc.) sans validation design

## Vérification du Rendu

Pour vérifier que le rendu correspond exactement au site Gatsby de référence (mandjobore.com):

1. Comparer visuellement les tailles et espacements
2. Vérifier avec les DevTools les valeurs CSS appliquées
3. Tester sur différents navigateurs et tailles d'écran
4. Valider l'accessibilité et le contraste

## Troubleshooting

### Police ne s'affiche pas correctement
- Vérifier le chargement Google Fonts dans Network tab
- S'assurer que `!important` est appliqué si nécessaire
- Vérifier les fallbacks: "Open Sans", Arial, sans-serif

### Tailles incorrectes
- Confirmer que les pixels sont utilisés, pas les unités relatives
- Vérifier l'absence de CSS conflictuel
- Utiliser `!important` si nécessaire pour forcer les styles

### Material-UI override issues
- Utiliser `sx` avec `!important` pour forcer les styles
- Combiner classes CSS + sx pour maximum de contrôle
- Vérifier l'ordre de chargement des CSS
