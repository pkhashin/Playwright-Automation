import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { HomePage } from '../../src/pages/HomePage';
import { RegisterPage } from '../../src/pages/RegisterPage';

type Fixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  registerPage: RegisterPage;

};

export const test = base.extend<Fixtures>({

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

registerPage: async({page},use)=>{
    const registerPage=new RegisterPage(page);
    await use(registerPage);
  }

});

test.afterEach(async ({ page }, testInfo) => {
  const screenshot = await page.screenshot({
    fullPage: true,
  });

  await testInfo.attach(`Screenshot - ${testInfo.title}`, {
    body: screenshot,
    contentType: 'image/png',
  });
});