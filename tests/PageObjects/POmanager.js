import { LoginPage } from "./LoginPage";
import { NavigateTo } from "./NavigateTo";
import { DashboardPage } from "./DashboardPage";
import { GadgetFrame } from "./GadgetFrame";

export class POmanager {
	constructor(page) {
		this.page = page;

		this.loginPage = new LoginPage(this.page);
		this.navigateTo = new NavigateTo(this.page);
		this.dashboardPage = new DashboardPage(this.page)		
		this.gadgetFrame = new GadgetFrame(this.page);
	}

	getLoginPage() {
		return this.loginPage;
	}
	getNavigateTo(){
		return this.navigateTo;
	}
	getDashboardPage(){
		return this.dashboardPage;
	}
	getGadgetFrame(){
		return this.gadgetFrame;
	}
}
