import type { Achievement } from '../data/resume'

interface AchievementListProps {
  achievements: Achievement[]
  /** True inside the HUD panel, where CSS makes this list scroll (max-height + overflow-y). Adds a tab stop and label so keyboard/AT users can reach the scrollable content, per WCAG scrollable-region-focusable. The 2D rail's list never scrolls, so it stays out of tab order there. */
  scrollable?: boolean
}

/** Shared between the 2D pipeline rail and the 3D experience HUD panel. */
export function AchievementList({ achievements, scrollable = false }: AchievementListProps) {
  return (
    <ul
      className="stage__achievements"
      {...(scrollable ? { tabIndex: 0, 'aria-label': 'Achievements' } : {})}
    >
      {achievements.map((achievement) => (
        <li key={achievement.text}>
          {achievement.text}
          {achievement.subItems && (
            <ul className="stage__sub">
              {achievement.subItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
