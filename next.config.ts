import './src/env.ts'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
}

// Bundle analyzer configuration - only when ANALYZE=true
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
