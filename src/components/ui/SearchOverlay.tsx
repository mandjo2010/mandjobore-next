'use client'

import * as React from 'react'
import type { KeyboardEvent, ChangeEvent } from 'react'
import { useState, useEffect, useRef, useMemo } from 'react'
import { Search, X, Calendar } from 'lucide-react'
import Link from 'next/link'
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import type { SelectChangeEvent } from '@mui/material/Select'
import type { Post } from '@/types'
import { useUIStore } from '@/store/ui'
import { useRouter } from 'next/router'
import { highlightParts, includesBase } from '@/lib/search'

export default function SearchOverlay({ posts }: { posts: Post[] }) {
  const isOpen = useUIStore((s: { isSearchOpen: boolean }) => s.isSearchOpen)
  const toggleSearch = useUIStore((s: { toggleSearch: () => void }) => s.toggleSearch)
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts)
  const [activeIndex, setActiveIndex] = useState(0)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const categories = useMemo(() => Array.from(new Set(posts.map(post => post.category).filter(Boolean))), [posts])
  const tags = useMemo(() => Array.from(new Set(posts.flatMap(post => post.tags || []))), [posts])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  // Close overlay on route change
  useEffect(() => {
    const handler = () => { if (isOpen) toggleSearch() }
    router.events?.on('routeChangeStart', handler)
    return () => {
      router.events?.off('routeChangeStart', handler)
    }
  }, [router.events, isOpen, toggleSearch])

  useEffect(() => {
    let filtered = posts
    const q = searchQuery.trim()

    // Si aucune requête et aucun filtre => ne rien lister
    if (!q && !selectedCategory && !selectedTag) {
      setFilteredPosts([])
      setActiveIndex(-1)
      return
    }

    if (q) {
      filtered = filtered.filter(post => {
        const hay = `${post.title} ${post.excerpt ?? ''} ${post.category ?? ''} ${(post.tags ?? []).join(' ')}`
        return includesBase(hay, q)
      })
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }
    if (selectedTag) {
      filtered = filtered.filter(p => p.tags && p.tags.includes(selectedTag))
    }

    setFilteredPosts(filtered)
    setActiveIndex(filtered.length ? 0 : -1)
  }, [searchQuery, selectedCategory, selectedTag, posts])

  // S’assurer que l’élément actif est visible
  useEffect(() => {
    if (!isOpen) return
    if (activeIndex < 0) return
    const items = document.querySelectorAll('[data-testid="search-item"]')
    const el = items.item(activeIndex) as HTMLElement | null
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, isOpen, filteredPosts])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedTag('')
    setActiveIndex(0)
  }

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!filteredPosts.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % filteredPosts.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + filteredPosts.length) % filteredPosts.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const p = filteredPosts[activeIndex]
      if (p) {
        toggleSearch()
        void router.push(`/posts/${p.slug}`)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      toggleSearch()
    }
  }

  return (
    <Dialog
      data-testid="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
      open={isOpen}
      onClose={toggleSearch}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: (theme: Theme) => ({
          bgcolor: theme.base?.colors?.background ?? '#fff',
          color: theme.main?.colors?.content ?? '#111',
          maxHeight: '80vh',
          m: 2,
        })
      }}
      BackdropProps={{
        sx: (theme: Theme) => ({
          bgcolor: alpha((theme.base?.colors?.background ?? '#fff'), 0.92),
          backdropFilter: 'blur(2px)',
        })
      }}
    >
      <DialogTitle
        id="search-title"
        sx={(theme: Theme) => ({
          color: theme.main?.colors?.title ?? '#111',
          fontWeight: 600,
          borderBottom: `1px solid ${(theme.base?.colors?.lines ?? '#eee')}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        })}
     >
        Search & Filter Articles
        <IconButton
          onClick={toggleSearch}
          sx={(theme: Theme) => ({
            color: theme.info?.colors?.background ?? '#666',
            '&:hover': { color: theme.main?.colors?.link ?? '#000' },
          })}
          aria-label="Close search"
        >
          <X size={24} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ bgcolor: (t: Theme)=> t.base?.colors?.background ?? '#fff' }}>
          <TextField
            inputRef={searchInputRef}
            data-testid="search-input"
            fullWidth
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            onKeyDown={onKeyDown}
            sx={(theme: Theme) => ({
              mb: 3,
              '& .MuiOutlinedInput-root': {
                bgcolor: theme.base?.colors?.background ?? '#fff',
                '& fieldset': { borderColor: theme.base?.colors?.lines ?? '#eee' },
                '&:hover fieldset': { borderColor: theme.main?.colors?.link ?? '#09c' },
                '&.Mui-focused fieldset': { borderColor: theme.main?.colors?.link ?? '#09c' },
              },
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color="#999" />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel sx={(theme: Theme) => ({
                color: theme.main?.colors?.content ?? '#666',
                '&.Mui-focused': { color: theme.main?.colors?.link ?? '#09c' },
              })}>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e: SelectChangeEvent<string>) => setSelectedCategory(e.target.value)}
                label="Category"
                sx={(theme: Theme) => ({
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.base?.colors?.lines ?? '#eee' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.main?.colors?.link ?? '#09c' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.main?.colors?.link ?? '#09c' },
                })}
              >
                <MenuItem value="">All categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel sx={(theme: Theme) => ({
                color: theme.main?.colors?.content ?? '#666',
                '&.Mui-focused': { color: theme.main?.colors?.link ?? '#09c' },
              })}>Tag</InputLabel>
              <Select
                value={selectedTag}
                onChange={(e: SelectChangeEvent<string>) => setSelectedTag(e.target.value)}
                label="Tag"
                sx={(theme: Theme) => ({
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.base?.colors?.lines ?? '#eee' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.main?.colors?.link ?? '#09c' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.main?.colors?.link ?? '#09c' },
                })}
              >
                <MenuItem value="">All tags</MenuItem>
                {tags.map(tag => (
                  <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {(searchQuery || selectedCategory || selectedTag) && (
              <Button
                variant="outlined"
                onClick={clearFilters}
                sx={(theme: Theme) => ({
                  color: theme.main?.colors?.content ?? '#666',
                  borderColor: theme.base?.colors?.lines ?? '#eee',
                  '&:hover': {
                    bgcolor: alpha((theme.main?.colors?.link ?? '#09c'), 0.1),
                    borderColor: theme.main?.colors?.link ?? '#09c',
                  },
                })}
              >
                Clear filters
              </Button>
            )}
          </Stack>

          <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.main?.colors?.content ?? '#666', mb: 2 })}>
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} trouvé{filteredPosts.length !== 1 ? 's' : ''}
          </Typography>

          {(() => {
            const limit = 30
            const slice = filteredPosts.slice(0, limit)
            const remaining = Math.max(0, filteredPosts.length - slice.length)
            return (
              <>
                <Box sx={{ maxHeight: '400px', overflow: 'auto' }} role="listbox">
                  {slice.length === 0 ? (
                    <Box sx={(theme: Theme) => ({ textAlign: 'center', py: 4, color: theme.main?.colors?.content ?? '#666' })}>
                      <Search size={48} color="#ccc" style={{ marginBottom: 16 }} />
                      <Typography variant="body1">Aucun article ne correspond à vos critères.</Typography>
                    </Box>
                  ) : (
                    <Stack spacing={2}>
                      {slice.map((post, idx) => (
                        <Link key={post.slug} href={`/posts/${post.slug}`} onClick={toggleSearch}>
                          <Card
                            data-testid="search-item"
                            role="option"
                            aria-selected={idx === activeIndex}
                            sx={(theme: Theme) => ({
                              cursor: 'pointer',
                              bgcolor: theme.base?.colors?.background ?? '#fff',
                              border: `1px solid ${(theme.base?.colors?.lines ?? '#eee')}`,
                              outline: idx === activeIndex ? `2px solid ${(theme.main?.colors?.link ?? '#09c')}` : 'none',
                              '&:hover': {
                                borderColor: theme.main?.colors?.link ?? '#09c',
                                boxShadow: `0 2px 8px ${alpha((theme.main?.colors?.link ?? '#09c'), 0.1)}`,
                              },
                            })}
                          >
                            <CardContent>
                              <Stack direction="row" spacing={2}>
                                {post.coverImage && (
                                  <Avatar variant="rounded" sx={{ width: 64, height: 64 }} src={post.coverImage} alt={post.title} />
                                )}
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="h6" sx={(theme: Theme) => ({
                                    color: theme.main?.colors?.title ?? '#111',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    mb: 1,
                                    '&:hover': { color: theme.main?.colors?.link ?? '#09c' },
                                  })}>
                                    {highlightParts(post.title, searchQuery)}
                                  </Typography>
                                  {post.excerpt && (
                                    <Typography variant="body2" sx={(theme: Theme) => ({
                                      color: theme.main?.colors?.content ?? '#222',
                                      mb: 1,
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                    })}>
                                      {highlightParts(post.excerpt, searchQuery)}
                                    </Typography>
                                  )}
                                  <Stack direction="row" spacing={2} alignItems="center">
                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                      <Calendar size={12} />
                                      <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.main?.colors?.content ?? '#666' })}>
                                        {formatDate(post.date)}
                                      </Typography>
                                    </Stack>
                                    {post.category && (
                                      <Chip label={post.category} size="small" sx={(theme: Theme) => ({
                                        bgcolor: alpha((theme.main?.colors?.link ?? '#09c'), 0.1),
                                        color: theme.main?.colors?.link ?? '#09c',
                                        fontSize: '0.75rem',
                                      })} />
                                    )}
                                  </Stack>
                                </Box>
                              </Stack>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </Stack>
                  )}
                </Box>
                {remaining > 0 && (
                  <Typography variant="caption" sx={(theme: Theme) => ({ mt: 1, display: 'block', color: theme.main?.colors?.content ?? '#666' })}>
                    +{remaining} autres résultats…
                  </Typography>
                )}
              </>
            )
          })()}
        </Box>
      </DialogContent>
    </Dialog>
  )
}
