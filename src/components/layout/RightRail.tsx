'use client'

import * as React from 'react'

import ActionsBar from './ActionsBar'

export default function RightRail({
  categories = [],
  onOpenFilter: _onOpenFilter, // Préfixe _ pour indiquer que le paramètre n'est pas utilisé
  onOpenSearch: _onOpenSearch, // Préfixe _ pour indiquer que le paramètre n'est pas utilisé
}: {
  onOpenSearch: () => void
  onOpenFilter: () => void
  categories?: string[]
}) {
  // Suppression de la référence inutilisée pour éviter l'erreur TypeScript
  void _onOpenFilter
  void _onOpenSearch
  
  return (
    <aside className="rightRail" aria-label="Quick actions">
      <ActionsBar categories={categories} />
    </aside>
  )
}
