import { describe, expect, it } from 'vitest'
import resumeMarkdown from '../../carlos-barajas-resume.md?raw'
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
