# Validation des Variables d'Environnement

Ce projet utilise `@t3-oss/env-nextjs` avec `zod` pour une validation robuste des variables d'environnement.

## Configuration

Le fichier `src/env.ts` définit et valide toutes les variables d'environnement :

```typescript
import { env } from '../env'

// Variables côté serveur
console.log(env.NODE_ENV)  // 'development' | 'test' | 'production'
console.log(env.SITE_URL)  // URL validée

// Variables côté client (préfixées avec NEXT_PUBLIC_)
// console.log(env.NEXT_PUBLIC_API_URL)
```

## Variables Disponibles

### Variables Serveur
- `NODE_ENV`: Environnement Node.js (development, test, production)
- `SITE_URL`: URL du site (par défaut: https://www.mandjobore.com)

### Variables Client
À ajouter selon les besoins avec le préfixe `NEXT_PUBLIC_`

## Fichiers de Configuration

1. **`.env.example`**: Template des variables d'environnement
2. **`.env.local`**: Variables locales (non versionnées)
3. **`src/env.ts`**: Schéma de validation

## Utilisation

```typescript
// ✅ Correct
import { env } from '@/env'
const siteUrl = env.SITE_URL

// ❌ Incorrect - pas de validation
const siteUrl = process.env.SITE_URL
```

## Tests

Les tests de validation sont dans `tests/unit/env.test.ts` et s'exécutent dans l'environnement Node.js pour accéder aux variables serveur.

## Build Docker

Pour ignorer la validation en production (ex: Docker), utilisez :
```bash
SKIP_ENV_VALIDATION=true npm run build
```
