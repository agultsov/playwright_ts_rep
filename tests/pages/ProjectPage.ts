import {Page, expect, Locator} from '@playwright/test';

export class ProjectPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async createProject(projectName: string) {
        const newProjectBtn = this.page.getByRole('button', { name: 'New Project' });
        await expect(newProjectBtn).toBeVisible({ timeout: 15000 });
        await newProjectBtn.click();
        await this.page.waitForTimeout(500);
        await this.page.getByText('Internal and External').first().click();
        await this.page.locator('div').filter({ hasText: /^Measure Risk$/ }).click();
        await this.page.getByRole('button', { name: 'Next' }).click();
        await this.page.getByRole('textbox', { name: 'Project Name' }).fill(projectName);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(this.page.locator('text=Project created')).toBeVisible({ timeout: 10000 });
        await this.page.waitForTimeout(2000);
        await this.page.locator('//span[contains(text(),"Projects")]').click();
    }
    async findProject(projectName: string) {
        // await expect(this.page.locator(`text=${projectName}`)).toBeVisible({ timeout: 10000 });
        await expect(this.page.locator(`//div[contains(text(),"${projectName}")]`)).toBeVisible({ timeout: 10000 });
    }
    async removeProject(projectName: string) {
        const projectRow = this.page.locator(`//div[contains(text(),"${projectName}")]`);
        await expect(projectRow).toBeVisible({ timeout: 10000 });
        await this.page.getByRole('cell', { name: `${projectName}` }).getByLabel('Edit').click();
        await this.page.getByRole('cell', { name: `${projectName}` }).getByLabel('Edit').click();
        // Assuming there is a delete button next to the project row
        const deleteBtn: Locator = await this.page.locator(`//span[contains(text(),"Delete")]`);
        await deleteBtn.waitFor({state: 'visible', timeout: 10000});
        await deleteBtn.scrollIntoViewIfNeeded();
        await deleteBtn.click();
        await this.page.getByRole('button', { name: 'YES, DELETE' }).click();
        await expect(this.page.locator(`//div[contains(text(),"${projectName}")]`)).not.toBeVisible({ timeout: 10000 });
    }
}


