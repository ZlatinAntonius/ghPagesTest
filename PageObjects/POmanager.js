import { LoginPage } from "./LoginPage";

class POmanager {
	constructor(page) {
		this.page = page;

		this.loginPage = new LoginPage(this.page);
	}

	getLoginPage() {
		return this.loginPage;
	}
}

export default POmanager;
