import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';



export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly signupNameInput: Locator;
    readonly sigupEmail: Locator;
    readonly btnSignup: Locator;
    readonly invalidUserErrorText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator("[data-qa='login-email']");
        this.passwordInput = page.locator("//input[@name='password']");
        this.loginButton = page.locator("//button[text()='Login']");
        this.signupNameInput = page.locator("//input[@name='name']");
        this.sigupEmail = page.locator("//input[@data-qa='signup-email']");
        this.btnSignup = page.locator("//button[normalize-space()='Signup']");
        this.invalidUserErrorText = page.locator("//form[@action='/login']//p");

    }

    async launchLoginPageUrl() {
        await this.page.goto('https://www.automationexercise.com/login');
    }


    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        console.log('Email entered : ' + email);
        await this.passwordInput.fill(password);
        console.log('Password entered : ' + password);
        await this.loginButton.click();
        console.log('Login button clicked');
    }

    async enterSignupName() {
        const signUpName=faker.person.firstName();

        await this.signupNameInput.fill(signUpName);
        console.log('Signup name entered : ' + signUpName);
    }

    async enterSignupEmail() {
        const signUpEmail=faker.internet.email();
        await this.sigupEmail.fill(signUpEmail);
        console.log('Signup email entered : ' + signUpEmail);
    }

    async clickSignupButton() {
        await this.btnSignup.click();
        console.log('Signup button clicked');
    }

    async verifyInvalidUserErrorText(expectedText: string) {
        const actualText = await this.page.locator("//form[@action='/login']//p").textContent();
    }

    async getInvalidUserErrorText(expectedText: string) {
        const actualerrorText = await this.invalidUserErrorText;
        await expect(actualerrorText).toHaveText(expectedText);

    }


}