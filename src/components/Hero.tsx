import { person } from '../data/resume'
import { StatusPanel } from './StatusPanel'

export function Hero() {
  return (
    <header className="hero">
      <p className="hero__mark">solthoth.com</p>
      <h1 className="hero__name">{person.name}</h1>
      <p className="hero__title">{person.title}</p>
      <StatusPanel />
      <ul className="hero__contact">
        <li>
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </li>
        <li>
          <a href={`tel:${person.phone.replace(/[^0-9+]/g, '')}`}>{person.phone}</a>
        </li>
        <li>
          <a href={person.linkedin} target="_blank" rel="noreferrer">
            linkedin.com/in/solthoth
          </a>
        </li>
      </ul>
    </header>
  )
}
