// eslint.config.mjs
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'
import reactHooks from 'eslint-plugin-react-hooks'
import react from 'eslint-plugin-react'
import globals from 'globals'

export default [
  // Ignorer build, assets et legacy
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'public/**',
      'dist/**',
      'coverage/**',
      'eslint.config.*',
      // legacy à migrer plus tard
      '**/src/components/pages/**',
      '**/src/components/posts/**',
      'src/components/sidebar/LeftSidebar.js',
      'src/components/sidebar/RightActions.js',
    ],
  },

  // JS / JSX
  {
    files: ['**/*.{js,jsx}'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    plugins: {
      '@next/next': nextPlugin,
      'react-hooks': reactHooks,
      react,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Eviter faux positifs
      'react/jsx-uses-vars': 'warn',
      'react/jsx-uses-react': 'off',
      // Next
      '@next/next/no-img-element': 'off',
      // JS ergonomie
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  // TS (non typé)
  ...tseslint.configs.recommended.map((cfg) => ({
    ...cfg,
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ...(cfg.languageOptions ?? {}),
      globals: { ...globals.browser },
    },
  })),

  // Règles TS supplémentaires + Next + Hooks
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@next/next': nextPlugin,
      'react-hooks': reactHooks,
      react,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-uses-vars': 'warn',
      'react/jsx-uses-react': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@next/next/no-img-element': 'off',
    },
  },

  // TS avec infos de type (limité à src/**)
  ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
    ...cfg,
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ...(cfg.languageOptions ?? {}),
      parserOptions: {
        ...(cfg.languageOptions?.parserOptions ?? {}),
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Ajoute ici les règles que tu veux "avec types"
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/await-thenable': 'warn'
    },
  })),

  // Fichiers Node/CommonJS
  {
    files: ['next.config.*', 'src/theme/colors.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
  },

  // Tests
  {
    files: ['tests/**/*.{ts,tsx,js,jsx}'],
    rules: { 'no-useless-escape': 'off' },
  },

  // Fichiers Node/CommonJS (lib & scripts)
  {
    files: ['lib/**/*.{js,ts}', 'scripts/**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off' // si JS/CommonJS
    }
  },
]
