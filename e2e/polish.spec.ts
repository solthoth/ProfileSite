import { expect, test } from '@playwright/test'

test('skip link becomes visible on focus and jumps to main content', async ({ page }) => {
  await page.goto('/')

  await page.keyboard.press('Tab')
  const skipLink = page.locator('.skip-link')
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toHaveCSS('top', '16px')

  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main-content$/)
})

test('the download panel stays in view while the sheet scrolls on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.locator('#experience').scrollIntoViewIfNeeded()
  await page.mouse.wheel(0, 1200)

  await expect(page.getByRole('link', { name: /Individual Contributor/ })).toBeInViewport()
})

test.describe('print output', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.emulateMedia({ media: 'print' })
  })

  test('prints only the resume sheet on a white page', async ({ page }) => {
    await expect(page.locator('.pack')).toBeHidden()
    await expect(page.locator('.site-footer')).toBeHidden()
    await expect(page.locator('.sheet')).toBeVisible()

    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    expect(bg).toBe('rgb(255, 255, 255)')
  })
})
