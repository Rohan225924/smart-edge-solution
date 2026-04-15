import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test('should load the about page', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /About Smart Edge Solutions/i })).toBeVisible();
  });

  test('should display team section', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /Our Team/i })).toBeVisible();
  });
});
