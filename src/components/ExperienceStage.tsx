import type { RoleStage } from '../data/resume'
import { useInView } from '../hooks/useInView'
import { AchievementList } from './AchievementList'
import { StatusBadge } from './StatusBadge'

export function ExperienceStage({ role }: { role: RoleStage }) {
  const { ref, inView } = useInView<HTMLLIElement>()

  return (
    <li className="stage" ref={ref} data-in-view={inView}>
      <span className="stage__dot" aria-hidden="true" />
      <div className="stage__content">
        <div className="stage__meta">
          <h4 className="stage__title">{role.title}</h4>
          <StatusBadge current={Boolean(role.current)} />
        </div>
        <p className="stage__range">{role.range}</p>
        <AchievementList achievements={role.achievements} />
      </div>
    </li>
  )
}
