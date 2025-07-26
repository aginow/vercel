import { test, expect } from '@playwright/test';
import { clearDatabase, clearBlobStorage } from './utils/cleanup';

test.describe('End-to-end user flow', () => {
  // Generate random user data for testing
  const testUser = {
    email: `test-${Date.now()}@example.com`,
    password: 'Password123!',
    name: `Test User ${Date.now()}`
  };

  test.beforeAll(async () => {
    // Clear database and blob storage before running tests
    await clearDatabase();
    await clearBlobStorage();
  });

  test('should register a new user, sign in, and verify storage integration', async ({ page }) => {
    // Step 1: Register a new user
    await page.goto('/register');
    await page.waitForLoadState('networkidle');
    
    // Fill out registration form
    await page.getByLabel('Name').fill(testUser.name);
    await page.getByLabel('Email').fill(testUser.email);
    await page.locator('#password').fill(testUser.password);
    await page.locator('#confirmPassword').fill(testUser.password);
    
    // Submit form and wait for redirect
    await page.getByRole('button', { name: /register|sign up|create account/i }).click();
    
    // Verify redirect to login page
    await expect(page).toHaveURL(/login/);
    
    // Step 2: Sign in with the newly created user
    await page.getByLabel('Email').fill(testUser.email);
    await page.getByLabel('Password').fill(testUser.password);
    await page.getByRole('button', { name: /sign in|log in|login/i }).click();
    
    // Verify successful login (redirected to dashboard)
    await expect(page).toHaveURL('/dashboard');
    
    // Step 3: Navigate to generate page
    await page.goto('/generate');
    await page.waitForLoadState('networkidle');
    
    // Fill out image generation form
    const testPrompt = 'A beautiful sunset over mountains';
    await page.getByPlaceholder('Describe the image you want to generate...').fill(testPrompt);
    
    // Submit form and wait for image generation
    await page.getByRole('button', { name: /generate|create/i }).click();
    
    // Wait for image to be generated (this might take some time)
    await page.waitForSelector('img', { timeout: 60000 });
    
    // Verify image is displayed
    const image = await page.locator('img').first();
    await expect(image).toBeVisible();
    
    // Step 4: Verify image is saved in database and blob storage
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Check if the image is displayed in the dashboard/gallery
    const galleryImage = await page.locator('img').first();
    await expect(galleryImage).toBeVisible();
    
    // Verify prompt text is displayed
    const promptText = await page.getByText(testPrompt);
    await expect(promptText).toBeVisible();
  });
});