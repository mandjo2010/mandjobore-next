# ActionsBar - Conformité à la maquette "This.png"

## Vue d'ensemble

Ce composant `ActionsBar` a été entièrement refactorisé pour correspondre EXACTEMENT à la maquette "This.png" et non pas "NotThis.png". 

## Spécifications techniques respectées

### ✅ Structure et positionnement
- **Barre ancrée à droite** : `fixed right-0 top-0 h-screen`
- **Largeur fixe** : 60px
- **Fine ligne de séparation à gauche** : `border-l border-[#E5E7EB]`
- **Positionnement z-index** : z-50 pour être au-dessus du contenu

### ✅ Design des boutons 
- **Pas de fond** : `bg-transparent`
- **Pas de bouton arrondi** : `rounded-none`
- **Couleur au repos** : `text-[#7A7A7A]` (exactement #7A7A7A)
- **Couleur au hover** : `hover:text-gray-600` (plus sombre)
- **Couleur active** : `active:text-black`
- **Aucun style Material UI** arrondi supprimé

### ✅ Icônes
- **Bibliothèque** : Lucide React (icônes outline modernes)
- **Taille** : 20px (ajustement de 22px → 20px pour plus de finesse)
- **Style** : `strokeWidth={1.5}` pour un trait fin et moderne
- **Type** : Outline uniquement (pas de fill)

### ✅ Espacement et organisation
- **Espacement vertical** : `space-y-4` (16px entre chaque icône)
- **Padding conteneur** : `py-8` (32px haut/bas)
- **Séparateur horizontal** : `w-6 h-px bg-[#E5E7EB] my-4`
- **Organisation en 2 groupes** : 3 icônes + séparateur + 3 icônes

### ✅ Ordre exact des icônes
1. **Groupe du haut** :
   - Home (retour à la liste)
   - Menu (filtres par catégorie) *conditionnel*
   - Search (recherche)

2. **Séparateur horizontal**

3. **Groupe du bas** :
   - Type (taille de police) *conditionnel*
   - Maximize/Minimize (plein écran)
   - ChevronUp (retour en haut)

### ✅ Accessibilité
- **Navigation clavier** : Support Tab, Enter, Escape
- **Aria-labels en français** : "Retour à la liste", "Filtrer par catégorie", etc.
- **Focus visible** : `focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-2`
- **Tooltips natifs** : Attribut `title` pour chaque bouton
- **Structure sémantique** : `<nav aria-label="Barre d'action">`

### ✅ Menus déroulants minimalistes
- **Design épuré** : Bordure fine, coins arrondis minimaux (`rounded-sm`)
- **Couleurs subtiles** : Fond blanc, bordure `#E5E7EB`
- **Hover state** : `hover:bg-gray-50`
- **État sélectionné** : `bg-green-50 text-green-700`
- **Fermeture** : Clic extérieur ou Escape

### ✅ Badges de statut
- **Position** : `absolute top-0.5 right-0.5`
- **Taille** : `w-2 h-2` (8px)
- **Couleur** : `bg-green-600` (vert discret)
- **Forme** : `rounded-full`

## Technologies utilisées

- **React** : Composant fonctionnel avec hooks
- **Tailwind CSS** : Classes utilitaires pour un styling précis
- **Lucide React** : Icônes outline modernes et cohérentes
- **Zustand** : Store de state management (hooks fournis)
- **TypeScript** : Typage complet

## Fonctionnalités

### Actions principales
- **Home** : Bascule entre `is-aside` ⇄ `is-featured` (navigation)
- **Filter** : Menu déroulant de filtres par catégorie
- **Search** : Ouvre l'overlay de recherche

### Actions secondaires  
- **Font Size** : Menu déroulant 100%/125%/150%
- **Fullscreen** : Mode plein écran (si supporté)
- **Scroll Top** : Retour en haut de page (smooth scroll)

### États conditionnels
- **Filtres** : Affichés selon `navigatorShape` et `navigatorPosition`
- **Taille police** : Affiché selon `navigatorPosition === 'is-aside'`
- **Fullscreen** : Affiché seulement si `screenfull.isEnabled`

## Test et validation

Une page de test dédiée est disponible : `/test-actionsbar`

### Points de contrôle
1. ✅ Conformité visuelle à "This.png"
2. ✅ AUCUNE ressemblance à "NotThis.png"
3. ✅ Navigation clavier complète
4. ✅ Accessibilité (lecteur d'écran)
5. ✅ Responsivité et états hover/focus
6. ✅ Fonctionnalités métier (recherche, filtres, etc.)

## Architecture du code

```
src/components/layout/ActionsBar.tsx
├── Imports (React, Lucide, store hooks)
├── État local (menus, fullscreen)
├── Effets (fullscreen, clavier)
├── Données (catégories, tailles police)
├── Handlers (actions boutons)
├── Logique conditionnelle (affichage)
├── Styles constants (classes Tailwind)
├── JSX structure
│   ├── Navigation container
│   ├── Groupe icônes principales (3)
│   ├── Séparateur horizontal
│   ├── Groupe icônes secondaires (3)
│   ├── Menu filtres (conditionnel)
│   └── Menu taille police (conditionnel)
```

## Différences vs Material UI (ancien)

| Aspect | Ancien (Material) | Nouveau (This.png) |
|--------|------------------|-------------------|
| Boutons | `IconButton` arrondi | `button` carré sans fond |
| Icônes | Material filled | Lucide outline |
| Couleurs | rgba(0,0,0,0.54) | #7A7A7A exact |
| Hover | Cercle gris | Couleur plus sombre |
| Menus | `Menu`/`MenuItem` | Divs custom minimalistes |
| Focus | Material ripple | Ring bleu natif |
| Tooltips | `Tooltip` Material | `title` natif |
| Structure | `Box` système | `nav` sémantique |

## Maintenance

- **Ajout d'icônes** : Importer depuis `lucide-react`
- **Modification couleurs** : Classes Tailwind dans `buttonColorClasses`
- **Nouveaux menus** : Suivre le pattern overlay + positioning
- **État conditionnel** : Utiliser les hooks store fournis
- **Accessibilité** : Maintenir aria-labels FR et navigation clavier
