module.exports = {
  branches: ['main'],
  plugins: [
    ['@semantic-release/commit-analyzer', { preset: 'conventionalcommits' }],
    [
      '@semantic-release/release-notes-generator',
      { preset: 'conventionalcommits' },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'bun scripts/update-changelog.ts',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['src/pages/changelog.md'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
}
