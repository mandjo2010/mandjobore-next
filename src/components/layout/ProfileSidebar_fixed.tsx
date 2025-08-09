'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Facebook,
  ChevronUp,
  ChevronDown,
  Calendar,
  Clock 
} from 'lucide-react'
import XIcon from '../ui/XIcon'
import type { Post } from '@/types'

const navItems = [
  { name: 'about', label: 'about', href: '/about' },
  { name: 'cartography', label: 'cartography', href: '/starters' },
  { name: 'portfolio', label: 'portfolio', href: '/portfolio' },
  { name: 'contact', label: 'contact', href: '/contact' }
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/mandjobore', icon: Github, color: 'text-purple-600' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/mandjobore', icon: Linkedin, color: 'text-gray-400' },
  { name: 'Facebook', href: '#', icon: Facebook, color: 'text-gray-400' },
  { name: 'Email', href: 'mailto:mandjo.bore@example.com', icon: Mail, color: 'text-orange-500' },
  { name: 'X', href: 'https://x.com/mandjobore', icon: null, color: 'text-blue-400' },
]

const techLogos = [
  { name: 'Next.js', icon: '▲', textColor: 'text-black' },
  { name: 'React', icon: '⚛️', textColor: 'text-blue-500' },
  { name: 'TypeScript', icon: 'TS', textColor: 'text-blue-600' },
  { name: 'JavaScript', icon: 'JS', textColor: 'text-yellow-500' },
  { name: 'Tailwind', icon: '💨', textColor: 'text-cyan-500' },
  { name: 'Vercel', icon: '▲', textColor: 'text-gray-900' },
  { name: 'Git', icon: '⚡', textColor: 'text-orange-600' },
  { name: 'VSCode', icon: '⟨⟩', textColor: 'text-blue-500' },
  { name: 'Node.js', icon: '⬢', textColor: 'text-green-600' }
]

const getTechUrl = (techName: string): string => {
  const urls: { [key: string]: string } = {
    'Next.js': 'https://nextjs.org',
    'React': 'https://reactjs.org',
    'TypeScript': 'https://typescriptlang.org',
    'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    'Tailwind': 'https://tailwindcss.com',
    'Vercel': 'https://vercel.com',
    'Git': 'https://git-scm.com',
    'VSCode': 'https://code.visualstudio.com',
    'Node.js': 'https://nodejs.org'
  }
  return urls[techName] || '#'
}

interface ProfileSidebarProps {
  onPostsListToggle?: () => void
  showPostsList?: boolean
  posts?: Post[]
}

export default function ProfileSidebar({ onPostsListToggle, showPostsList = false, posts = [] }: ProfileSidebarProps) {
  const pathname = usePathname()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <aside className="hidden lg:block fixed left-0 top-0 h-screen w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="h-full flex flex-col">
        <div className="flex-1 p-8 text-center">
          {/* Avatar */}
          <div className="mb-8">
            <div className="relative w-20 h-20 mx-auto">
              <Image
                src="/images/avatar.svg"
                alt="Mandjo Béa Boré"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>
          
          {/* Name and Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-light text-gray-800 mb-2">
              Mandjo Béa Boré
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Data analyst - Developer
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-8 max-w-xs mx-auto">
              Design and build applications to support data including spatial & geospatial ones.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-5 mb-12">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`${link.color} hover:opacity-75 transition-opacity`}
                  aria-label={link.name}
                >
                  {link.name === 'X' ? (
                    <XIcon size={24} />
                  ) : Icon ? (
                    <Icon size={24} />
                  ) : null}
                </a>
              )
            })}
          </div>

          {/* Navigation Menu */}
          <nav className="mb-12">
            <ul className="space-y-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`text-lg transition-colors ${
                        isActive
                          ? 'text-gray-900 font-medium'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Built with section */}
        <div className="p-8 border-t border-gray-100">
          <div className="text-center mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">
              built with:
            </p>
            
            {/* Grille 6x2 des technologies */}
            <div className="grid grid-cols-6 gap-2 mb-6">
              {techLogos.map((tech, index) => (
                <div key={tech.name} className="flex justify-center">
                  <a
                    href={getTechUrl(tech.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                    title={tech.name}
                  >
                    <span className={`text-lg ${tech.textColor || 'text-gray-600'}`}>
                      {tech.icon}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          {/* List of posts button */}
          <div className="text-center">
            <button
              onClick={onPostsListToggle}
              className="text-sm text-gray-600 hover:text-gray-800 uppercase tracking-wider flex items-center justify-center space-x-2 mx-auto transition-colors"
            >
              <span>LIST OF POSTS</span>
              {showPostsList ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          </div>
        </div>

        {/* Expanded Posts List */}
        {showPostsList && posts.length > 0 && (
          <div className="border-t border-gray-100 bg-white max-h-96 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Recent Posts ({posts.length})</h3>
              <div className="space-y-3">
                {posts.slice(0, 8).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="block group"
                  >
                    <div className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={12} />
                          <span>{Math.ceil(post.readingTime)}min</span>
                        </div>
                      </div>
                      {post.category && (
                        <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                          {post.category}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              {posts.length > 8 && (
                <div className="mt-4 text-center">
                  <Link
                    href="/"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all posts →
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
