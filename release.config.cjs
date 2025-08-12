/** @type {import('semantic-release').Options} */
module.exports = {
  branches: ['main'],
  plugins: [
    ['@semantic-release/commit-analyzer', { preset: 'conventionalcommits' }],
    ['@semantic-release/release-notes-generator', { preset: 'conventionalcommits' }],
    ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],
    // pas de publication npm pour un app Next privée
    ['@semantic-release/npm', { npmPublish: false }],
    ['@semantic-release/github', { assets: [] }],
    ['@semantic-release/git', {
      assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
      message: 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}'
    }]
  ]
}
