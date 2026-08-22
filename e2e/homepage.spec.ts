import { expect, test } from '@playwright/test'

test.describe('homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders the resume identity and title', async ({ page }) => {
    await expect(page).toHaveTitle('Carlos Barajas')
    await expect(page.getByRole('heading', { name: 'Carlos Barajas', level: 1 })).toBeVisible()
  })

  test('renders every main section', async ({ page }) => {
    await expect(page.locator('#summary')).toBeVisible()
    await expect(page.locator('#experience')).toBeVisible()
    await expect(page.locator('#education')).toBeVisible()
    await expect(page.locator('#interests')).toBeVisible()
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
