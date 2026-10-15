import { person } from '../data/resume'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        {person.name} · {person.location} · <a href={`mailto:${person.email}`}>{person.email}</a>
      </p>
    </footer>
  )
}
