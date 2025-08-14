import { Github, Linkedin, Facebook, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfileSidebar() {
  const techStack = [
    { href: 'https://nextjs.org/', name: 'Next.js', src: '/images/svg-icons/nextjs.svg' },
    { href: 'https://reactjs.org/', name: 'React', src: '/images/svg-icons/react.svg' },
    { href: 'https://www.typescriptlang.org/', name: 'TypeScript', src: '/images/svg-icons/typescript.svg' },
    { href: 'https://mui.com/', name: 'Material-UI', src: '/images/svg-icons/material-ui.svg' },
    { href: 'https://graphql.org/', name: 'GraphQL', src: '/images/svg-icons/graphql.svg' },
    { href: 'https://webpack.js.org/', name: 'Webpack', src: '/images/svg-icons/webpack.svg' },
  ]

  return (
    <aside className="sidebar">
      <div className="profileContent">
        <div className="profileHeader">
          <div className="profileAvatar">
            <Image src="/images/avatar.svg" alt="" fill sizes="72px" />
          </div>
          <h1 className="authorName">Mandjo Béa Boré</h1>
          <p className="authorRole">Data analyst - Developer</p>
        </div>

        <p className="bioText">
          Design and build applications to support data including spatial &amp; geospatial ones.
        </p>

        <div className="profileSocial">
          <a href="https://github.com/mandjobore" aria-label="GitHub" target="_blank" rel="noreferrer">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/mandjobore" aria-label="LinkedIn" target="_blank" rel="noreferrer">
            <Linkedin size={20} />
          </a>
          <a href="https://facebook.com/mandjobore" aria-label="Facebook" target="_blank" rel="noreferrer">
            <Facebook size={20} />
          </a>
          <a href="https://twitter.com/mandjobore" aria-label="X (Twitter)" target="_blank" rel="noreferrer">
            <Twitter size={20} />
          </a>
        </div>

        <nav className="profileNav" aria-label="Quick links">
          <Link href="/pages/about" className="nav-item">about</Link>
          <Link href="/cartography" className="nav-item">cartography</Link>
          <Link href="/portfolio" className="nav-item">portfolio</Link>
          <Link href="/contact" className="nav-item">contact</Link>
        </nav>
      </div>

      <div className="builtWith">
        <p className="builtTitle">built with:</p>
        <ul className="builtGrid">
          {techStack.map(tech => (
            <li key={tech.name}>
              <a href={tech.href} target="_blank" rel="noreferrer">
                <img src={tech.src} alt={tech.name} width="28" height="28" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
