import { expect, test } from '@playwright/test'

const url = process.env.REACT_APP_PUBLIC_URL || 'http://localhost:3000'

test.beforeEach(async ({ page }) => {
  await page.goto(url)
})

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Home/)
})

test('search for a title', async ({ page }) => {
  await expect(page.getByText('Dedicated to provide')).toBeVisible()
})
