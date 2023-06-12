export class LoginPage {
	constructor(page) {
		this.page = page;
	}

	async logIn(email, password) {
		const emailField = this.page.locator('[type="email"]');
		const passwordField = this.page.locator('[type="password"]');
		const loginSubmitBtn = this.page.locator("#login-submit");

		await emailField.fill(email);
		await loginSubmitBtn.click();
		await passwordField.fill(password);
		await loginSubmitBtn.click();
	}
}
