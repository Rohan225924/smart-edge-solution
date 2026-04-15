import { test, expect } from '@playwright/test';

test.describe('Admin Pages', () => {
  test('should redirect to login when accessing admin', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('should show login page', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page.getByRole('heading', { name: /Sign In/i })).toBeVisible();
    await expect(page.getByPlaceholder(/Email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Password/i)).toBeVisible();
  });

  test('should protect admin routes', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await expect(page).not.toHaveURL(/\/admin\/dashboard/);
  });
});
