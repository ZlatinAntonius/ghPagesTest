export class LoginPage {
	constructor(page) {
		this.page = page;
		
		this.emailField = this.page.locator('[type="email"]');
		this.passwordField = this.page.locator('[type="password"]');
		this.loginSubmitBtn = this.page.locator("#login-submit");
	}

	async logIn(email, password) {
		await this.emailField.type(email);
		await this.loginSubmitBtn.click();
		await this.passwordField.type(password);
		await this.loginSubmitBtn.click();
	}
}
