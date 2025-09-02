/**
 * Post - Composant principal d'article reproduisant le design Gatsby original
 * Basé sur src/components/Post/Post.js du starter de Greg Lobinski
 */
'use client'

import Article from '../Main/Article'
import PostHeader from './PostHeader'
import Content from '../Main/Content'
import PostFooter from './PostFooter'

interface PostProps {
  post: {
    title: string
    subTitle?: string
    slug: string
    excerpt?: string
    content?: string
    html?: string
    date: string
    frontmatter?: {
      title?: string
      subTitle?: string
      date?: string
    }
    fields?: {
      prefix?: string
    }
  }
  author?: {
    name: string
    bio: string
    avatar: string
  }
  facebookAppId?: string
}

export default function Post({ post, author, facebookAppId }: PostProps) {
  // Extraction des données avec fallbacks
  const frontmatter = post.frontmatter || {}
  const fields = post.fields || {}
  
  const title = frontmatter.title || post.title
  const subTitle = frontmatter.subTitle || post.subTitle
  const date = fields.prefix || frontmatter.date || post.date
  const html = post.html || post.content || ''

  return (
    <Article>
      {/* En-tête de l'article */}
      <PostHeader 
        title={title}
        subTitle={subTitle}
        date={date}
      />
      
      {/* Contenu principal */}
      <Content html={html} />
      
      {/* Pied de page avec partage, auteur et commentaires */}
      <PostFooter 
        post={{
          title,
          excerpt: post.excerpt,
          slug: post.slug
        }}
        author={author}
        facebookAppId={facebookAppId}
      />
    </Article>
  )
}
