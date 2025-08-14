import React from 'react'

import ThreeColumnLayout from './ThreeColumnLayout'

export default function MainLayout({ center, left, right }: { left?: React.ReactNode; center: React.ReactNode; right?: React.ReactNode }) {
  return <ThreeColumnLayout left={left} center={center} right={right} />
}
