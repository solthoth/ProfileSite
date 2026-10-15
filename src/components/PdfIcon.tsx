/** File-type icon from the style guide: a folded-corner page with a PDF tag and the edition code. */
export function PdfIcon({ code }: { code: string }) {
  return (
    <svg className="pdf-icon" viewBox="0 0 56 68" aria-hidden="true" focusable="false">
      <path className="pdf-icon__page" d="M10 2h28l16 16v46a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
      <path className="pdf-icon__fold" d="M38 2v14a2 2 0 0 0 2 2h14" />
      <rect className="pdf-icon__tag" x="0" y="8" width="30" height="14" rx="2" />
      <text className="pdf-icon__tag-text" x="15" y="18.5" textAnchor="middle">
        PDF
      </text>
      <text className="pdf-icon__code" x="31" y="45" textAnchor="middle">
        {code}
      </text>
      <path className="pdf-icon__lines" d="M18 53h26M18 58h18" />
    </svg>
  )
}
