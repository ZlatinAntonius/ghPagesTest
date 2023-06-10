import { test } from "@playwright/test";
import "dotenv/config";

import POmanager from "../PageObjects/POmanager";

test("Login to Jira", async ({ browser }) => {
	//Create browser context and page
	const context = await browser.newContext();
	const page = await context.newPage();

	//Define global and evironment variables
	const email = process.env.USER_EMAIL;
	const password = process.env.USER_PASSWORD;
	const poManager = new POmanager(page);

	const loginPage = poManager.getLoginPage();
	loginPage.logIn(email, password);
});
