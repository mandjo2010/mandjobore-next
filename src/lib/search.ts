import React from 'react'

/** Compare deux chaînes en ignorant la casse et les accents (Unicode). */
export function equalsBase(a: string, b: string) {
  return a.localeCompare(b, undefined, { sensitivity: 'base' }) === 0
}

/** Teste si `haystack` contient `needle` (insensible casse/accents). */
export function includesBase(haystack: string, needle: string) {
  const n = needle.trim()
  if (!n) return false
  // Recherche naïve basée sur localeCompare, sûre et sans regex
  for (let i = 0; i <= haystack.length - n.length; i++) {
    const slice = haystack.slice(i, i + n.length)
    if (equalsBase(slice, n)) return true
  }
  return false
}

/**
 * Retourne les plages [start, end) où `query` apparaît dans `text`,
 * comparaison insensible à la casse/accents. Index dans la string d'origine.
 */
export function findMatchesBase(text: string, query: string): Array<[number, number]> {
  const q = query.trim()
  if (!q) return []
  const out: Array<[number, number]> = []
  const qlen = q.length
  for (let i = 0; i <= text.length - qlen; i++) {
    const slice = text.slice(i, i + qlen)
    if (equalsBase(slice, q)) out.push([i, i + qlen])
  }
  return out
}

/**
 * Découpe `text` en fragments React, en surlignant les occurrences de `query`.
 * - Pas d’HTML brut (pas de XSS)
 * - Insensible aux accents/casse (localeCompare base)
 */
export function highlightParts(text: string, query: string): React.ReactNode[] {
  const matches = findMatchesBase(text, query)
  if (!matches.length) return [text]

  const nodes: React.ReactNode[] = []
  let last = 0
  matches.forEach(([start, end], idx) => {
    if (start > last) nodes.push(text.slice(last, start))
    nodes.push(
      React.createElement(
        'mark',
        { key: `h-${idx}`, style: { padding: 0, background: 'transparent', fontWeight: 700 } },
        text.slice(start, end)
      )
    )
    last = end
  })
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}
