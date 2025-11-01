import { Page, Locator } from '@playwright/test';



export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly signupNameInput: Locator;
    readonly sigupEmail: Locator;
    readonly btnSignup: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator("[data-qa='login-email']");
        this.passwordInput = page.locator("//input[@name='password']");
        this.loginButton = page.locator("//button[text()='Login']");
        this.signupNameInput = page.locator("//input[@name='name']");
        this.sigupEmail= page.locator("//input[@data-qa='signup-email']");
        this.btnSignup= page.locator("//button[normalize-space()='Signup']");

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

    async enterSignupName(name: string) {
        await this.signupNameInput.fill(name);
        console.log('Signup email entered : ' + name);
    }

    async enterSignupEmail(email: string) {
        await this.sigupEmail.fill(email);
        console.log('Signup name entered : ' + email);
    }
      
    async clickSignupButton() {
        await this.btnSignup.click();
        console.log('Signup button clicked');
    }


}