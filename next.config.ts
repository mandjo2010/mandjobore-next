import './src/env.ts'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Build
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    mdxRs: true,
  },
  images: {
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    dangerouslyAllowSVG: true,
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [{ hostname: '**', protocol: 'https' }],
  },
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Déploiement
  trailingSlash: false,
  typescript: { ignoreBuildErrors: false },
}

// Bundle analyzer configuration - only when ANALYZE=true
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
