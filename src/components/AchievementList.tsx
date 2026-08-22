import type { Achievement } from '../data/resume'

/** Shared between the 2D pipeline rail and the 3D experience HUD panel. */
export function AchievementList({ achievements }: { achievements: Achievement[] }) {
  return (
    <ul className="stage__achievements">
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
