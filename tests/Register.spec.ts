import { expect } from '@playwright/test';
import { test } from './fixtures/Base';
import { register } from 'module';

test('register new user', async ({ loginPage,registerPage }) => {
        await loginPage.launchLoginPageUrl();
        await loginPage.enterSignupEmail('iokk@faeem.com');
        await loginPage.enterSignupName('Martin Fuse');
        await loginPage.clickSignupButton();
        await registerPage.regsiterNewUser();


});    
