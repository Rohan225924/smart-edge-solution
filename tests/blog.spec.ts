import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
  test('should load the blog page', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { name: /Latest Insights/i })).toBeVisible();
  });
});
