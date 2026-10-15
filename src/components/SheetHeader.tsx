import { person } from '../data/resume'

const [firstName, ...rest] = person.name.split(' ')
const lastName = rest.join(' ')

/** Two header panels with the reference design's three small blocks between them. */
export function SheetHeader() {
  return (
    <header className="sheet-header">
      <div className="sheet-header__block sheet-header__identity">
        <h1 className="sheet-header__name">
          <span className="sheet-header__first">{firstName}</span> {lastName}
        </h1>
        <p className="sheet-header__title">{person.title}</p>
      </div>
      <div className="sheet-header__squares" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <ul className="sheet-header__block sheet-header__contact" aria-label="Contact">
        <li>
          <strong>Location:</strong> {person.location}
        </li>
        <li>
          <strong>Email:</strong> <a href={`mailto:${person.email}`}>{person.email}</a>
        </li>
        <li>
          <strong>LinkedIn:</strong>{' '}
          <a href={person.linkedin} target="_blank" rel="noreferrer">
            linkedin.com/in/solthoth
          </a>
        </li>
        <li>
          <strong>GitHub:</strong>{' '}
          <a href={person.github} target="_blank" rel="noreferrer">
            github.com/solthoth
          </a>
        </li>
      </ul>
    </header>
  )
}
