# Bundle Analysis & Performance Monitoring

Ce projet utilise `@next/bundle-analyzer` pour analyser et optimiser la taille des bundles.

## 📊 Commandes d'analyse

```bash
# Analyser les bundles avec interface visuelle
npm run build:analyze

# Build normal sans analyse
npm run build
```

## 🎯 Métriques à surveiller

### Bundle Sizes Recommandés
- **First Load JS** : < 244 kB (recommandé par Next.js)
- **Page bundles** : < 128 kB par page
- **Shared bundles** : < 128 kB

### Core Web Vitals
- **LCP** (Largest Contentful Paint) : < 2.5s
- **FID** (First Input Delay) : < 100ms
- **CLS** (Cumulative Layout Shift) : < 0.1

## 🔍 Analyse des résultats

Après `npm run build:analyze`, vous obtiendrez :

1. **Interface web interactive** : ouverte automatiquement dans le navigateur
2. **Fichiers générés** :
   - `.next/analyze/client.html` - Bundle côté client
   - `.next/analyze/server.html` - Bundle côté serveur

## ⚡ Optimisations communes

### 1. Dynamic Imports
```typescript
// ❌ Import statique (charge tout)
import HeavyComponent from './HeavyComponent'

// ✅ Import dynamique (charge à la demande)
const HeavyComponent = dynamic(() => import('./HeavyComponent'))
```

### 2. Tree Shaking
```typescript
// ❌ Import de toute la librairie
import * as _ from 'lodash'

// ✅ Import spécifique
import { debounce } from 'lodash-es'
```

### 3. Code Splitting par route
```typescript
// Automatique avec Next.js App Router
// Chaque page dans app/ est automatiquement split
```

## 📈 Monitoring continu

### GitHub Actions (optionnel)
Ajouter un check de bundle size dans la CI :

```yaml
- name: Analyze bundle
  run: npm run build:analyze
  
- name: Check bundle size
  run: |
    if [ $(find .next -name "*.js" -exec wc -c {} + | tail -1 | awk '{print $1}') -gt 250000 ]; then
      echo "Bundle too large!"
      exit 1
    fi
```

## 🛠️ Tools complémentaires

- **Bundle Analyzer** : Analyse visuelle
- **Lighthouse CI** : Métriques de performance
- **Bundle Size Bot** : Alertes automatiques sur les PRs
