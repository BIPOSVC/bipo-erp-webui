import { expect, test } from '@playwright/test'

test('首页重定向到 dashboard 并渲染', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})

test('可切换到 Users 页', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Users' }).click()
  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible()
})
