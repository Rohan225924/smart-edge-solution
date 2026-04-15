import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test('should load the contact page', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /Get in Touch/i })).toBeVisible();
  });

  test('should display contact form', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByPlaceholder(/Your Name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Your Email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Your Message/i)).toBeVisible();
  });
});
