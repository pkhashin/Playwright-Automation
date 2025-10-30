import { Page, Locator } from '@playwright/test';


export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator("[data-qa='login-email']");
        this.passwordInput = page.locator("//input[@name='password']");
        this.loginButton = page.locator("//button[text()='Login']");
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
}