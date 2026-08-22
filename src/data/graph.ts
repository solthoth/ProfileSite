import { experience } from './resume'
import type { Achievement } from './resume'

export interface TimelineNode {
  id: string
  company: string
  title: string
  range: string
  current: boolean
  achievements: Achievement[]
}

/**
 * One node per role across every company in `experience`, most recent
 * first (the same order the data is already authored in), carrying enough
 * to render both the ambient hero field (id/current) and the experience
 * topology's HUD panel (company/title/range/achievements).
 *
 * Skill nodes and skill-to-role edges are deliberately not derived here —
 * resume.ts doesn't encode which skills apply to which roles, and
 * guessing via keyword-matching achievement text risks showing a
 * connection that isn't actually true. See docs/redesign/00-overview.md.
 */
export function buildTimelineNodes(): TimelineNode[] {
  const nodes: TimelineNode[] = []
  for (const entry of experience) {
    for (const role of entry.roles) {
      nodes.push({
        id: `${entry.company}::${role.title}`,
        company: entry.company,
        title: role.title,
        range: role.range,
        current: Boolean(role.current),
        achievements: role.achievements,
      })
    }
  }
  return nodes
}

export interface RoleNode {
  id: string
  current: boolean
}

export function buildRoleNodes(): RoleNode[] {
  return buildTimelineNodes().map(({ id, current }) => ({ id, current }))
}

export interface GraphEdge {
  source: string
  target: string
}

/** Connects each role to the next, in the same order buildTimelineNodes returns them. */
export function buildChronologicalEdges(nodes: { id: string }[]): GraphEdge[] {
  const edges: GraphEdge[] = []
  for (let i = 0; i < nodes.length - 1; i += 1) {
    edges.push({ source: nodes[i].id, target: nodes[i + 1].id })
  }
  return edges
}
