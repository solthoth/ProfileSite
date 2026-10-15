import { experience } from '../data/resume'
import { AchievementList } from './AchievementList'
import { EarlierExperienceList } from './EarlierExperienceList'
import { Section } from './Section'

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      {experience.map((entry) => (
        <article className="company" key={entry.company}>
          <h3 className="company__name">{entry.company}</h3>
          {(entry.companyRange || entry.companyNote) && (
            <p className="company__meta">
              {[entry.companyRange, entry.companyNote].filter(Boolean).join(' · ')}
            </p>
          )}
          {entry.roles.map((role) => (
            <div className="role" key={role.title}>
              <h4 className="role__title">{role.title}</h4>
              <p className="role__range">{role.range}</p>
              <AchievementList achievements={role.achievements} />
            </div>
          ))}
        </article>
      ))}
      <EarlierExperienceList />
    </Section>
  )
}
