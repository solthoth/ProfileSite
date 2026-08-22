import { experience } from '../data/resume'
import { ExperienceStage } from './ExperienceStage'

/** The 2D pipeline rail — the fallback whenever the 3D topology can't mount. */
export function ExperienceRail() {
  return (
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
  )
}
