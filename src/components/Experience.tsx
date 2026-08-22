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
        <>
          <Suspense fallback={<ExperienceRail />}>
            <ExperienceGraph />
          </Suspense>
          {/* The 3D topology only ever shows one role's achievements at a
              time (whichever the camera is on), so print needs the full
              rail rendered too - it's just hidden on screen. */}
          <div className="experience__print-rail">
            <ExperienceRail />
          </div>
        </>
      ) : (
        <ExperienceRail />
      )}
      <EarlierExperienceList />
    </Section>
  )
}
