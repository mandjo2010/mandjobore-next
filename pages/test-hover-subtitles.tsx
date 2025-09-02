import Head from 'next/head'
import Link from 'next/link'
import { Typography } from '@mui/material'

export default function TestHoverSubtitles() {
  return (
    <>
      <Head>
        <title>Test Effet Survol Sous-titres</title>
      </Head>
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Test des effets de survol sur les sous-titres</h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3>1. H2 normal (devrait avoir l'effet vert au survol)</h3>
          <h2>Ceci est un sous-titre H2 normal</h2>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>2. Typography MUI variant h2 (devrait avoir l'effet vert au survol)</h3>
          <Typography variant="h2">
            Ceci est un sous-titre MUI Typography h2
          </Typography>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>3. Classes personnalisées (devrait avoir l'effet vert au survol)</h3>
          <div className="blog-subtitle">Ceci est un blog-subtitle</div>
          <div className="article-subtitle">Ceci est un article-subtitle</div>
          <div className="post-subtitle">Ceci est un post-subtitle</div>
          <div className="postSubtitle">Ceci est un postSubtitle</div>
          <div className="postExcerpt">Ceci est un postExcerpt</div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>4. Dans des liens (devrait avoir l'effet vert au survol)</h3>
          <Link href="#" style={{ textDecoration: 'none' }}>
            <h2>H2 dans un Link</h2>
          </Link>
          
          <Link href="#" style={{ textDecoration: 'none' }}>
            <Typography variant="h2">
              Typography h2 dans un Link
            </Typography>
          </Link>
          
          <Link href="#" style={{ textDecoration: 'none' }}>
            <div className="blog-subtitle">blog-subtitle dans un Link</div>
          </Link>
          
          <Link href="#" style={{ textDecoration: 'none' }}>
            <div className="postSubtitle">postSubtitle dans un Link</div>
          </Link>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>5. Styles inline forcés (devrait garder l'effet vert)</h3>
          <h2 style={{ 
            fontFamily: '"Open Sans"',
            fontSize: '23px',
            lineHeight: '27px',
            fontWeight: 300,
            color: 'rgb(85, 85, 85)',
            cursor: 'pointer',
            transition: 'color 0.3s ease'
          }}>
            H2 avec styles inline
          </h2>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Instructions</h3>
          <p>Passez la souris sur tous les sous-titres ci-dessus. Ils devraient tous changer de couleur vers un vert (rgb(112, 148, 37)) au survol.</p>
          <p>Si certains ne changent pas de couleur, cela indique un conflit de styles.</p>
        </div>
      </div>
    </>
  )
}
