import { editions, editionsUpdated } from '../data/editions'
import { PdfIcon } from './PdfIcon'

const EDITION_CODES = { ic: 'IC', mgr: 'MGR', dir: 'DIR' } as const

/** The left-hand "pack" panel: one PDF download per resume edition. */
export function ResumeDownloads() {
  return (
    <aside className="pack" aria-labelledby="downloads-heading">
      <ul className="pack__files">
        {editions.map((edition) => (
          <li key={edition.id}>
            <a
              className="pack__file"
              href={edition.file}
              download
              aria-label={`Download the ${edition.label} resume (PDF, ${edition.pages} pages)`}
            >
              <PdfIcon code={EDITION_CODES[edition.id]} />
              <span className="pack__file-text">
                <span className="pack__file-label">{edition.label}</span>
                <span className="pack__file-meta">{edition.headline}</span>
                <span className="pack__file-meta">PDF · {edition.pages} pages</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <h2 id="downloads-heading" className="pack__title">
        Resume Downloads
      </h2>
      <ul className="pack__facts">
        <li>Individual contributor, manager, and director editions.</li>
        <li>US Letter PDF, print-ready.</li>
        <li>Built from one source resume.</li>
        <li>Updated {editionsUpdated}.</li>
      </ul>
    </aside>
  )
}
