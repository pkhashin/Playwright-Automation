
import { expect } from '@playwright/test';
import { test } from './fixtures/Base';
import dotenv from 'dotenv';
dotenv.config();

const {USER_NAME,PASSWORD}=process.env;


    test('login test', async ({ loginPage,homePage }) => {
    await loginPage.launchLoginPageUrl();
    await loginPage.login(USER_NAME!, PASSWORD!);
    const loggerUser= await homePage.getLoggedInUserText();
    expect(loggerUser).toBe('Jose');


});

test('login test with invalid credentials', async ({ loginPage,homePage }) => {
    await loginPage.launchLoginPageUrl();
    await loginPage.login('fake@fake.com', 'wrongpassword');

    const errorText= await homePage.getInvalidUserErrorText();
    expect(errorText).toBe('Your email or password is incorrect!');
});

test('verify log out', async ({ loginPage,homePage }) => {
    await loginPage.launchLoginPageUrl();
    await loginPage.login('josepk@email.com', 'Test@12345'); 
    await homePage.clickLogoutButton();
});