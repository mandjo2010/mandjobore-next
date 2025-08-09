/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		mdxRs: true,
	},
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
		formats: ['image/webp', 'image/avif'],
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	// Configuration pour le déploiement Netlify
	trailingSlash: false,
	output: 'standalone',
}

module.exports = nextConfig
