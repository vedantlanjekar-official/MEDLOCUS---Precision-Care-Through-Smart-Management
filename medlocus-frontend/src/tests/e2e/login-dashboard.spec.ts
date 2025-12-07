import { test, expect } from '@playwright/test';

test.describe('Login to Dashboard Flow', () => {
  test('should login with demo credentials and navigate to dashboard', async ({
    page,
  }) => {
    // Navigate to login page
    await page.goto('/login');

    // Verify login page is loaded
    await expect(page.locator('h2')).toContainText('Sign in to your account');

    // Fill demo credentials
    await page.fill('input[type="email"]', 'demo@medlocus.com');
    await page.fill('input[type="password"]', 'demo123');

    // Click login button
    await page.click('button[type="submit"]');

    // Wait for navigation to dashboard
    await page.waitForURL('/dashboard', { timeout: 5000 });

    // Verify dashboard is loaded
    await expect(page.locator('h2')).toContainText('Overview');

    // Verify KPI cards are visible
    const kpiCards = page.locator('[class*="bg-white rounded-lg border"]');
    await expect(kpiCards.first()).toBeVisible();

    // Verify transactions table has rows
    const transactionRows = page.locator('tbody tr');
    await expect(transactionRows.first()).toBeVisible();
  });

  test('should use demo credentials button', async ({ page }) => {
    await page.goto('/login');

    // Click demo credentials button
    await page.click('text=Demo Credentials');

    // Wait for navigation
    await page.waitForURL('/dashboard', { timeout: 5000 });

    // Verify dashboard is loaded
    await expect(page.locator('h2')).toContainText('Overview');
  });
});


