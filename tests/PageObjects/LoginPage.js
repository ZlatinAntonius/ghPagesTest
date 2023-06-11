export class LoginPage {
	constructor(page) {
		this.page = page;
	}

	async logIn(email, password) {
		const emailField = this.page.locator('[type="email"]');
		const passwordField = this.page.locator('[type="password"]');
		const loginSubmitBtn = this.page.locator("#login-submit");

		await emailField.type(email);
		await loginSubmitBtn.click();
		await passwordField.type(password);
		await loginSubmitBtn.click();
	}
}
