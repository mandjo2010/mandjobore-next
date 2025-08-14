// src/lib/utils.ts

// Petite fonction pour composer des classes (équivalent clsx)
export function cn(
	...values: Array<string | false | null | undefined | Record<string, boolean>>
): string {
	const out: string[] = []

	for (const v of values) {
		if (!v) continue
		if (typeof v === 'string') {
			out.push(v)
		} else {
			for (const [k, ok] of Object.entries(v)) {
				if (ok) out.push(k)
			}
		}
	}
	// Déduplique proprement
	return Array.from(new Set(out.join(' ').trim().split(/\s+/))).join(' ')
}

// Helpers génériques (facultatifs mais utiles partout)
export const isBrowser = typeof window !== 'undefined'

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function throttle<F extends (...args: unknown[]) => void>(
	fn: F,
	wait = 200
): F {
	let last = 0
	let timer: ReturnType<typeof setTimeout> | undefined
	return function (this: unknown, ...args: Parameters<F>) {
		const now = Date.now()
		const remaining = wait - (now - last)
		if (remaining <= 0) {
			last = now
			fn.apply(this as unknown as ThisParameterType<F>, args)
		} else {
			if (timer) clearTimeout(timer)
			timer = setTimeout(() => {
				last = Date.now()
				fn.apply(this as unknown as ThisParameterType<F>, args)
			}, remaining)
		}
	} as F
}

export function slugify(input: string): string {
	return input
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '')
}

export function formatDate(iso: string, locale = 'fr-FR') {
	const d = new Date(iso)
	return isNaN(d.getTime())
		? iso
		: d.toLocaleDateString(locale, {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
		  })
}
