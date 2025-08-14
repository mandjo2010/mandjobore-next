export type CategorySlug = string;

const LABELS: Record<CategorySlug, string> = {
  'ai': 'Intelligence artificielle',
  'data': 'Data',
  'data-science': 'Data Science',
  'design': 'Design',
  'gis': 'GIS',
  'python': 'Python',
};

export function toSlug(input: string): CategorySlug {
  return (input || '')
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .trim().toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

export function toLabel(slug: string): string {
  return LABELS[slug] ?? slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function normalizeCategory(value: string): CategorySlug {
  const s = toSlug(value);
  // synonymes simples
  if (s === 'data-sciences') return 'data-science';
  if (s === 'ia' || s === 'ai-ml') return 'ai';
  if (s === 'carto' || s === 'sig') return 'gis';
  return s;
}
