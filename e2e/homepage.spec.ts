import { expect, test } from '@playwright/test'

test.describe('homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders the resume identity and title', async ({ page }) => {
    await expect(page).toHaveTitle('Carlos Barajas')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Carlos Barajas')
  })

  test('renders every main section', async ({ page }) => {
    for (const id of ['#summary', '#experience', '#skills', '#education', '#interests']) {
      await expect(page.locator(id)).toBeVisible()
    }
  })

  test('renders every company from the experience data', async ({ page }) => {
    const companies = [
      'Blue Shield of California',
      'Allergan Aesthetics',
      'Shell Recharge Solutions',
      'Green Dot Corp',
      'Lightstream',
    ]

    for (const company of companies) {
      await expect(page.getByText(company, { exact: false }).first()).toBeVisible()
    }
  })
})

test('homepage has no console errors on load', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  await page.goto('/')
  await page.waitForLoadState('networkidle')

  expect(errors).toEqual([])
})

for (const width of [1440, 900, 390]) {
  test(`no horizontal page scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBe(0)
  })
}
