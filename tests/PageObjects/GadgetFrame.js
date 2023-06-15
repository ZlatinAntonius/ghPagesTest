import { expect } from "@playwright/test";

export class GadgetFrame {
	constructor(page) {
		this.page = page;

		this.iframe = this.page.frameLocator("iframe");
		//iframe fields
		this.iframeName = this.iframe.locator("#data-set-name");
		this.byDatesField = this.iframe.getByText("By dates");
		this.datepicker = this.page
			.frameLocator("iframe")
			.getByPlaceholder("yyyy-mm-dd");
		this.totalIssues = this.iframe.locator(".total");
		this.saveBtn = this.iframe
			.getByRole("dialog", { name: "Data Source Modal" })
			.getByRole("button", { name: "Save" });
	}

	async editName(name) {
		await this.page.waitForSelector("iframe");

		await this.iframeName.clear();
		await this.iframeName.fill(name);
	}

	async selectDateRange(startDate, endDate) {
		await this.byDatesField.click();
		//Select and check dates
		const dates = [startDate, endDate]; //start and end date
		for (let i = 0; i < 2; i++) {
			await this.datepicker.nth(i).fill("");
			await this.datepicker.nth(i).fill(dates[i]); //Fancy way 🤵🥂
		}
		await expect(this.totalIssues).toHaveText("26 issues"); //For the pre-given date range in issue
	}

	async saveGadget() {
		await this.saveBtn.click();
	}
}
