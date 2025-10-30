
import { expect } from '@playwright/test';
import { test } from './base.spec';


test('login test', async ({ loginPage,homePage }) => {
    await loginPage.launchLoginPageUrl();
    await loginPage.login('josepk@email.com', 'Test@12345');

    const loggerUser= await homePage.getLoggedInUserText();
    expect(loggerUser).toBe('Jose');


});

test('login test with wrong credentials', async ({ loginPage,homePage }) => {
    await loginPage.launchLoginPageUrl();
    await loginPage.login('fake@fake.com', 'wrongpassword');

    const invalidUser= await homePage.getInvalidUserErrorText();
    expect(invalidUser).toBe('Your email or password is incorrect!');
});

test('verify log out', async ({ loginPage,homePage }) => {
    await loginPage.launchLoginPageUrl();
    await loginPage.login('josepk@email.com', 'Test@12345'); 
    await homePage.clickLogoutButton();
});