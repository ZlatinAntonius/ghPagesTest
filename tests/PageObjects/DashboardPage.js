export class DashboardPage{
    constructor(page){
        this.page = page;
        this.email = process.env.USER_EMAIL;
        this.password = process.env.USER_PASSWORD;    
    }

    async createDashboard(dashboardName, dashboardDescription=''){
        await this.page.locator('span', { hasText: 'Create dashboard'}).click()
        const nameInput = this.page.locator('input[name="name"]')
        const descriptionInput = this.page.locator('textarea[name="description"]')
        const submitBtn = this.page.locator('button[type="submit"]')
        await nameInput.fill(dashboardName)
        if (dashboardDescription) await descriptionInput.fill(dashboardDescription);
        await submitBtn.click()
    }

    async addGadget(gadgetName){
        const gadgetSearchBar = this.page.locator('input[aria-label="Search gadgets"]')
        await gadgetSearchBar.type(gadgetName)
        const gadgetItem = this.page.locator('//*[@id="dashboard"]/div/aside/div/div/div[2]/div', { has: this.page.locator('strong', { hasText: gadgetName })})
        await gadgetItem.locator('button span', { hasText: 'Add'}).click()    
    }

    async deleteDashboard(dashboardName){
        await this.page.reload({ waitUntil: 'domcontentloaded' })
        await this.page.locator('tbody tr', { has: this.page.locator('td a', { hasText: dashboardName })}).locator('td').last().click()
        await this.page.locator('div[role="group"] button', { has: this.page.locator('span', { hasText: 'Move to trash'})}).click()
        await this.page.locator('section button span', { hasText: 'Move to trash'}).click()
    }
}