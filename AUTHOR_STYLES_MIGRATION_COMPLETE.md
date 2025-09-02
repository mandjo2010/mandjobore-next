# Migration des styles d'auteur selon les spécifications Gatsby v1

## Résumé des modifications

Cette migration adapte et applique les styles exacts pour les informations d'auteur (nom, titre, bio, avatar, réseaux sociaux) dans le projet Next.js actuel, en se basant sur la structure et les styles du projet Gatsby v1 et les spécifications typographiques fournies.

## Spécifications typographiques appliquées

### Nom de l'auteur
- **Police**: Open Sans 300
- **Taille**: 27px
- **Line Height**: 27px
- **Couleur**: rgb(85, 85, 85) (#555555)

### Titre de l'auteur
- **Police**: Open Sans 300  
- **Taille**: 16px
- **Line Height**: 16px
- **Couleur**: rgb(85, 85, 85) (#555555)

### Bio de l'auteur
- **Police**: Open Sans 300
- **Taille**: 15px
- **Line Height**: 23px
- **Couleur**: rgb(85, 85, 85) (#555555)

### Liens sociaux
- **Police**: Open Sans 300
- **Taille**: 16px
- **Line Height**: 18px
- **Couleur**: rgb(112, 148, 37) (#709425)
- **Hover**: rgb(112, 148, 37) avec scale(1.1)

## Fichiers modifiés

### 1. Configuration centralisée
- **`src/config/author.ts`** - Nouvelle configuration centralisée pour toutes les informations d'auteur

### 2. Composants mis à jour
- **`src/components/InfoBox/InfoHeader.tsx`** - Styles nom/titre exact selon spécifications
- **`src/components/InfoBox/InfoText.tsx`** - Styles bio exact selon spécifications  
- **`src/components/InfoBox/SocialIcons.tsx`** - Utilisation configuration centralisée
- **`src/components/InfoBar/InfoBar.tsx`** - Styles mobile exact selon spécifications
- **`src/components/layout/ProfileSidebar.tsx`** - Utilisation configuration centralisée
- **`src/components/layout/OrganicProfileBar.tsx`** - Utilisation configuration centralisée

### 3. Styles CSS
- **`src/styles/author-styles.css`** - Nouveau fichier de styles d'auteur selon spécifications exactes
- **`src/components/layout/ProfileSidebar.module.css`** - Styles bio et liens sociaux mis à jour
- **`src/styles/OrganicShapes.module.css`** - Styles nom/titre organiques mis à jour
- **`src/theme/GlobalCss.tsx`** - Import des styles d'auteur et styles globaux mis à jour

## Structure de la configuration auteur

```typescript
// src/config/author.ts
export interface AuthorConfig {
  infoTitle: string;           // Nom principal
  infoTitleNote: string;       // Titre/rôle
  authorName: string;          // Nom complet
  bio: string;                 // Description/bio
  avatar: string;              // Chemin vers l'avatar
  authorSocialLinks: Array<{   // Liens sociaux
    name: string;
    url: string;
  }>;
}
```

## Compatibilité avec Gatsby v1

Cette implémentation reproduit fidèlement :

1. **Structure de configuration** - Similaire à `content/meta/config.js` dans Gatsby v1
2. **Propriétés clés** - `infoTitle`, `infoTitleNote`, `authorSocialLinks` comme dans l'original
3. **Styles CSS** - Reproduction exacte des styles JSS du Gatsby v1 avec les spécifications fournies
4. **Responsive design** - Adaptation mobile/desktop comme dans l'original
5. **Transitions et effets** - Hover effects et transitions préservés

## Styles appliqués globalement

Les styles sont appliqués via :
- Classes CSS globales (`.authorName`, `.authorRole`, `.bioText`, `.profileSocial`)
- CSS modules pour les composants spécifiques
- Styles !important pour surcharger les spécificités élevées
- Styles responsives pour mobile/tablet/desktop

## Effet de hover

Les liens sociaux ont un effet de hover vert selon les spécifications :
- Couleur de base : `#709425`
- Couleur hover : `rgb(112, 148, 37)` 
- Transformation : `scale(1.1)`
- Transition : `all 0.5s ease`

## Compatibilité responsive

- **Desktop** : Styles complets selon spécifications
- **Mobile** : Légère réduction des tailles pour éviter débordement
  - Nom : 24px au lieu de 27px
  - Titre : 14px au lieu de 16px
  - Bio : 14px au lieu de 15px

## Validation

Tous les composants utilisent maintenant la configuration centralisée et appliquent les styles exacts selon les spécifications typographiques fournies, reproduisant fidèlement l'apparence et le comportement du projet Gatsby v1 original.
