import { Page, expect } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private url = 'http://172.16.0.117:8080/ui/login';
    constructor(page: Page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto(this.url);
    }
    async login(username: string, password: string) {
        await this.page.locator('input[formcontrolname="username"]').fill(username);
        await this.page.locator('input[formcontrolname="password"]').fill(password);
        const loginBtn = this.page.getByRole('button', { name: 'Login' });
        await expect(loginBtn).toBeVisible({ timeout: 10000 });
        await loginBtn.click();
    }
    async logout() {
        await this.page.getByRole('button', { name: /^T / }).click();
        await this.page.getByRole('menuitem', { name: 'Logout' }).click();
        await this.page.waitForTimeout(2000);
    }
    async verifyTitle() {
        await expect(this.page).toHaveTitle(/.+/);
    }
}