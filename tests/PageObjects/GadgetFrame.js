export class GadgetFrame{
    constructor(page){
        this.page = page;
    }

    async editGadget(dataSource){
        await this.page.waitForSelector("iframe");

        const iframeSN = this.page.frameLocator("iframe").locator("#data-set-name");	
        await iframeSN.clear();
        await iframeSN.fill(dataSource);
        await this.page.frameLocator("iframe").getByText('Save', { exact: true }).nth(1).click({ force: true })
        // await this.page.locator('[aria-label="Minimize"]').click({ force: true })    
    }

    async saveGadget(){
        // await this.page.locator('[aria-label="Expand"]').click({ force: true })
        await this.page.frameLocator("iframe").getByText('Save', { exact: true }).nth(1).click({ force: true })
        await this.page.locator('[aria-label="Minimize"]').click({ force: true })    
    }

    
}