import { describe, expect, it } from 'vitest'
import resumeMarkdown from '../../carlos-barajas-resume.md?raw'
import { editions, editionsSourceSha256 } from './editions'
import { experience } from './resume'

// The Markdown resume is the source of truth; resume.ts is hand-transcribed.
// Each Experience bullet there ends with `<!-- ic mgr dir -->`-style tags.
const taggedBullets = new Map(
  [...resumeMarkdown.matchAll(/^- (.+) <!-- ([a-z ]+) -->$/gm)].map(([, text, tags]) => [
    text,
    tags.split(' '),
  ]),
)

const achievements = experience.flatMap((entry) =>
  entry.roles.flatMap((role) => role.achievements),
)

describe('resume data', () => {
  it('tags every achievement with at least one audience', () => {
    for (const achievement of achievements) {
      expect(achievement.audiences.length, achievement.text).toBeGreaterThan(0)
    }
  })

  it('matches the Markdown resume bullet-for-bullet, including audience tags', () => {
    expect(achievements).toHaveLength(taggedBullets.size)
    for (const achievement of achievements) {
      expect(taggedBullets.get(achievement.text), achievement.text).toEqual(
        achievement.audiences,
      )
    }
  })
})

describe('resume editions', () => {
  // Keys only: listing the PDFs in public/resumes without loading them.
  const pdfs = Object.keys(import.meta.glob('../../public/resumes/*.pdf')).map((path) =>
    path.replace('../../public', ''),
  )

  it('lists the IC, manager, and director editions, each with a committed PDF', () => {
    expect(editions.map((edition) => edition.id).sort()).toEqual(['dir', 'ic', 'mgr'])
    for (const edition of editions) {
      expect(pdfs).toContain(edition.file)
    }
  })

  it('was generated from the current Markdown resume (run `pnpm resumes` if this fails)', async () => {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(resumeMarkdown))
    const hex = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
    expect(hex).toBe(editionsSourceSha256)
  })
})
