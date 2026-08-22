import { describe, expect, it } from 'vitest'
import { buildChronologicalEdges, buildRoleNodes, buildTimelineNodes } from './graph'
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

describe('buildTimelineNodes', () => {
  it('carries the same ids and current flags as buildRoleNodes', () => {
    const timeline = buildTimelineNodes()
    const roles = buildRoleNodes()
    expect(timeline.map((node) => ({ id: node.id, current: node.current }))).toEqual(roles)
  })

  it('carries each role\'s real achievements, not invented content', () => {
    const timeline = buildTimelineNodes()
    for (const entry of experience) {
      for (const role of entry.roles) {
        const node = timeline.find((n) => n.id === `${entry.company}::${role.title}`)
        expect(node?.achievements).toBe(role.achievements)
      }
    }
  })
})

describe('buildChronologicalEdges', () => {
  it('connects every consecutive pair and no others', () => {
    const nodes = buildTimelineNodes()
    const edges = buildChronologicalEdges(nodes)
    expect(edges).toHaveLength(nodes.length - 1)
    edges.forEach((edge, i) => {
      expect(edge.source).toBe(nodes[i].id)
      expect(edge.target).toBe(nodes[i + 1].id)
    })
  })
})
