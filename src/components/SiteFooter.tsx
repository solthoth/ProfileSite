import { person } from '../data/resume'
import { ThemeToggle } from './ThemeToggle'

export function SiteFooter() {
  return (
    <footer className="footer">
      <p>
        {person.name} · {person.location}
      </p>
      <div className="footer__links">
        <a href={`mailto:${person.email}`}>{person.email}</a>
        <ThemeToggle />
      </div>
    </footer>
  )
}
