import { expect, test } from '@playwright/test'
import manifest from '../src/data/resume-editions.json' with { type: 'json' }

test('the download panel links every resume edition to a served PDF', async ({ page, request }) => {
  await page.goto('/')
  const panel = page.getByRole('complementary', { name: 'Resume Downloads' })

  for (const edition of manifest.editions) {
    const link = panel.getByRole('link', { name: new RegExp(edition.label) })
    await expect(link).toHaveAttribute('href', edition.file)
    await expect(link).toHaveAttribute('download', '')

    const response = await request.get(edition.file)
    expect(response.ok()).toBe(true)
    expect(response.headers()['content-type']).toContain('application/pdf')
    expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
  }
})

test('clicking an edition downloads its PDF', async ({ page }) => {
  await page.goto('/')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('link', { name: /Director/ }).click(),
  ])
  expect(download.suggestedFilename()).toBe('carlos-barajas-resume-director.pdf')
})
