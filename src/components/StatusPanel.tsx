import { careerStart, person, stack } from '../data/resume'

function yearsSince(start: Date) {
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  const anniversaryPassed =
    now.getMonth() > start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate())
  if (!anniversaryPassed) years -= 1
  return years
}

export function StatusPanel() {
  const uptime = yearsSince(careerStart)

  const rows: [string, string][] = [
    ['role', 'Sr. Manager, Platform Engineering'],
    ['location', person.location],
    ['uptime', `${uptime}y in production systems`],
    ['stack', stack.join(' · ')],
  ]

  return (
    <div className="status-panel" role="group" aria-label="Status summary">
      <p className="status-panel__prompt">
        <span aria-hidden="true">$ </span>curl solthoth.com/status
      </p>
      <dl className="status-panel__body">
        {rows.map(([key, value]) => (
          <div className="status-panel__row" key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
