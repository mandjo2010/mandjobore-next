import fs from "fs";
import path from "path";

import matter from "gray-matter";

import type { FrontMatter, MDEntry } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "public", "content");

function byDateDesc(a: MDEntry, b: MDEntry) {
  const da = a.data?.date ? new Date(a.data.date).getTime() : 0;
  const db = b.data?.date ? new Date(b.data.date).getTime() : 0;
  return db - da;
}

export function getSlugs(type: "posts" | "pages") {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((name) =>
    fs.existsSync(path.join(dir, name, "index.md"))
  );
}

// Réécrit ![](./image.png) → /content/<type>/<slug>/image.png
function rewriteRelativeImages(md: string, type: string, slug: string) {
    return md.replace(/!\[[^\]]*\]\((?:\.\/)?([^)]+)\)/g, (m, rel) => {
      if (/^https?:\/\//i.test(rel)) return m;            // laisse les URLs absolues
      const clean = rel.replace(/^\.\//, "");             // enlève le "./" de tête
      return m.replace(/\([^)]+\)/, `(/content/${type}/${slug}/${clean})`);
      });
    }
export function getBySlug(type: "posts" | "pages", slug: string): MDEntry {
  const file = path.join(CONTENT_DIR, type, slug, "index.md");
  const raw = fs.readFileSync(file, "utf8");
  const { content, data } = matter(raw);
  return { content: rewriteRelativeImages(content, type, slug), data: data as FrontMatter, slug };
}

export function getAll(type: "posts" | "pages"): MDEntry[] {
  return getSlugs(type).map((slug) => getBySlug(type, slug)).sort(byDateDesc);
}

export function getAllCategories(posts: MDEntry[]) {
  const set = new Set<string>();
  posts.forEach((p) => { if (p.data?.category) set.add(p.data.category!); });
  return Array.from(set).sort();
}

// URL de cover depuis frontmatter (fallback si manquant)
export function getCoverUrl(entry: MDEntry, type: "posts" | "pages"): string {
  const cover = entry.data?.cover?.toString().trim();
  if (cover) {
    return `/content/${type}/${entry.slug}/${cover}`;
  }
  return "/images/test-cover.svg"; // fallback existant
}
