# Style guide

The site and the downloadable resume PDFs share one visual system, modeled on a clean print-resume template ([reference image](https://cdn.dribbble.com/userupload/38939676/file/original-250f4401f676fdf7826701eff0e18eba.jpg?resize=1504x1128&vertical=center)): a pale sky-blue stage, a white frame with a soft drop shadow, a column of file icons beside a large teal title, and a resume "sheet" with two blue header panels, uppercase blue section headings, light bands behind the summary and each role's bullets, and a ruled sidebar.

Tokens live in `src/index.css` (web) and at the top of `scripts/resume/build_resumes.py` (PDF). Change a value in both places, and update this page.

## Principles

- **The page is the resume.** No decorative layer competes with the content. The one flourish is the reference template's own: three small blocks between the header panels.
- **One accent family.** Blue carries structure (headings, role titles). Teal is for the download panel only. Red appears only on the PDF file tag.
- **Light only.** The design copies a printed sheet. There's no dark theme.
- **WCAG AA for all text.** Where a reference color fails contrast as text, the guide defines a darker `-ink` variant for text and keeps the original for non-text accents.

## Color

Sampled from the reference, then adjusted for contrast where needed. Contrast ratios are against the surface each color is used on.

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--color-sky` | `#CDEDFC` | Page background (the stage) | — |
| `--color-frame` | `#FFFFFF` | White frame behind the panel and sheet | — |
| `--color-paper` | `#F5F6F8` | Resume sheet surface | — |
| `--color-block` | `#C3E2F4` | Header panels | — |
| `--color-block-soft` | `#DBEAF1` | The three header blocks between panels | — |
| `--color-band` | `#EDF2F6` | Summary and bullet bands | — |
| `--color-ink` | `#1A1D21` | Body text, name, bullet dots | 15.6:1 on paper |
| `--color-muted` | `#4F5B66` | Dates, company meta, sub-bullets | 6.4:1 on paper, 6.2:1 on band |
| `--color-blue` | `#0076B9` | Section headings (reference blue) | 4.5:1 on paper |
| `--color-blue-ink` | `#00679F` | Role titles, last name, link hover; any blue text on a header panel | 5.6:1 on paper, 4.5:1 on block |
| `--color-teal` | `#02AEC6` | Bullet dots in the download panel (decorative only) | 2.7:1 (not for text) |
| `--color-teal-ink` | `#007F91` | "Resume Downloads" title | 4.7:1 on white |
| `--color-pdf` | `#D0000C` | PDF file tag (white text on it) | 5.7:1 |
| `--color-rule` | `#D7D8DA` | Rule under the sheet header | — |
| `--color-rule-strong` | `#CBCCCE` | Sidebar divider, icon outlines | — |

## Typography

| Role | Web | PDF | Size (web / PDF) | Treatment |
|---|---|---|---|---|
| Name | Montserrat 700 (first) / 500 (last) | Century Gothic bold / regular | 2rem / 21pt | Uppercase; first name ink, last name blue |
| Headline | Montserrat 500 | Century Gothic | 0.95rem / 9.5pt | Uppercase, +0.08em tracking |
| Section heading | Montserrat 500 | Century Gothic | 1.08rem / 11pt | Uppercase, +0.04em tracking, `--color-blue` |
| Role title | Montserrat 500 | Century Gothic | 1.08rem / 10.2pt | `--color-blue-ink` |
| Company | Lato 700 | Aptos bold | 0.98rem / 9.8pt | Ink |
| Body and bullets | Lato 400 | Aptos | 0.94–0.98rem / 9pt | Ink, 1.55 line height on web |
| Dates and meta | Lato 400 | Aptos | 0.85rem / 8.4pt | `--color-muted` |
| Download panel title | Montserrat 500 | — | 2.6rem | `--color-teal-ink` |

Montserrat and Lato load from Google Fonts in `index.html`. The PDFs use fonts that ship with Microsoft Word for Mac, so the build needs no font installs. Century Gothic is the closest geometric match to Montserrat, and Aptos stands in for Lato. The CSS font stacks fall back to the same pair.

## Layout

- **Stage:** sky background with 64px top padding (16px gutter on phones).
- **Frame:** white, max 1280px, with `--frame-shadow` (a soft drop toward the bottom-right, like the reference). On desktop it's a two-column grid: a 280px download panel and the sheet.
- **Sheet:** paper surface with `--sheet-shadow` on its left edge. `--sheet-gutter` (56px desktop, 20px phone) sets its side padding, and the bands bleed into it to reach the sheet's left edge.
- **Sheet body:** main column (summary, experience, earlier experience) and a 280px sidebar (skills, education, interests) separated by a `--color-rule-strong` line.
- **Breakpoints:**
  - **1200px:** the download panel stops being sticky and moves above the sheet, with its files in a row.
  - **720px:** the sheet becomes one column: the header panels stack, the three blocks hide, and the sidebar moves below the experience under a top rule.

## Components

### Download panel (`ResumeDownloads`, `PdfIcon`)
This replaces the reference's column of file-type icons. Each edition (Individual Contributor, Manager, Director) is a link with the `download` attribute. It shows a folded-corner page icon with a red **PDF** tag and the edition code (IC, MGR, DIR) in blue, then the edition label, its headline, and its page count. Below the links are the teal title and a short fact list with teal dots. On desktop the panel is sticky, so the downloads stay in view while the sheet scrolls. Hovering lifts the icon 3px and underlines the label.

### Sheet header (`SheetHeader`)
Two `--color-block` panels. The left one bleeds to the sheet edge and holds the name and headline; the right one holds the contact list with bullets. Between them sit three `--color-block-soft` blocks, 22px tall with 26px gaps. A 1px `--color-rule` line separates the header from the body.

### Section heading (`Section`)
An `h2` in the section-heading style, with 14px of space below.

### Band (`.band`)
A `--color-band` background behind the profile summary and each role's bullet list. Padding is 14px vertical and 20px right. The left edge bleeds to the sheet edge.

### Role block (`Experience`, `AchievementList`)
The company name in bold ink, then a meta line (range and note) for multi-role companies. Each role follows: title in blue-ink, dates in muted, then the bullet band. Bullets are 7px ink dots. Sub-bullets are muted, smaller, and marked with an en dash.

### Sidebar list (`.sidebar-list`)
One item per line at 0.9rem, under a bold label (`h3`), mirroring the reference's skills column.

## Resume PDF template

`scripts/resume/build_resumes.py` renders the same system to US Letter `.docx`, and Word exports it to PDF. Pages are white, not paper-colored, so the PDFs print cleanly.

- **Margins:** 0.5 inch.
- **Header:** a three-cell table with two `BLOCK` panels (name and edition headline, contact list with website) and a nested table drawing the three `BLOCK_SOFT` blocks.
- **Rule:** a bottom-bordered paragraph under the header.
- **Body:** a two-cell table. The main cell (5.35 inch) holds Profile Summary and Experience. The sidebar cell has a left border and holds Skills, Education, Earlier Experience and Interests. Earlier Experience sits in the sidebar so it fills the sidebar's otherwise empty space on page 2.
- **Bands:** paragraph shading plus same-color padding borders. Consecutive bullets merge into one band per role.
- **Pagination:** no "keep with next" inside the body table. Word applies it to the whole row, which pushes the body off page 1.

Each edition differs only in its headline, its summary, and which Experience bullets it keeps (the bullet's audience tags). See `scripts/resume/README.md`.
