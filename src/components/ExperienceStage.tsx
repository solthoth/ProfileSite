import type { RoleStage } from '../data/resume'
import { useInView } from '../hooks/useInView'

export function ExperienceStage({ role }: { role: RoleStage }) {
  const { ref, inView } = useInView<HTMLLIElement>()

  return (
    <li className="stage" ref={ref} data-in-view={inView}>
      <span className="stage__dot" aria-hidden="true" />
      <div className="stage__content">
        <div className="stage__meta">
          <h4 className="stage__title">{role.title}</h4>
          <span className={`badge ${role.current ? 'badge--current' : 'badge--ok'}`}>
            {role.current ? '● current' : '✓ complete'}
          </span>
        </div>
        <p className="stage__range">{role.range}</p>
        <ul className="stage__achievements">
          {role.achievements.map((achievement) => (
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
      </div>
    </li>
  )
}
