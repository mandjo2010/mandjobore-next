// eslint.config.mjs
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'
import reactHooks from 'eslint-plugin-react-hooks'
import react from 'eslint-plugin-react'
import perfectionist from 'eslint-plugin-perfectionist'
import jsxA11y from 'eslint-plugin-jsx-a11y'
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
      perfectionist,
      'jsx-a11y': jsxA11y,
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
      // Perfectionist - Organisation imports et objets
      'perfectionist/sort-imports': ['warn', { 
        type: 'natural', 
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']], 
        newlinesBetween: 'always' 
      }],
      'perfectionist/sort-objects': ['warn', { type: 'natural' }],
      // Accessibilité (jsx-a11y) - Règles essentielles
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/heading-has-content': 'warn',
      'jsx-a11y/img-redundant-alt': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
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
      perfectionist,
      'jsx-a11y': jsxA11y,
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
      // Perfectionist - Organisation imports et objets
      'perfectionist/sort-imports': ['warn', { 
        type: 'natural', 
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']], 
        newlinesBetween: 'always' 
      }],
      'perfectionist/sort-objects': ['warn', { type: 'natural' }],
      // Accessibilité (jsx-a11y) - Règles essentielles
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/heading-has-content': 'warn',
      'jsx-a11y/img-redundant-alt': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
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
        project: './tsconfig.json',
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
