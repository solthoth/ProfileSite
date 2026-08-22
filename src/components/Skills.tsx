import { skills } from '../data/resume'
import { Section } from './Section'

export function Skills() {
  return (
    <Section id="skills" eyebrow="Key skills" title="What I bring">
      <div className="skills">
        {skills.map((category) => (
          <div className="skills__group" key={category.label}>
            <p className="skills__label">{category.label}</p>
            <ul className="skills__chips">
              {category.items.map((item) => (
                <li className="chip" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
