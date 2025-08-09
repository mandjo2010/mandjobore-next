'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, Mail, Github, Linkedin, Twitter } from 'lucide-react'

const categories = [
  { name: 'All Posts', href: '/', count: 10 },
  { name: 'Data viz', href: '/blog?category=data-viz', count: 3 },
  { name: 'Satellite', href: '/blog?category=satellite', count: 2 },
  { name: 'Spatial Data', href: '/blog?category=spatial-data', count: 3 },
  { name: 'Agro', href: '/blog?category=agro', count: 2 },
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/mandjobore', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/mandjobore', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/mandjobore', icon: Twitter },
  { name: 'Email', href: 'mailto:mandjo.bore@example.com', icon: Mail },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full h-full p-6">
      {/* Profile Section */}
      <div className="text-center mb-8">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <Image
            src="/images/avatar.svg"
            alt="Mandjo Béa Boré"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Mandjo Béa Boré
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          Data analyst - Developer
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Passionate about geospatial data, remote sensing, and data visualization. 
          Turning spatial information into meaningful insights.
        </p>
        
        {/* Location */}
        <div className="flex items-center justify-center mt-3 text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1" />
          <span>France</span>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-4 mb-8">
        {socialLinks.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              aria-label={link.name}
            >
              <Icon className="w-5 h-5" />
            </a>
          )
        })}
      </div>

      {/* Navigation Categories */}
      <nav>
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
          CATÉGORIES
        </h3>
        <ul className="space-y-1">
          {categories.map((category) => {
            const isActive = pathname === category.href || 
              (category.href.includes('category') && pathname.includes(category.href.split('=')[1]))
            
            return (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className={`flex items-center justify-between w-full text-left px-3 py-2 rounded transition-colors ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-700 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <span className="text-sm">{category.name}</span>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* CTA Contact */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Let's work together
        </h3>
        <p className="text-xs text-gray-600 mb-3">
          Interested in data analysis or geospatial projects?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
        >
          Get in touch
        </Link>
      </div>
    </div>
  )
}
