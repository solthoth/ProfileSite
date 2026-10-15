import { earlierExperience } from '../data/resume'

export function EarlierExperienceList() {
  return (
    <div className="earlier">
      <h3 className="earlier__heading">Earlier experience</h3>
      {earlierExperience.map((role) => (
        <div className="earlier__item" key={`${role.company}-${role.title}`}>
          <p className="company__name">{role.company}</p>
          <p className="role__title">{role.title}</p>
          <p className="role__range">{role.range}</p>
          <p className="earlier__description">{role.description}</p>
        </div>
      ))}
    </div>
  )
}
