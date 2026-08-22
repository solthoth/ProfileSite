import { earlierExperience, experience } from '../data/resume'
import { ExperienceStage } from './ExperienceStage'
import { Section } from './Section'

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've shipped">
      <ol className="rail">
        {experience.map((entry) => (
          <li className="rail__company" key={entry.company}>
            <div className="rail__company-head">
              <h3>
                {entry.company}
                {entry.companyNote ? <span className="rail__company-note"> {entry.companyNote}</span> : null}
              </h3>
              {entry.companyRange ? <p className="rail__company-range">{entry.companyRange}</p> : null}
            </div>
            <ol className="rail__roles">
              {entry.roles.map((role) => (
                <ExperienceStage role={role} key={role.title} />
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <div className="earlier">
        <p className="earlier__label">Earlier experience</p>
        <ul className="earlier__list">
          {earlierExperience.map((role) => (
            <li className="earlier__item" key={`${role.company}-${role.title}`}>
              <div className="earlier__meta">
                <p className="earlier__role">
                  <strong>{role.company}</strong> — {role.title}
                </p>
                <p className="earlier__range">{role.range}</p>
              </div>
              <p className="earlier__description">{role.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
