import { remark } from 'remark'
import html from 'remark-html'

/**
 * Convertit du markdown en HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

/**
 * Fonction simple pour traiter les balises de base du markdown (gras, italique)
 * Alternative synchrone pour les cas simples
 */
export function processSimpleMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
}
