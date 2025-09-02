/**
 * Page de test pour les composants Post
 * Permet de vérifier la reproduction du design Gatsby original
 */
import { GetStaticProps } from 'next'
import Head from 'next/head'
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper'
import Post from '@/components/post'

const samplePost = {
  slug: '/test-post',
  title: 'Test Article - Reproduction du Design Gatsby',
  subTitle: 'Vérification de la migration des composants Post vers Next.js',
  date: '2024-01-29',
  excerpt: 'Cet article de test permet de vérifier que tous les composants Post reproduisent fidèlement le design Gatsby original.',
  content: `
# Test de l'affichage Markdown

Ceci est un **test** de l'affichage du contenu Markdown dans le nouveau système d'articles Next.js.

## Fonctionnalités testées

- Reproduction des styles Gatsby originaux
- Composants PostHeader, Content, PostFooter
- PostShare avec réseaux sociaux
- PostAuthor avec avatar organique
- PostComments (placeholder)

### Éléments de style

Le contenu doit avoir :
- Police et tailles identiques à Gatsby
- Espacement fidèle au thème original
- Couleurs exactes des titres et texte
- Liens avec la couleur verte caractéristique

> Citation en bloc pour tester le style blockquote avec bordure latérale et style italique caractéristique du thème Gatsby.

**Liste à puces :**
- Élément 1 avec style circle
- Élément 2 avec bon espacement
- Élément 3 avec indentation correcte

**Code inline** et blocs de code :

\`\`\`javascript
// Test de coloration syntaxique
const gatsby = 'migration'
const nextjs = 'réussie'
console.log(\`\${gatsby} vers \${nextjs}\`)
\`\`\`

[Lien de test](https://mandjobore.dev) avec couleur et hover identiques.

*Texte en italique* et **texte en gras** avec spacing optimal.
  `,
  frontmatter: {
    title: 'Test Article - Reproduction du Design Gatsby',
    subTitle: 'Vérification de la migration des composants Post vers Next.js'
  },
  fields: {
    prefix: '2024-01-29'
  }
}

interface TestPostPageProps {
  post: typeof samplePost
}

export default function TestPostPage({ post }: TestPostPageProps) {
  return (
    <>
      <Head>
        <title>Test Post - Migration Gatsby vers Next.js</title>
        <meta name="description" content="Page de test pour vérifier la migration des composants Post" />
      </Head>
      
      <LayoutWrapper>
        <Post 
          post={{
            ...post,
            html: post.content
          }}
          author={{
            name: 'Mandjo Béa Boré',
            bio: 'Data Analyst & Developer. Design and build geospatial applications with modern web technologies.',
            avatar: '/images/jpg/avatar.jpg'
          }}
          facebookAppId="test"
        />
      </LayoutWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      post: samplePost
    }
  }
}
