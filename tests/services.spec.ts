import { test, expect } from '@playwright/test';

test.describe('Services Page', () => {
  test('should load the services page', async ({ page }) => {
    await page.goto('/services');
    await expect(page.getByRole('heading', { name: /Digital Solutions/i })).toBeVisible();
  });

  test('should display multiple services', async ({ page }) => {
    await page.goto('/services');
    await page.waitForLoadState('networkidle');
    
    const services = page.locator('.gradient-border');
    const count = await services.count();
    expect(count).toBeGreaterThan(1);
  });

  test('should display pricing section', async ({ page }) => {
    await page.goto('/services');
    await expect(page.getByRole('heading', { name: /Choose Your Plan/i })).toBeVisible();
  });

  test('should display multiple pricing plans', async ({ page }) => {
    await page.goto('/services');
    await page.waitForLoadState('networkidle');
    
    const pricingPlans = page.locator('.rounded-2xl').filter({ has: page.locator('text=/\\$[0-9]+/') });
    const count = await pricingPlans.count();
    expect(count).toBeGreaterThan(1);
  });
});
