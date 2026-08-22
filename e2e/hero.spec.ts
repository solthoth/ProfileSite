import { expect, test } from '@playwright/test'

test.describe('hero field', () => {
  test('mounts the WebGL ambient field on a capable viewport', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('header.hero canvas')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Carlos Barajas', level: 1 })).toBeVisible()
  })

  test('falls back to the 2D hero when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'Carlos Barajas', level: 1 })).toBeVisible()
    await expect(page.locator('header.hero canvas')).toHaveCount(0)
  })

  test('falls back to the 2D hero below the minimum viewport width', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 800 })
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'Carlos Barajas', level: 1 })).toBeVisible()
    await expect(page.locator('header.hero canvas')).toHaveCount(0)
  })
})
