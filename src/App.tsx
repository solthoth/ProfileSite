import './App.css'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Section } from './components/Section'
import { SiteFooter } from './components/SiteFooter'
import { Skills } from './components/Skills'
import { education, interests, summary } from './data/resume'

function App() {
  return (
    <div className="page">
      <Hero />

      <main>
        <Section id="summary" eyebrow="Summary" title="The short version">
          <p className="prose">{summary}</p>
        </Section>

        <Skills />
        <Experience />

        <Section id="education" eyebrow="Education" title="Foundations">
          <p className="prose">
            <strong>{education.school}</strong>, {education.degree}, {education.location}
          </p>
        </Section>

        <Section id="interests" eyebrow="Interests" title="Off the clock">
          <ul className="interests">
            {interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </Section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default App
