import { expect, test } from '@playwright/test'

const CHRONOLOGICAL_COMPANIES = [
  'Blue Shield of California (Stellarus)',
  'Allergan Aesthetics (AbbVie)',
  'Shell Recharge Solutions',
  'Green Dot Corp',
  'Lightstream',
]

test('experience topology flythrough visits every company in chronological order', async ({ page }) => {
  await page.goto('/')

  const wrap = page.locator('.topology')
  await wrap.scrollIntoViewIfNeeded()
  await expect(page.locator('.topology__canvas canvas')).toBeVisible()

  const hudCompany = page.locator('.topology__hud-meta h3')
  const seen: string[] = []

  // The section is GSAP-pinned for nodes.length * 600px of scroll; step
  // well past that so the flythrough reaches the final node regardless of
  // how many roles the resume data currently has.
  for (let offset = 0; offset <= 6000; offset += 200) {
    await page.mouse.wheel(0, 200)
    await page.waitForTimeout(50)

    const company = (await hudCompany.textContent())?.trim()
    if (company && seen[seen.length - 1] !== company) {
      seen.push(company)
    }
  }

  expect(seen).toEqual(CHRONOLOGICAL_COMPANIES)
})
