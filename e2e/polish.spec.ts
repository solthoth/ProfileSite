import { expect, test } from '@playwright/test'

test('status panel role matches the current role in resume data', async ({ page }) => {
  await page.goto('/')

  const role = await page.locator('.status-panel__row').first().locator('dd').textContent()
  expect(role?.trim()).toBe('Sr. Manager, Technical Engineering (Platform Engineering)')
})

test('skip link becomes visible on focus and jumps to main content', async ({ page }) => {
  await page.goto('/')

  await page.keyboard.press('Tab')
  const skipLink = page.locator('.skip-link')
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toHaveCSS('top', '16px')

  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main-content$/)
})

test('theme toggle cycles system, light, dark and back', async ({ page }) => {
  await page.goto('/')

  const toggle = page.locator('.theme-toggle')
  await expect(toggle).toHaveText('theme: system')
  await expect(page.locator('html')).not.toHaveAttribute('data-theme')

  await toggle.click()
  await expect(toggle).toHaveText('theme: light')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

  await toggle.click()
  await expect(toggle).toHaveText('theme: dark')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  await toggle.click()
  await expect(toggle).toHaveText('theme: system')
  await expect(page.locator('html')).not.toHaveAttribute('data-theme')
})

test('theme choice persists across a reload', async ({ page }) => {
  await page.goto('/')
  await page.locator('.theme-toggle').click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test.describe('print output', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.emulateMedia({ media: 'print' })
  })

  // The 3D topology only ever shows one role at a time (whichever node the
  // camera is on), so print needs the always-hidden-on-screen rail instead -
  // this is what actually carries the full experience section to a PDF.
  test('shows the full experience rail instead of the 3D topology', async ({ page }) => {
    await expect(page.locator('.topology')).toBeHidden()
    await expect(page.locator('.hero canvas')).toBeHidden()
    await expect(page.locator('.experience__print-rail')).toBeVisible()

    const achievementCount = await page.locator('.experience__print-rail .stage__achievements > li').count()
    expect(achievementCount).toBeGreaterThan(0)
  })

  // .stage reveals via useInView (IntersectionObserver) as it scrolls into
  // the viewport. Print never scrolls, and the print rail is display:none
  // on screen, so without a print override every role prints at its
  // pre-reveal opacity: 0 - invisible despite occupying layout space.
  test('every role is fully visible, not stuck at its pre-reveal opacity', async ({ page }) => {
    const stages = page.locator('.experience__print-rail .stage')
    const count = await stages.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i += 1) {
      await expect(stages.nth(i)).toHaveCSS('opacity', '1')
    }
  })

  test('the GSAP ScrollTrigger pin-spacer does not reserve blank scroll space', async ({ page }) => {
    const spacer = page.locator('.pin-spacer')
    if (await spacer.count()) {
      await expect(spacer.first()).toBeHidden()
    }
  })

  test('forces the light palette regardless of the active theme', async ({ page }) => {
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    expect(bg).toBe('rgb(255, 255, 255)')
  })
})
