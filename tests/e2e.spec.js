import { test } from "@playwright/test";
import "dotenv/config";

test.only("Login to Jira", async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();

	const email = process.env.USER_EMAIL;
	const password = process.env.USER_PASSWORD;

	await page.goto("https://narasyst-interns.atlassian.net");
	await page.locator('[type="email"]').type(email);
	await page.locator("#login-submit").click();
	await page.locator('[type="password"]').type(password);
	await page.locator("#login-submit").click();
});
