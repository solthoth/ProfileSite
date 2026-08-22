import { lazy, Suspense } from 'react'
import { useWebGLCapable } from '../hooks/useWebGLCapable'
import { EarlierExperienceList } from './EarlierExperienceList'
import { ExperienceRail } from './ExperienceRail'
import { Section } from './Section'

const ExperienceGraph = lazy(() =>
  import('../three/ExperienceGraph').then((module) => ({ default: module.ExperienceGraph })),
)

export function Experience() {
  const webGLCapable = useWebGLCapable()

  return (
    <Section id="experience" eyebrow="Experience" title="Where I've shipped">
      {webGLCapable ? (
        <Suspense fallback={<ExperienceRail />}>
          <ExperienceGraph />
        </Suspense>
      ) : (
        <ExperienceRail />
      )}
      <EarlierExperienceList />
    </Section>
  )
}
