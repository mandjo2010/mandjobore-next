/**
 * Page de test pour les styles d'articles exacts selon styles.txt
 */
import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import Post from '@/components/post'

export default function TestPostStylesPage() {
  // Données de test pour reproduire un article complet
  const testPost = {
    slug: '/test-styles',
    title: 'Test des Styles d\'Articles',
    subTitle: 'Vérification des tailles de police exactes selon styles.txt',
    date: '2025-01-15',
    content: `
      <p>Ceci est un test pour vérifier que tous les styles d'articles correspondent exactement aux spécifications de l'ancien code Gatsby.</p>
      
      <h2>Spécifications attendues</h2>
      
      <ul>
        <li><strong>Titre article</strong>: Open Sans 600, 27px, rgb(85, 85, 85)</li>
        <li><strong>Sous-titre article</strong>: Open Sans 300, 23px, rgb(85, 85, 85)</li>
        <li><strong>Nom auteur</strong>: Open Sans 300, 27px, rgb(85, 85, 85)</li>
        <li><strong>Bio auteur</strong>: Open Sans 300, 15px, rgb(85, 85, 85)</li>
      </ul>
      
      <p>Le rendu ci-dessous devrait correspondre exactement aux spécifications originales de Gatsby.</p>
      
      <blockquote>
        <p>Cette blockquote teste également le formatage du contenu avec les styles appropriés.</p>
      </blockquote>
      
      <h3>Sous-titre de section</h3>
      
      <p>Ce paragraphe teste le rendu du contenu principal avec les bonnes couleurs et espacements.</p>
    `,
    excerpt: 'Test des styles d\'articles pour vérifier la conformité avec l\'ancien code Gatsby.',
    frontmatter: {
      title: 'Test des Styles d\'Articles',
      subTitle: 'Vérification des tailles de police exactes selon styles.txt'
    },
    fields: {
      prefix: '2025-01-15'
    }
  }

  const author = {
    name: 'Mandjo Béa Boré',
    bio: 'Data Analyst & Developer. Design and build geospatial applications with modern web technologies.',
    avatar: '/images/jpg/avatar.jpg'
  }

  return (
    <>
      <Head>
        <title>Test Styles Articles - Gatsby Migration</title>
        <meta name="description" content="Page de test pour vérifier les styles d'articles exacts" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout left={<div />}>
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            color: '#709425', 
            fontSize: '24px', 
            marginBottom: '20px',
            borderBottom: '2px solid #e0e0e0',
            paddingBottom: '10px'
          }}>
            🎨 Test des Styles d'Articles
          </h1>
          
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '5px',
            marginBottom: '30px',
            fontSize: '14px'
          }}>
            <strong>Instructions :</strong> Vérifiez que les styles ci-dessous correspondent exactement aux spécifications :
            <ul style={{ margin: '10px 0 0 20px' }}>
              <li>Titre principal : Open Sans 600, 27px, rgb(85, 85, 85)</li>
              <li>Sous-titre : Open Sans 300, 23px, rgb(85, 85, 85)</li>
              <li>Nom auteur : Open Sans 300, 27px, rgb(85, 85, 85)</li>
              <li>Bio auteur : Open Sans 300, 15px, rgb(85, 85, 85)</li>
            </ul>
          </div>

          <Post 
            post={testPost}
            author={author}
            facebookAppId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
          />
        </div>
      </Layout>
    </>
  )
}
