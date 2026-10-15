# Resume PDF build

`build_resumes.py` turns `carlos-barajas-resume.md` into three downloadable resume editions:

| Edition | Audience tag | Output |
|---|---|---|
| Individual Contributor | `ic` | `public/resumes/carlos-barajas-resume-ic.pdf` |
| Manager | `mgr` | `public/resumes/carlos-barajas-resume-manager.pdf` |
| Director | `dir` | `public/resumes/carlos-barajas-resume-director.pdf` |

Each edition uses its own headline and summary, from the **Resume Variants** section at the end of the Markdown file. It keeps only the Experience bullets tagged for it, from the `<!-- ic mgr dir -->` comment at the end of each bullet. Everything else (contact, skills, education, earlier experience, interests) is shared. A role with no bullets for an edition still appears, as a title and dates, so the career history has no gaps.

## Running it

```bash
pnpm resumes
```

Requirements: macOS, Microsoft Word, and [uv](https://docs.astral.sh/uv/). uv installs the pinned Python dependencies (`requirements.txt`) into a throwaway environment, so there's nothing to set up.

The script:

1. Parses the Markdown resume.
2. Writes each edition as a `.docx` to `scripts/resume/out/` (gitignored), following [the style guide](../../docs/style-guide.md).
3. Converts each `.docx` to PDF with Word via AppleScript. Conversion runs inside Word's sandbox container (`~/Library/Containers/com.microsoft.Word/Data/tmp/`), so Word never asks for file access.
4. Copies the PDFs to `public/resumes/`. Vite ships `public/` in `dist/`, so the deploy workflows upload them to the Static Web App with the site.
5. Writes `src/data/resume-editions.json`. The site reads it for the download links and page counts.

## Keeping the PDFs current

The PDFs are committed, and CI can't regenerate them because it has no Word. `resume-editions.json` therefore records the SHA-256 of the Markdown file the PDFs were built from. `src/data/resume.test.ts` fails when the Markdown no longer matches, and that test runs in the pre-commit hook and CI. **After any change to `carlos-barajas-resume.md`, run `pnpm resumes` and commit the regenerated PDFs and JSON with it.**

## Page budget

As of October 2026: Director is 2 pages, and Manager and IC are 3. To shorten an edition, change which bullets carry its tag in the Markdown, rather than adjusting type sizes here.
