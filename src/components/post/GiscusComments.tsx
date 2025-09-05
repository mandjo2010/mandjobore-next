/**
 * GiscusComments - Composant de commentaires utilisant GitHub Discussions
 * Solution moderne, gratuite et sans publicité
 */
'use client'

import { useEffect, useRef } from 'react'

interface GiscusCommentsProps {
  slug: string
}

export default function GiscusComments({ slug }: GiscusCommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null)
  const isLoaded = useRef(false)

  useEffect(() => {
    if (!commentsRef.current || isLoaded.current) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', process.env.NEXT_PUBLIC_GISCUS_REPO || '')
    script.setAttribute('data-repo-id', process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '')
    script.setAttribute('data-category', process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'General')
    script.setAttribute('data-category-id', process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '')
    script.setAttribute('data-mapping', process.env.NEXT_PUBLIC_GISCUS_MAPPING || 'pathname')
    script.setAttribute('data-strict', process.env.NEXT_PUBLIC_GISCUS_STRICT || '0')
    script.setAttribute('data-reactions-enabled', process.env.NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED || '1')
    script.setAttribute('data-emit-metadata', process.env.NEXT_PUBLIC_GISCUS_EMIT_METADATA || '0')
    script.setAttribute('data-input-position', process.env.NEXT_PUBLIC_GISCUS_INPUT_POSITION || 'bottom')
    script.setAttribute('data-theme', process.env.NEXT_PUBLIC_GISCUS_THEME || 'light')
    script.setAttribute('data-lang', process.env.NEXT_PUBLIC_GISCUS_LANG || 'fr')
    script.crossOrigin = 'anonymous'
    script.async = true

    commentsRef.current.appendChild(script)
    isLoaded.current = true

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = ''
      }
      isLoaded.current = false
    }
  }, [slug])

  return <div ref={commentsRef} className="giscus-comments" />
}
