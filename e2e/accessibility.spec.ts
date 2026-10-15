import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

for (const [name, width] of [
  ['desktop', 1440],
  ['phone', 390],
] as const) {
  test(`homepage has no automatically detectable accessibility violations (${name})`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page }).analyze()

    expect(results.violations).toEqual([])
  })
}
