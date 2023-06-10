import { LoginPage } from "./LoginPage";

export class POmanager {
	constructor(page) {
		this.page = page;

		this.loginPage = new LoginPage(this.page);
	}

	getLoginPage() {
		return this.loginPage;
	}
}
