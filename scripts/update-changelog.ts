import fs from 'node:fs'
import path from 'node:path'

const changelogPath = path.resolve('src/pages/changelog.md')
const notes = (process.env.NEXT_RELEASE_NOTES || '').trim()

if (!notes) {
  throw new Error('NEXT_RELEASE_NOTES is empty; cannot update changelog.')
}

const raw = fs.readFileSync(changelogPath, 'utf8')
const lines = raw.split(/\r?\n/)

const baseTitleCloseIndex = lines.findIndex(
  (line) => line.trim() === '</base-title>',
)
if (baseTitleCloseIndex === -1) {
  throw new Error('Could not find </base-title> in changelog.')
}

const date = new Date()
const isoDate = date.toISOString().slice(0, 10)
const prettyDate = date.toLocaleDateString('en-US', {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
})

const bulletLines = notes
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.startsWith('-') || line.startsWith('*'))

const normalizedBullets = bulletLines.length
  ? bulletLines.map((line) => `- ${line.replace(/^[-*]\s*/, '').trim()}`)
  : [`- ${notes.replace(/\s+/g, ' ')}`]

const newSection = ['', `## ${isoDate}`, '', ...normalizedBullets, '']

const updatedLines = [
  ...lines.slice(0, baseTitleCloseIndex + 1),
  ...newSection,
  ...lines.slice(baseTitleCloseIndex + 1),
]

const updatedContent = updatedLines.join('\n')
const updatedFrontmatter = updatedContent.replace(
  /^updated:\s*.*$/m,
  `updated: ${prettyDate}`,
)

fs.writeFileSync(changelogPath, updatedFrontmatter)
