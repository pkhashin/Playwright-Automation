import { expect } from '@playwright/test';
import { test } from './fixtures/Base';
import { LoginPage } from '../src/pages/LoginPage';
import { RegisterPage } from '../src/pages/RegisterPage';

async function  registerNewUser(
        loginPage: LoginPage,
        registerPage: RegisterPage
) {
        await loginPage.launchLoginPageUrl();
        await loginPage.enterSignupEmail();
        await loginPage.enterSignupName();
        await loginPage.clickSignupButton();
        await registerPage.verifyEnterAccountInfoText("Enter Account Information");
        await registerPage.fillUserDetailsForm();
        await registerPage.clickCreateAccountButton();
        await registerPage.verifyAccountCreatedText("Account Created!");
        await registerPage.clickContinueButton();
}

test('register new user', async ({ loginPage, registerPage }) => {
        await registerNewUser(loginPage, registerPage);
        console.log("User registration completed successfully.");

});    

test('Delete newly registered user', async ({ loginPage, registerPage }) => {
        await registerNewUser(loginPage, registerPage);
        await registerPage.clickDeleteAccountLink();
        await registerPage.verifyAccountDeletedText("Account Deleted!");
        console.log("Newly registered user deleted successfully.");
       

});







