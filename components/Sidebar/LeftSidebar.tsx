import React, { useState } from 'react'
import Link from 'next/link'

export default function LeftSidebar({ posts }: { posts: Array<{ slug: string; title: string }> }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="p-4 text-sm">
      {/* Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Mandjo Béa Boré</h2>
        <p className="text-gray-600">Data analyst - Developer</p>
        <p className="text-gray-700 mt-2">Design and build applications to support data including spatial & geospatial ones.</p>
      </div>

      {/* Nav */}
      <nav className="mb-6 space-y-2">
        <Link href="/about" className="block hover:underline">About</Link>
        <Link href="/starters" className="block hover:underline">Cartography</Link>
        <Link href="/portfolio" className="block hover:underline">Portfolio</Link>
        <Link href="/contact" className="block hover:underline">Contact</Link>
      </nav>

      {/* Posts list */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">LIST OF POSTS</h3>
          <button onClick={() => setExpanded(v => !v)} className="text-blue-600 hover:underline">{expanded ? 'Hide' : 'Expand the list'}</button>
        </div>
        {expanded && (
          <ul className="mt-3 space-y-1">
            {posts.slice(0, 10).map(p => (
              <li key={p.slug}>
                {/* Updated link path to /posts/${slug} */}
                <Link href={`/posts/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
