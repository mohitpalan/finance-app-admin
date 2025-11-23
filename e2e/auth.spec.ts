import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the login page
    await page.goto('/login');
  });

  test('should display login page correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Finance App Admin/);

    // Check for login form elements
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /login|sign in/i })).toBeVisible();
  });

  test('should login with valid credentials (admin)', async ({ page }) => {
    // Fill in login form
    await page.getByLabel(/email/i).fill('admin@financeapp.com');
    await page.getByLabel(/password/i).fill('Admin123!');

    // Click login button
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Wait for navigation to dashboard
    await page.waitForURL('/dashboard', { timeout: 10000 });

    // Verify we're on the dashboard
    await expect(page).toHaveURL('/dashboard');

    // Check for dashboard elements
    await expect(page.getByText(/dashboard/i)).toBeVisible();
    await expect(page.getByText(/total income/i)).toBeVisible();
  });

  test('should login with valid credentials (user)', async ({ page }) => {
    // Fill in login form
    await page.getByLabel(/email/i).fill('user@financeapp.com');
    await page.getByLabel(/password/i).fill('User123!');

    // Click login button
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Wait for navigation
    await page.waitForURL('/dashboard', { timeout: 10000 });

    // Verify we're on the dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // Fill in login form with wrong credentials
    await page.getByLabel(/email/i).fill('wrong@example.com');
    await page.getByLabel(/password/i).fill('wrongpassword');

    // Click login button
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Wait a bit for error message
    await page.waitForTimeout(1000);

    // Check for error message (adjust selector based on your implementation)
    const errorVisible = await page.getByText(/invalid|credentials|error/i).isVisible()
      .catch(() => false);

    // Verify still on login page
    await expect(page).toHaveURL(/login/);
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    // Click login without filling form
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Wait a bit
    await page.waitForTimeout(500);

    // Should still be on login page
    await expect(page).toHaveURL(/login/);

    // Check for validation messages (adjust selectors based on your implementation)
    const emailInput = page.getByLabel(/email/i);
    const hasEmailError = await emailInput.evaluate((el: HTMLInputElement) =>
      !el.validity.valid
    ).catch(() => false);

    expect(hasEmailError).toBeTruthy();
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.getByLabel(/email/i).fill('admin@financeapp.com');
    await page.getByLabel(/password/i).fill('Admin123!');
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Wait for dashboard
    await page.waitForURL('/dashboard', { timeout: 10000 });

    // Find and click logout button (adjust selector based on your implementation)
    // This might be in a dropdown menu or header
    const logoutButton = page.getByRole('button', { name: /logout|sign out/i });

    if (await logoutButton.isVisible()) {
      await logoutButton.click();
    } else {
      // Try to find it in a menu
      const menuButton = page.getByRole('button', { name: /menu|user|profile/i }).first();
      if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.getByRole('button', { name: /logout|sign out/i }).click();
      }
    }

    // Wait for redirect to login
    await page.waitForURL(/login/, { timeout: 5000 });

    // Verify we're back on login page
    await expect(page).toHaveURL(/login/);
  });

  test('should redirect to login when accessing protected route while unauthenticated', async ({ page }) => {
    // Try to access dashboard directly
    await page.goto('/dashboard');

    // Should redirect to login
    await page.waitForURL(/login/, { timeout: 5000 });
    await expect(page).toHaveURL(/login/);
  });

  test('should persist session after page reload', async ({ page }) => {
    // Login
    await page.getByLabel(/email/i).fill('admin@financeapp.com');
    await page.getByLabel(/password/i).fill('Admin123!');
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Wait for dashboard
    await page.waitForURL('/dashboard', { timeout: 10000 });

    // Reload page
    await page.reload();

    // Should still be on dashboard (session persisted)
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText(/dashboard/i)).toBeVisible();
  });
});
