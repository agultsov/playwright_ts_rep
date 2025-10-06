/**
 * Created by agultsov on 10/06/25.
 */
import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const urlToNavigate = 'http://172.16.0.117:8080/ui/login';
const userName = process.env.USER_NAME || '';
const userPassword = process.env.USER_PASSWORD || '';

// Helper function for login
async function login(page: import('@playwright/test').Page, username: string, password: string) {
    await page.goto(urlToNavigate);
    await page.locator('input[formcontrolname="username"]').fill(username);
    await page.locator('input[formcontrolname="password"]').fill(password);
    const loginBtn = page.getByRole('button', { name: 'Login' });
    await expect(loginBtn).toBeVisible({ timeout: 10000 });
    await loginBtn.click();
}

test('Login with env variables and verify title', async ({ page }) => {
    await login(page, userName, userPassword);
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveTitle(/.+/);

    // Create new 'Measure Risk' project
    const newProjectBtn = page.getByRole('button', { name: 'New Project' });
    await expect(newProjectBtn).toBeVisible({ timeout: 15000 });
    await newProjectBtn.click();
    await page.waitForTimeout(500);

    // Select 'Internal and External' and 'Measure Risk'
    await page.getByText('Internal and External').first().click();
    await page.locator('div').filter({ hasText: /^Measure Risk$/ }).click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Use random project name
    const randomProjectName = `MeasureRisk_${Math.floor(Math.random() * 10000)}`;
    await page.getByRole('textbox', { name: 'Project Name' }).fill(randomProjectName);
    await page.getByRole('button', { name: 'Save' }).click();

    // Ensure project was created (check for success message or project in list)
    await expect(page.locator('text=Project created')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(2000);
    // If the app shows the project in a list, you can also check:
    // await expect(page.locator(`text=${randomProjectName}`)).toBeVisible({ timeout: 10000 });

    // Log out
    await page.getByRole('button', { name: /^T / }).click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await page.waitForTimeout(2000);
});
