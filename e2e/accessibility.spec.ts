import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('homepage has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const results = await new AxeBuilder({ page }).analyze()

  expect(results.violations).toEqual([])
})

test('the experience topology has no violations mid-flythrough', async ({ page }) => {
  await page.goto('/')
  await page.locator('.topology').scrollIntoViewIfNeeded()
  await page.mouse.wheel(0, 1500)
  await page.waitForTimeout(200)

  const results = await new AxeBuilder({ page }).analyze()

  expect(results.violations).toEqual([])
})

test('reduced motion has no violations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const results = await new AxeBuilder({ page }).analyze()

  expect(results.violations).toEqual([])
})
