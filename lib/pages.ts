import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

const pagesDir = path.join(process.cwd(), 'content', 'pages')

export function getAllPages() {
  const dirs = walkDir(pagesDir)
  return dirs
    .filter((d) => d.endsWith('index.md'))
    .map((file) => {
      const source = fs.readFileSync(file, 'utf-8')
      const { content, data } = matter(source)
      const rel = path.relative(pagesDir, file)
      const dir = path.dirname(rel)
      return { content, data, dir }
    })
}

export function getPageByDir(dir: string) {
  const file = path.join(pagesDir, dir, 'index.md')
  if (!fs.existsSync(file)) return null
  const source = fs.readFileSync(file, 'utf-8')
  const { content, data } = matter(source)
  return { content, data, dir }
}

export function getAllPageDirs() {
  const all = walkDir(pagesDir)
  return all
    .filter((f) => f.endsWith('index.md'))
    .map((f) => path.dirname(path.relative(pagesDir, f)))
}

function walkDir(dir: string, list: string[] = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walkDir(p, list)
    else list.push(p)
  }
  return list
}
