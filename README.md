# Mandjo Béa Boré - Portfolio & Blog

Portfolio personnel et blog de Mandjo Béa Boré, Data analyst et Developer.

## Technologies

- **Next.js 15** avec TypeScript
- **Material-UI (MUI)** pour les composants
- **MDX** pour le contenu des articles
- **ESLint 9** avec configuration flat
- **Prettier** pour le formatage
- **Playwright** pour les tests E2E
- **Husky + lint-staged** pour les hooks git

## Développement

- **Démarrer** : `npm run dev`
- **Build** : `npm run build`
- **Lint** : `npm run lint` / `npm run lint:fix`
- **Formatage** : `npm run format` / `npm run format:check`
- **E2E** : `npm run test:e2e` (ou `npm run test:e2e:ui`)
- **CI locale stricte** : `npm run lint:ci`

Les commits lancent automatiquement le lint et le formatage via Husky/lint-staged.

## Structure du projet

- `src/` - Code source principal
- `content/` - Articles et pages en Markdown/MDX
- `public/content/` - Assets des articles (images, etc.)
- `components/` - Composants React/TSX
- `pages/` - Pages Next.js (router pages)

## Getting Started

```bash
# Installation
npm install

# Développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.
