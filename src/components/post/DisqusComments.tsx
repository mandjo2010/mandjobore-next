/**
 * DisqusComments - Composant de commentaires utilisant Disqus
 * Solution populaire avec modération avancée
 */
'use client'

import { useEffect, useRef } from 'react'

interface DisqusCommentsProps {
  slug: string
  title: string
}

export default function DisqusComments({ slug, title }: DisqusCommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const shortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME
    if (!shortname) return

    // Configuration Disqus
    ;(window as any).disqus_config = function () {
      this.page.url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mandjobore.com'}/posts/${slug}`
      this.page.identifier = slug
      this.page.title = title
    }

    // Charger le script Disqus
    if (!(window as any).DISQUS) {
      const script = document.createElement('script')
      script.src = `https://${shortname}.disqus.com/embed.js`
      script.setAttribute('data-timestamp', String(Date.now()))
      script.async = true
      document.head.appendChild(script)
    } else {
      // Recharger Disqus si déjà présent
      ;(window as any).DISQUS.reset({
        config: (window as any).disqus_config,
        reload: true
      })
    }
  }, [slug, title])

  return <div ref={commentsRef} id="disqus_thread" />
}
