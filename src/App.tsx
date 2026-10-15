import './App.css'
import { Experience } from './components/Experience'
import { ResumeDownloads } from './components/ResumeDownloads'
import { Section } from './components/Section'
import { SheetHeader } from './components/SheetHeader'
import { SiteFooter } from './components/SiteFooter'
import { Skills } from './components/Skills'
import { education, interests, summary } from './data/resume'

function App() {
  return (
    <div className="stage">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="frame">
        <ResumeDownloads />

        <main id="main-content" className="sheet">
          <SheetHeader />
          <hr className="sheet__rule" />
          <div className="sheet__body">
            <div className="sheet__main">
              <Section id="summary" title="Profile Summary">
                <p className="band summary">{summary}</p>
              </Section>
              <Experience />
            </div>

            <div className="sheet__side">
              <Skills />
              <Section id="education" title="Education">
                <ul className="sidebar-list">
                  <li>
                    <strong>{education.school}</strong>
                  </li>
                  <li>{education.degree}</li>
                  <li>{education.location}</li>
                </ul>
              </Section>
              <Section id="interests" title="Interests">
                <ul className="sidebar-list">
                  {interests.map((interest) => (
                    <li key={interest}>{interest}</li>
                  ))}
                </ul>
              </Section>
            </div>
          </div>
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}

export default App
