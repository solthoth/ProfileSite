import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-heading`}>
      <div className="section__head">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-heading`}>{title}</h2>
      </div>
      {children}
    </section>
  )
}
