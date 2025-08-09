import { marked } from 'marked'

// Configuration de marked pour un rendu sûr et optimisé
marked.setOptions({
	gfm: true, // GitHub Flavored Markdown
	breaks: true, // Conversion des retours à la ligne
	sanitize: false, // Pas de sanitisation automatique
	smartLists: true,
	smartypants: true, // Conversion automatique des quotes
})

/**
 * Convertit le markdown en HTML
 */
export function parseMarkdown(markdown: string): string {
	return marked(markdown)
}

/**
 * Extrait un extrait du contenu markdown (sans HTML)
 */
export function extractExcerpt(content: string, maxLength: number = 160): string {
	// Supprime les en-têtes markdown
	const withoutHeaders = content.replace(/^#{1,6}\s+/gm, '')
	
	// Supprime les liens markdown
	const withoutLinks = withoutHeaders.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
	
	// Supprime les autres syntaxes markdown
	const withoutMarkdown = withoutLinks
		.replace(/\*\*([^*]+)\*\*/g, '$1') // bold
		.replace(/\*([^*]+)\*/g, '$1') // italic
		.replace(/`([^`]+)`/g, '$1') // code
		.replace(/>\s+/g, '') // blockquotes
		.replace(/\n+/g, ' ') // newlines
		.trim()
	
	if (withoutMarkdown.length <= maxLength) {
		return withoutMarkdown
	}
	
	return withoutMarkdown.substring(0, maxLength).trim() + '...'
}
