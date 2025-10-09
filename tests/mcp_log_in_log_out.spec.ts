/**
 * Created by agultsov on 10/06/25.
 */
import { test/*, expect */} from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();
import { LoginPage } from './pages/LoginPage';
import { ProjectPage } from './pages/ProjectPage';

const userName = process.env.USER_NAME || '';
const userPassword = process.env.USER_PASSWORD || '';

function getRandomProjectName(prefix: string): string {
    return `M_Risk_${prefix}_${Math.floor(Math.random() * 10000)}`;
}

test.describe('Basic functionality tests', () => {
    test('Log in and verify title', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(userName, userPassword);
        await page.waitForLoadState('domcontentloaded');
        await loginPage.verifyTitle();
    });

    test('Create a project with random name', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const projectPage = new ProjectPage(page);
        await loginPage.goto();
        await loginPage.login(userName, userPassword);
        const projectName = getRandomProjectName('1');
        await projectPage.createProject(projectName);
        // Optionally verify project creation
        await projectPage.findProject(projectName);
    });

    test('Find created project', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const projectPage = new ProjectPage(page);
        await loginPage.goto();
        await loginPage.login(userName, userPassword);
        const projectName = getRandomProjectName('2');
        await projectPage.createProject(projectName);
        await projectPage.findProject(projectName);
    });

    test('Remove created project', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const projectPage = new ProjectPage(page);
        await loginPage.goto();
        await loginPage.login(userName, userPassword);
        const projectName = getRandomProjectName('3');
        await projectPage.createProject(projectName);
        await projectPage.findProject(projectName);
        await projectPage.removeProject(projectName);
    });

    test('Log out after login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(userName, userPassword);
        await loginPage.logout();
    });
});
