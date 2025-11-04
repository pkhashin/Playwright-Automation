import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class RegisterPage {
    readonly page: Page;
    readonly ddDay: Locator;
    readonly ddMonth: Locator;
    readonly ddYear: Locator;
    readonly txtFirstName: Locator;
    readonly txtLastName: Locator;
    readonly txtAddress: Locator;
    readonly txtState: Locator;
    readonly txtCity: Locator;
    readonly txtZipcode: Locator;
    readonly txtMobileNumber: Locator;
    readonly btnSubmit: Locator;
    readonly hdrEnterAccountInformation: Locator;
    readonly chkSignupNewsletter: Locator;
    readonly chkReceiveOffers: Locator;
    readonly password: Locator;
    readonly txtAccountCreated: Locator;
    readonly btnContinue: Locator;
    readonly linkDeleteAccount: Locator;
    readonly txtAccountDeleted: Locator;   


    constructor(page: Page) {
        this.page = page;
        this.password = page.locator("#password");
        this.ddDay = page.locator("//select[@id='days']");
        this.ddMonth = page.locator("//select[@id='months']");
        this.ddYear = page.locator("//select[@id='years']");
        this.txtFirstName = page.locator("#first_name");
        this.txtLastName = page.locator("#last_name");
        this.txtAddress = page.locator("//input[@id='address1']");
        this.txtState = page.locator("//input[@id='state']");
        this.txtCity = page.locator("//input[@id='city']");
        this.txtZipcode = page.locator("//input[@id='zipcode']");
        this.txtMobileNumber = page.locator("//input[@id='mobile_number']");
        this.btnSubmit = page.locator("//button[@data-qa='create-account']");
        this.hdrEnterAccountInformation = page.locator("//b[contains(text(),'Enter Account Information')]");
        this.chkSignupNewsletter = page.locator("//input[@type='checkbox' and @id='newsletter']");
        this.chkReceiveOffers = page.locator("//input[@type='checkbox' and @id='optin']");
        this.txtAccountCreated = page.locator("//h2/b[contains(text(),'Account Created!')]");
        this.btnContinue = page.locator("//a[@data-qa='continue-button']");
        this.linkDeleteAccount = page.locator("//a[normalize-space(text())='Delete Account']");
        this.txtAccountDeleted=page.locator("//b[contains(text(),'Account Deleted!')]");

    }

    async enterPassword(pwd: string) {
        await this.password.fill(pwd);
    }

    async fillUserDetailsForm() {

        const lname = faker.person.lastName();
        const fname = faker.person.firstName();
        const phone = faker.phone.number('91##########' as any);



        await this.txtFirstName.fill(fname);
        await this.txtLastName.fill(lname);
        await this.password.fill('Test@12345');
        await this.enterdateofBirth();
        await this.enterAddressDetails();
        await this.txtMobileNumber.fill(phone);
        await this.chkSignupNewsletter.check();
        await this.chkReceiveOffers.check();

    }

    async enterdateofBirth() {
        const day = faker.date.birthdate().getDate().toString();
        const month = faker.date.birthdate().getMonth().toString();
        const year = faker.date.birthdate().getFullYear().toString();

        await this.ddDay.selectOption(day);
        await this.ddMonth.selectOption(month);
        await this.ddYear.selectOption(year);
    }

    async enterAddressDetails() {

        const address = faker.location.streetAddress();
        const state = faker.location.state();
        const city = faker.location.city();
        const zipcode = faker.location.zipCode('#####');

        await this.txtAddress.fill(address);
        await this.txtState.fill(state);
        await this.txtCity.fill(city);
        await this.txtZipcode.fill(zipcode);

    }

    async verifyEnterAccountInfoText(expectedText: string) {
        const actualText = await this.hdrEnterAccountInformation;
        await expect(actualText).toHaveText(expectedText);
        console.log('Enter Account Information text verified: ' + expectedText);

    }

    async clickCreateAccountButton() {
        await this.btnSubmit.click();
        console.log('Create Account button clicked');
    }

    async verifyAccountCreatedText(expectedText: string) {
        const actualText = await this.txtAccountCreated;
        await expect(actualText).toHaveText(expectedText);
        console.log('Account Created text verified: ' + expectedText);
    }
    async clickContinueButton() {
        await this.btnContinue.click();
    }

    async clickDeleteAccountLink() {
        await this.linkDeleteAccount.click();
        console.log('Delete Account link clicked');
  }

  async verifyAccountDeletedText(expectedText: string) {
        const actualText = await this.txtAccountDeleted;
        await expect(actualText).toHaveText(expectedText);
        console.log('Account Deleted text verified: ' + expectedText);
    }
}
