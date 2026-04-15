import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Smart Edge Solution/);
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Transform Your Business/i })).toBeVisible();
  });

  test('should display navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /Services/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /About/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Blog/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Contact/i })).toBeVisible();
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    expect(errors.filter(e => !e.includes('Warning'))).toHaveLength(0);
  });
});
