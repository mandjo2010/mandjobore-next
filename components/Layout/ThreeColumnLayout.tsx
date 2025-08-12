import React from 'react'

interface ThreeColumnLayoutProps {
  left?: React.ReactNode
  center: React.ReactNode
  right?: React.ReactNode
}

export default function ThreeColumnLayout({ left, center, right }: ThreeColumnLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex min-h-screen">
          {/* Left */}
          <aside className="hidden md:block w-[280px] border-r border-gray-200 overflow-y-auto">{left}</aside>

          {/* Center */}
          <main className="flex-1 min-w-0 overflow-y-auto">{center}</main>

          {/* Right */}
          <aside className="hidden lg:block w-[60px] border-l border-gray-200">{right}</aside>
        </div>
      </div>
    </div>
  )
}
