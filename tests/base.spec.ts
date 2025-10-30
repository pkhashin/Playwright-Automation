import{test as baseTest,expect}from'@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';

type Fixtures={
    loginPage:LoginPage;
    homePage:HomePage;
};

export const test=baseTest.extend<Fixtures>({
    loginPage:async({page},use)=>{
        const loginPage=new LoginPage(page);
        await use(loginPage);
    },
    homePage:async({page},use)=>{
        const homePage=new HomePage(page);
        await use(homePage);
    },

});

test.afterEach(async ({ page }, testInfo) => {
  // Set timeout for this hook (e.g., 60 seconds)
  testInfo.setTimeout(60000); // 60000 ms = 60 seconds

  const screenshot = await page.screenshot({
    fullPage: true,
  });

  await testInfo.attach(`Screenshot - ${testInfo.title}`, {
    body: screenshot,
    contentType: 'image/png',
  });
});