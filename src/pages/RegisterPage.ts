import { Page, Locator } from '@playwright/test';
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
    }
  
    async enterPassword(pwd: string) {
        await this.password.fill(pwd);
    }

    async regsiterNewUser() {

        const lname  = faker.person.lastName();
        const fname  = faker.person.firstName();
        const phone= faker.phone.number('91##########' as any);
        const address= faker.location.streetAddress();
        const state= faker.location.state();
        const city= faker.location.city();
        const zipcode= faker.location.zipCode('#####');     


        await this.txtFirstName.fill(fname);
        await this.txtLastName.fill(lname);
        await this.password.fill('Test@12345');
        await this.enterdateofBirth();
        await this.txtAddress.fill(address);
        await this.txtState.fill(state);
        await this.txtCity.fill(city);
        await this.txtZipcode.fill(zipcode);
        await this.txtMobileNumber.fill(phone);
        await this.chkSignupNewsletter.check();
        await this.chkReceiveOffers.check();
        await this.btnSubmit.click();
    }

    async enterdateofBirth() {
        const day = faker.date.birthdate().getDate().toString();
        const month = faker.date.birthdate().getMonth().toString();
        const year = faker.date.birthdate().getFullYear().toString();

        await this.ddDay.selectOption(day);
        await this.ddMonth.selectOption(month);
        await this.ddYear.selectOption(year);
    }

}
