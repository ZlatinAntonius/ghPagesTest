import { expect } from "@playwright/test";

export class GadgetFrame {
	constructor(page) {
		this.page = page;
		this.iframe = this.page.frameLocator("iframe");
		this.datepicker = this.page
			.frameLocator("iframe")
			.getByPlaceholder("yyyy-mm-dd");
	}

	async editName(dataSource) {
		await this.page.waitForSelector("iframe");

		//Change name
		const iframeSN = this.iframe.locator("#data-set-name");
		await iframeSN.clear();
		await iframeSN.fill(dataSource);
	}

	async selectDateRange(startDate, endDate) {
		const iframeDates = this.iframe.getByText("By dates");
		await iframeDates.click();
		//Select and check dates
		const dates = [startDate, endDate]; //start and end date
		for (let i = 0; i < 2; i++) {
			await this.datepicker.nth(i).fill("");
			await this.datepicker.nth(i).fill(dates[i]); //Fancy way 🤵🥂
		}
		await expect(this.iframe.locator(".total")).toHaveText("24 issues"); //For the pre-given date range in issue
	}

	async saveGadget() {
		const saveBtn = this.iframe
			.getByRole("dialog", { name: "Data Source Modal" })
			.getByRole("button", { name: "Save" });
		await saveBtn.click();
	}
}
