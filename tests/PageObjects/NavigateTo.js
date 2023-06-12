export class NavigateTo {
	constructor(page) {
		this.page = page;
	}

	async dashboardsPage(specificDashboard = "") {
		await this.page
			.locator("button", {
				has: this.page.locator("span", { hasText: "Dashboards" }),
			})
			.click();
		if (specificDashboard) {
			await this.page
				.locator('div[role="group"]', {
					has: this.page.locator("span", { hasText: specificDashboard }),
				})
				.click();
		} else {
			await this.page
				.locator('[role="group"]', {
					has: this.page.locator("span", { hasText: "View all dashboards" }),
				})
				.click();
		}
	}
}
