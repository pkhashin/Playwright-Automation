import { Locator, Page } from "@playwright/test"; 

export class HomePage { 
    readonly page: Page; 
    readonly textLoggedInUser: Locator; 
    readonly invalidUserErrorText: Locator; 
    readonly btnLogOut: Locator; 
    
    constructor(page: Page) { 
        this.page = page; 
        this.textLoggedInUser = page.locator("//li[a[contains(.,'Logged in as')]]//b"); 
        this.invalidUserErrorText = page.locator("//form[@action='/login']//p"); 
        this.btnLogOut = page.locator("//a[contains(text(),' Logout')]"); 
        } 
        
        async getLoggedInUserText(): Promise<string> { 
            const text = await this.textLoggedInUser.textContent(); 
            return text || ''; 
        } 
        
        async getInvalidUserErrorText(): Promise<string> {
            const text = await this.invalidUserErrorText.textContent(); 
            return text || ''; } 
            
            async clickLogoutButton() { 
                await this.btnLogOut.click(); 
            } 
        }