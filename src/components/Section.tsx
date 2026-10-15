import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  /** Full-bleed summary/bullet bands only extend to the sheet edge in the main column. */
  className?: string
  children: ReactNode
}

export function Section({ id, title, className, children }: SectionProps) {
  return (
    <section id={id} className={`sheet-section ${className ?? ''}`.trim()} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="sheet-section__title">
        {title}
      </h2>
      {children}
    </section>
  )
}
