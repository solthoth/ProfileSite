import { experience } from './resume'

export interface RoleNode {
  id: string
  current: boolean
}

/**
 * One node per role across every company in `experience`, most recent
 * first (the same order the data is already authored in). Skill nodes and
 * skill-to-role edges are deliberately not derived here yet — resume.ts
 * doesn't encode which skills apply to which roles, and guessing via
 * keyword-matching achievement text risks showing a connection that isn't
 * actually true. See docs/redesign/00-overview.md.
 */
export function buildRoleNodes(): RoleNode[] {
  const nodes: RoleNode[] = []
  for (const entry of experience) {
    for (const role of entry.roles) {
      nodes.push({
        id: `${entry.company}::${role.title}`,
        current: Boolean(role.current),
      })
    }
  }
  return nodes
}
