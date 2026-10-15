import type { Achievement } from '../data/resume'

/** A role's bullets, drawn on the style guide's light band. */
export function AchievementList({ achievements }: { achievements: Achievement[] }) {
  return (
    <ul className="band achievements">
      {achievements.map((achievement) => (
        <li key={achievement.text}>
          {achievement.text}
          {achievement.subItems && (
            <ul className="achievements__sub">
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
