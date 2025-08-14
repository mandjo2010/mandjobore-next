import Fuse from 'fuse.js'
import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'

export type SearchItem = { title: string; slug: string; description?: string }

export type SearchOverlayProps = {
  isOpen: boolean
  onClose: () => void
  posts: SearchItem[]
}

export default function SearchOverlay({ isOpen, onClose, posts }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [show, setShow] = useState(isOpen)
  const [leaving, setLeaving] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Fuse index
  const fuse = useMemo(() => new Fuse<SearchItem>(posts, { includeScore: true, keys: ['title', 'description'], threshold: 0.35 }), [posts])

  // Handle mount/unmount for fade in/out
  useEffect(() => {
    if (isOpen) {
      setShow(true)
      setLeaving(false)
      const t = setTimeout(() => inputRef.current?.focus(), 0)
      return () => clearTimeout(t)
    } else if (show) {
      setLeaving(true)
      const t = setTimeout(() => {
        setShow(false)
        setQuery('')
        setResults([])
        setLeaving(false)
      }, 200)
      return () => clearTimeout(t)
    }
  }, [isOpen, show])

  // Close on Escape
  useEffect(() => {
    if (!show) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [show, onClose])

  // Search
  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }
    const r = fuse
      .search(query)
      .slice(0, 20)
      .map((x) => ({ description: x.item.description, slug: x.item.slug, title: x.item.title }))
    setResults(r)
  }, [query, fuse])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${leaving ? 'opacity-0' : 'opacity-100'}`}
      aria-modal="true"
      role="dialog"
      aria-label="Search articles"
    >
      <div className="mx-auto w-full max-w-3xl p-4">
        <div className="relative rounded-lg bg-white shadow-xl ring-1 ring-black/5">
          <div className="flex items-center gap-3 border-b px-4 py-3">
            <label htmlFor="global-search" className="sr-only">
              Search
            </label>
            <input
              id="global-search"
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search input"
              className="w-full bg-transparent outline-none placeholder:text-gray-400"
            />
            <button type="button" onClick={onClose} aria-label="Close search" title="Close" className="rounded p-2 hover:bg-gray-100">
              ✕
            </button>
          </div>
          <div className="max-h-[70vh] overflow-y-auto">
            {!query && (
              <p className="px-4 py-6 text-sm text-gray-500">Type to search posts by title or excerpt</p>
            )}
            {results.length === 0 && query && (
              <p className="px-4 py-6 text-sm text-gray-500">No results</p>
            )}
            <ul className="divide-y">
              {results.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/posts/${r.slug}`}
                    className="block px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    onClick={onClose}
                    aria-label={`Open article ${r.title}`}
                  >
                    <h3 className="font-medium">{r.title}</h3>
                    {r.description && <p className="text-sm text-gray-600 line-clamp-2">{r.description}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tailwind animation (can be placed globally)
// .animate-fadeIn { @apply transition-opacity duration-200; animation: fadeIn 0.2s ease-out; }
// @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
