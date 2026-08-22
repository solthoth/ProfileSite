import { earlierExperience } from '../data/resume'

/** Always 2D, regardless of whether the experience topology renders in 3D. */
export function EarlierExperienceList() {
  return (
    <div className="earlier">
      <p className="earlier__label">Earlier experience</p>
      <ul className="earlier__list">
        {earlierExperience.map((role) => (
          <li className="earlier__item" key={`${role.company}-${role.title}`}>
            <div className="earlier__meta">
              <p className="earlier__role">
                <strong>{role.company}</strong>, {role.title}
              </p>
              <p className="earlier__range">{role.range}</p>
            </div>
            <p className="earlier__description">{role.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
