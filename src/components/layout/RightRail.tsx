'use client'

import * as React from 'react'

import ActionsBar from './ActionsBar'

export default function RightRail({
  onOpenFilter, // eslint-disable-line @typescript-eslint/no-unused-vars
  onOpenSearch, // eslint-disable-line @typescript-eslint/no-unused-vars
}: {
  onOpenSearch: () => void
  onOpenFilter: () => void
}) {
  return (
    <aside className="rightRail" aria-label="Quick actions">
      <ActionsBar />
    </aside>
  )
}
