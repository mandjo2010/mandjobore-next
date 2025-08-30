/**
 * Générateur d'images d'avatar pour les articles
 * Système d'images basé sur les catégories et fallback vers des images aléatoires
 */

// Images par catégorie - URLs d'images de qualité via Unsplash
const categoryImages: Record<string, string[]> = {
  'data': [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=120&h=120&fit=crop&crop=center'
  ],
  'design': [
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=120&h=120&fit=crop&crop=center'
  ],
  'development': [
    'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=120&h=120&fit=crop&crop=center'
  ],
  'technology': [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=120&h=120&fit=crop&crop=center'
  ],
  'tutorial': [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=120&h=120&fit=crop&crop=center'
  ],
  'web': [
    'https://images.unsplash.com/photo-1547658719-da2b51169166?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=120&h=120&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120&h=120&fit=crop&crop=center'
  ]
}

// Images par défaut pour les articles sans catégorie spécifique
const defaultImages: string[] = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=120&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?w=120&h=120&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=120&h=120&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=120&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=120&h=120&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=120&h=120&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1574169208507-84376144848b?w=120&h=120&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=120&h=120&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&h=120&fit=crop&crop=center'
]

// Générateur d'avatars SVG inline (toujours disponible)
const generateInlineSVGAvatar = (seed: string, index: number = 0): string => {
  const colors = [
    '#4f46e5', '#059669', '#dc2626', '#7c3aed', '#ea580c',
    '#0891b2', '#be123c', '#16a34a', '#ca8a04', '#1d4ed8'
  ]
  
  const patterns = [
    'circles', 'squares', 'triangles', 'hexagons', 'diamonds'
  ]
  
  const colorIndex = index % colors.length
  const color = colors[colorIndex]
  
  // Hash simple pour créer des formes pseudo-aléatoires basées sur le seed
  const hash = seed.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  
  const pattern = patterns[Math.abs(hash) % patterns.length]
  
  let svgContent = ''
  
  switch (pattern) {
    case 'circles':
      svgContent = `
        <circle cx="30" cy="30" r="20" fill="${color}" opacity="0.8"/>
        <circle cx="45" cy="15" r="8" fill="white" opacity="0.6"/>
        <circle cx="15" cy="45" r="6" fill="white" opacity="0.4"/>
      `
      break
    case 'squares':
      svgContent = `
        <rect x="10" y="10" width="40" height="40" fill="${color}" opacity="0.8" rx="4"/>
        <rect x="35" y="5" width="20" height="20" fill="white" opacity="0.6" rx="2"/>
        <rect x="5" y="35" width="15" height="15" fill="white" opacity="0.4" rx="2"/>
      `
      break
    case 'triangles':
      svgContent = `
        <polygon points="30,10 10,50 50,50" fill="${color}" opacity="0.8"/>
        <polygon points="45,15 35,30 55,30" fill="white" opacity="0.6"/>
        <polygon points="15,35 5,50 25,50" fill="white" opacity="0.4"/>
      `
      break
    case 'hexagons':
      svgContent = `
        <polygon points="30,5 45,15 45,35 30,45 15,35 15,15" fill="${color}" opacity="0.8"/>
        <polygon points="40,10 50,15 50,25 40,30 30,25 30,15" fill="white" opacity="0.6"/>
      `
      break
    default: // diamonds
      svgContent = `
        <polygon points="30,5 50,30 30,55 10,30" fill="${color}" opacity="0.8"/>
        <polygon points="40,10 50,20 40,30 30,20" fill="white" opacity="0.6"/>
        <polygon points="20,25 30,35 20,45 10,35" fill="white" opacity="0.4"/>
      `
  }
  
  return `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
      <rect width="60" height="60" fill="#f8fafc" rx="30"/>
      ${svgContent}
    </svg>
  `)}`
}

/**
 * Génère une image d'avatar pour un article
 * @param slug - Slug de l'article pour la consistance
 * @param category - Catégorie de l'article
 * @param title - Titre de l'article
 * @param index - Index de l'article dans la liste (pour la rotation)
 * @returns URL de l'image d'avatar
 */
export function getArticleAvatarImage(
  slug: string, 
  category?: string | null, 
  title?: string,
  index?: number
): string {
  // Normaliser la catégorie
  const normalizedCategory = category?.toLowerCase().trim()
  
  // Essayer de trouver une image basée sur la catégorie
  if (normalizedCategory && categoryImages[normalizedCategory]) {
    const categoryImagesList = categoryImages[normalizedCategory]
    // Utiliser le hash du slug pour la consistance
    const slugHash = slug.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    const imageIndex = Math.abs(slugHash) % categoryImagesList.length
    return categoryImagesList[imageIndex]
  }
  
  // Essayer de détecter la catégorie basée sur le titre
  if (title) {
    const titleLower = title.toLowerCase()
    const detectedCategory = Object.keys(categoryImages).find(cat => 
      titleLower.includes(cat) || 
      titleLower.includes('react') && cat === 'development' ||
      titleLower.includes('javascript') && cat === 'web' ||
      titleLower.includes('python') && cat === 'data' ||
      titleLower.includes('css') && cat === 'design'
    )
    
    if (detectedCategory) {
      const categoryImagesList = categoryImages[detectedCategory]
      const titleHash = title.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0)
        return a & a
      }, 0)
      const imageIndex = Math.abs(titleHash) % categoryImagesList.length
      return categoryImagesList[imageIndex]
    }
  }
  
  // Fallback vers les images par défaut
  if (typeof index === 'number') {
    return defaultImages[index % defaultImages.length]
  }
  
  // Fallback final basé sur le slug
  const slugHash = slug.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  const imageIndex = Math.abs(slugHash) % defaultImages.length
  return defaultImages[imageIndex]
}

/**
 * Génère une image d'avatar de style pattern coloré
 * @param seed - Graine pour la génération (slug ou titre)
 * @param index - Index pour la rotation des couleurs
 * @returns URL de l'avatar pattern
 */
export function getArticlePatternAvatar(seed: string, index?: number): string {
  const effectiveIndex = typeof index === 'number' ? index : 0
  return generateInlineSVGAvatar(seed, effectiveIndex)
}

/**
 * Détermine si utiliser une vraie image ou un pattern basé sur les préférences
 * @param slug - Slug de l'article
 * @param category - Catégorie de l'article
 * @param title - Titre de l'article
 * @param index - Index de l'article
 * @param usePatterns - Préférer les patterns aux images réelles
 * @returns URL de l'avatar approprié
 */
export function getArticleAvatar(
  slug: string,
  category?: string | null,
  title?: string,
  index?: number,
  usePatterns: boolean = false
): string {
  if (usePatterns) {
    return getArticlePatternAvatar(slug + (title || ''), index)
  }
  
  return getArticleAvatarImage(slug, category, title, index)
}
