import { test, expect, Locator} from '@playwright/test';

const urlToNavigateFB: string = 'https://facebook.com/';
// async def log_in():
import * as dotenv from 'dotenv';
dotenv.config();

const urlToNavigate = 'http://172.16.0.117:8080/ui/login';
const userName = process.env.USER_NAME || '';
const userPass = process.env.USER_PASSWORD || '';

async function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

test.describe('Login tests', async () => {
    test.beforeAll(async () => {
        await console.info('beforeAll');
    });

    test.beforeEach(async () => {
        await console.info('beforeEach');
    });

    test('Log in/out', async ({page}, testInfo) => {
        // test.skip(true, 'Skipping on the Gitnub Actions');
        await page.goto(urlToNavigate);

        await page.locator('css=input[formcontrolname="username"]').fill(userName);
        await page.locator('css=input[formcontrolname="password"]').fill(userPass);
        await page.locator('css=button[type="submit"]').click();
        await page.getByRole('button', {name: "Login"}).click();
        const newProjectBtn: Locator = page.locator('xpath=//button[child::span[contains(text(),"New Project")]]');
        await expect(newProjectBtn).toBeVisible({timeout: 15 * 1000});
        await newProjectBtn.click();
        await page.waitForTimeout(500);
        // await page.screenshot({path:'test_log_in.png', fullPage: true});

        const submitBtnPng: Buffer = await page.screenshot({fullPage: true});

        await testInfo.attach('Clicked New Project button', {
            body: submitBtnPng,
            contentType: 'image/png',
        });

        await page.waitForTimeout(1500);
        await page.close()
    });

    test('Log in/out by playwright codegen', async ({ page }) => {
        await page.goto(urlToNavigate);
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill(userName);
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill(userPass);
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'New Project' }).click();
        await page.getByText('Internal and External').first().click();
        await page.locator('div').filter({ hasText: /^Measure Risk$/ }).click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('textbox', { name: 'Project Name' }).fill(`alexProj_${await getRandomInt(4000)}`);
        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByRole('button', { name: 'T tester_user2' }).click();
        await page.getByRole('menuitem', { name: 'Logout' }).click();
    });


    test('Check Facebook', async ({page}, testInfo) => {
        await page.goto(urlToNavigateFB);


        await page.getByTestId('royal-email').fill(userName);
        await page.getByTestId('royal-pass').fill(userPass);


        // Expect a title "to contain" a substring.
        const LogInBtn: Locator = page.getByTestId('royal-login-button');
        await expect(LogInBtn).toBeVisible({timeout: 15 * 1000});

        const submitBtnPng: Buffer = await page.screenshot({fullPage: true});

        await testInfo.attach('Facebook screen', {
            body: submitBtnPng,
            contentType: 'image/png',
        });
    });

// test('get started link', async ({ page }) => {
//   await page.goto(urlToNavigate);
//
//   // Wait for Flutter to load
//   // await page.waitForFunction(() => window.flutterReady === true);
//   // Click the get started link.
//   // await page.locator('xpath=//button[child::span[contains(text(),"New Project")]]').click();
//
//   // Expects page to have a heading with the name of Installation.
//   // await expect(page.locator('xpath=//flt-semantics-placeholder[@role="button"]')).toBeVisible({timeout: 15 * 1000});
//
//   await expect(page.locator('text=Download CV')).toBeVisible({timeout: 35 * 1000});
//   // await expect(page.getByRole('button', { name: 'Download CV' })).toBeVisible({timeout: 15 * 1000});
// });
});