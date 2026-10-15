import { skills } from '../data/resume'
import { Section } from './Section'

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      {skills.map((category) => (
        <div className="skills__group" key={category.label}>
          <h3 className="skills__label">{category.label}</h3>
          <ul className="sidebar-list">
            {category.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  )
}
