# Conventional Commits Configuration 🎉

La configuration **Conventional Commits** avec **commitlint** et **husky** a été mise en place avec succès !

## 📋 Configuration

### Fichiers créés/modifiés :
- `commitlint.config.cjs` - Configuration des règles de commit
- `.husky/commit-msg` - Hook pour valider les messages de commit
- `package.json` - Configuration cz-git pour les prompts interactifs

### Dépendances installées :
- `@commitlint/cli` - CLI pour valider les commits
- `@commitlint/config-conventional` - Règles conventional commits
- `cz-git` - Interface interactive pour créer des commits

## 🚀 Utilisation

### Format des messages de commit :
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types valides :
- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation
- `style:` - Mise en forme (espaces, etc.)
- `refactor:` - Refactoring du code
- `test:` - Ajout/modification de tests
- `chore:` - Tâches de maintenance

### Exemples :
```bash
git commit -m "feat: add search functionality"
git commit -m "fix: resolve login issue"
git commit -m "docs: update README with new features"
```

### Commit interactif avec cz-git :
```bash
npx cz
```

## ✅ Tests réussis

La configuration a été testée et validée. Les commits non-conformes seront automatiquement rejetés par le hook `commit-msg`.

Prêt pour la **vague 3** ! 🌊
