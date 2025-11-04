import { Locator, Page,expect } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly textLoggedInUser: Locator;
    readonly btnLogOut: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textLoggedInUser = page.locator("//li[a[contains(.,'Logged in as')]]//b");
        this.btnLogOut = page.locator("//a[contains(text(),' Logout')]");
    }

    async clickLogoutButton() {
        await this.btnLogOut.click();
    }
    
    async verifyLoggedInUser(expectedName: string){
        const actualName = await this.textLoggedInUser;
        await expect(actualName).toHaveText(expectedName);
        console.log('Logged in user verified: ' + expectedName);
        
    }

    

    
}