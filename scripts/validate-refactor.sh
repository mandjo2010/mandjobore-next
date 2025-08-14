#!/bin/bash

echo "🎯 Validation du refactoring GatsbyJS-style"
echo "==========================================="

# Vérifier que tous les fichiers existent
echo "📁 Vérification des fichiers..."

files=(
    "src/components/blog/ArticleListItem.tsx"
    "src/components/blog/ArticleListView.tsx"
    "src/components/layout/MainLayout.tsx"
    "src/components/layout/ProfileSidebar.tsx"
    "src/components/layout/RightSidebar.tsx"
    "pages/index.tsx"
    "lib/posts.ts"
    "src/types/index.ts"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MANQUANT"
    fi
done

echo ""
echo "🔍 Vérification des imports et types..."

# Vérifier la présence de PostCard dans types
if grep -q "interface PostCard" src/types/index.ts; then
    echo "✅ Type PostCard défini"
else
    echo "❌ Type PostCard manquant"
fi

# Vérifier la fonction getAllPostsForList
if grep -q "getAllPostsForList" lib/posts.ts; then
    echo "✅ Fonction getAllPostsForList présente"
else
    echo "❌ Fonction getAllPostsForList manquante"
fi

# Vérifier l'import correct dans pages/index.tsx
if grep -q "from '../lib/posts'" pages/index.tsx; then
    echo "✅ Import correct de getAllPostsForList"
else
    echo "❌ Import incorrect de getAllPostsForList"
fi

echo ""
echo "🎨 Vérification du style GatsbyJS..."

# Vérifier le style GatsbyJS dans ArticleListItem
if grep -q "className=\"article-item\"" src/components/blog/ArticleListItem.tsx; then
    echo "✅ Style GatsbyJS implémenté (article-item)"
else
    echo "❌ Style GatsbyJS manquant"
fi

# Vérifier les styles CSS obligatoires dans GlobalCss
if grep -q "articles-list" src/theme/GlobalCss.tsx; then
    echo "✅ CSS articles-list implémenté"
else
    echo "❌ CSS articles-list manquant"
fi

# Vérifier la couleur verte lime obligatoire
if grep -q "color: '#BFFF00'" src/theme/GlobalCss.tsx; then
    echo "✅ Couleur verte lime #BFFF00 implémentée"
else
    echo "❌ Couleur verte lime manquante"
fi

# Vérifier la fonction GatsbyStyleArticles
if grep -q "getGatsbyStyleArticles" lib/posts.ts; then
    echo "✅ Fonction getGatsbyStyleArticles présente"
else
    echo "❌ Fonction getGatsbyStyleArticles manquante"
fi

echo ""
echo "🧪 Test de build..."
# Tentative de vérification TypeScript
if command -v tsc &> /dev/null; then
    echo "🔧 Vérification TypeScript..."
    npx tsc --noEmit || echo "⚠️  Erreurs TypeScript détectées"
else
    echo "⚠️  TypeScript CLI non disponible"
fi

echo ""
echo "✨ Validation terminée!"
