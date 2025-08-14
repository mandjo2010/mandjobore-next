import React from 'react'

interface ThreeColumnLayoutProps {
  left?: React.ReactNode
  center: React.ReactNode
  right?: React.ReactNode
}

export default function ThreeColumnLayout({ center, left, right }: ThreeColumnLayoutProps) {
  return (
    <div className="min-h-screen bg-white layout-container">
      <div className="mx-auto max-w-[1200px] relative">
        <div className="flex min-h-screen">
          {/* Left */}
          <aside className="hidden md:block w-[280px] overflow-y-auto relative">
            {left}
          </aside>

          {/* Center */}
          <main className="flex-1 min-w-0 overflow-y-auto px-6 main-content">{center}</main>

          {/* Right */}
          <aside className="hidden lg:block w-[60px] relative">
            {right}
          </aside>
        </div>
      </div>
    </div>
  )
}
