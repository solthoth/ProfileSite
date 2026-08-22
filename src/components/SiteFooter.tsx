import { person } from '../data/resume'

export function SiteFooter() {
  return (
    <footer className="footer">
      <p>
        {person.name} · {person.location}
      </p>
      <a href={`mailto:${person.email}`}>{person.email}</a>
    </footer>
  )
}
