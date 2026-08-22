import { describe, expect, it } from 'vitest'
import { buildRoleNodes } from './graph'
import { experience } from './resume'

describe('buildRoleNodes', () => {
  it('produces exactly one node per role across every company', () => {
    const expectedCount = experience.reduce((total, entry) => total + entry.roles.length, 0)
    expect(buildRoleNodes()).toHaveLength(expectedCount)
  })

  it('marks exactly one role as current', () => {
    const current = buildRoleNodes().filter((node) => node.current)
    expect(current).toHaveLength(1)
  })

  it('produces unique ids', () => {
    const ids = buildRoleNodes().map((node) => node.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
