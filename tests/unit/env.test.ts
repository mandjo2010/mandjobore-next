import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock environment variables before importing env
const originalEnv = process.env

describe('Environment Validation', () => {
  beforeEach(() => {
    // Clear the module cache before each test
    vi.resetModules()
  })

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv
  })

  it('should validate NODE_ENV correctly', async () => {
    // Set a valid NODE_ENV
    process.env = { 
      ...originalEnv,
      NODE_ENV: 'development'
    }
    
    // Dynamic import to ensure fresh module
    const { env } = await import('../../src/env')
    
    expect(env.NODE_ENV).toBe('development')
  })

  it('should validate SITE_URL correctly', async () => {
    // Set a valid SITE_URL
    process.env = { 
      ...originalEnv,
      NODE_ENV: 'development',
      SITE_URL: 'https://test.example.com'
    }
    
    // Dynamic import to ensure fresh module
    const { env } = await import('../../src/env')
    
    expect(env.SITE_URL).toBe('https://test.example.com')
    expect(() => new URL(env.SITE_URL)).not.toThrow()
  })

  it('should use default SITE_URL when not provided', async () => {
    // Set environment without SITE_URL
    process.env = { 
      ...originalEnv,
      NODE_ENV: 'development'
    }
    delete process.env.SITE_URL
    
    // Dynamic import to ensure fresh module
    const { env } = await import('../../src/env')
    
    expect(env.SITE_URL).toBe('https://www.mandjobore.com')
  })
})
