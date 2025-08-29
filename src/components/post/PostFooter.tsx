'use client';

import React from 'react';

/**
 * PostFooter - Reproduction exacte du système Gatsby original  
 * - PostShare avec boutons réseaux sociaux
 * - PostAuthor avec avatar et bio
 * - PostComments (Facebook comments placeholder)
 * - Styles identiques au thème Gatsby
 */

interface PostFooterProps {
  post: {
    title: string;
    excerpt: string;
    slug: string;
  };
  author?: {
    name: string;
    bio: string;
    avatar: string;
  };
  siteUrl?: string;
}

// PostShare Component - Partage sur réseaux sociaux (Gatsby original)
const PostShare: React.FC<{ post: PostFooterProps['post']; siteUrl: string }> = ({ post, siteUrl }) => {
  const { title, excerpt, slug } = post;
  const url = `${siteUrl}${slug}`;
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${excerpt}\n\n${url}`)}`
  };

  const theme = {
    main: {
      colors: {
        footer: '#555555',
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1em 0 0',
    }}>
      <span style={{
        fontSize: '1.2em',
        margin: '0 1em 1em',
        color: theme.main.colors.footer,
        fontWeight: 'bold',
      }}>
        SHARE
      </span>
      
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
      }}>
        {/* Twitter */}
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#1DA1F2',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '16px',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🐦
        </a>

        {/* Facebook */}
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#4267B2',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '16px',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          📘
        </a>

        {/* LinkedIn */}
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#0A66C2',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '16px',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          💼
        </a>

        {/* Email */}
        <a
          href={shareUrls.email}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#EA4335',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '16px',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          📧
        </a>
      </div>
    </div>
  );
};

// PostAuthor Component - Présentation de l'auteur (Gatsby original)
const PostAuthor: React.FC<{ author: PostFooterProps['author'] }> = ({ author }) => {
  if (!author) return null;

  return (
    <div style={{
      margin: '3em 0 0',
      padding: '3em 0 0',
      borderTop: '1px solid #ddd',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <img
        src={author.avatar || '/images/avatar.svg'}
        alt={author.name}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '75% 65%',
          border: '1px solid #ddd',
          marginBottom: '1em',
        }}
      />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '50px',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <h3 style={{ 
          margin: '0 0 0.5em 0', 
          color: '#333',
          fontSize: '1.2em',
        }}>
          {author.name}
        </h3>
        <p style={{ 
          margin: 0, 
          color: '#666',
          lineHeight: 1.5,
          fontSize: '0.95em',
        }}>
          {author.bio}
        </p>
      </div>
    </div>
  );
};

// PostComments Placeholder - Pour Facebook Comments (sera implémenté plus tard)
const PostComments: React.FC<{ slug: string }> = ({ slug }) => {
  return (
    <div style={{
      margin: '3em 0 0',
      padding: '3em 0 0',
      borderTop: '1px solid #ddd',
      textAlign: 'center',
      color: '#999',
      fontSize: '14px',
    }}>
      <p>💬 Comments section (Facebook Comments integration - à implémenter)</p>
      <small>URL: {slug}</small>
    </div>
  );
};

// PostFooter Principal
export default function PostFooter({ 
  post, 
  author,
  siteUrl = 'https://www.mandjobore.com'
}: PostFooterProps) {
  const theme = {
    main: {
      colors: {
        footer: '#555555',
      },
      fonts: {
        footer: {
          size: 1,
          lineHeight: 1.4,
        }
      }
    }
  };

  return (
    <footer style={{
      color: theme.main.colors.footer,
      fontSize: `${theme.main.fonts.footer.size}em`,
      lineHeight: theme.main.fonts.footer.lineHeight,
      marginTop: '3em',
    }}>
      {/* PARTAGE SOCIAL */}
      <PostShare post={post} siteUrl={siteUrl} />
      
      {/* AUTEUR */}
      <PostAuthor author={author} />
      
      {/* COMMENTAIRES */}
      <PostComments slug={post.slug} />
    </footer>
  );
}
