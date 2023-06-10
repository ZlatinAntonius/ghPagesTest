import { test } from "@playwright/test";
import "dotenv/config";
import { POmanager } from "./PageObjects/POmanager";

test("@E2E Login to Jira", async ({ page }) => {
	await page.goto("https://narasyst-interns.atlassian.net");

	//Define global and evironment variables
	const email = process.env.USER_EMAIL;
	const password = process.env.USER_PASSWORD;
	const gadgetName = 'Z# Performance Objectives'

	// Login Page
	const emailField = page.locator('[type="email"]');
	const passwordField = page.locator('[type="password"]');
	let submitBtn = page.locator("#login-submit");

	await emailField.fill(email);
	await submitBtn.click();
	await passwordField.fill(password);
	await submitBtn.click();

	// Homepage
	await page.locator('button', { has: page.locator('span', { hasText: 'Dashboards'})}).click()
	await page.locator('[role="group"]', { has: page.locator('span', {hasText: 'View all dashboards'}) }).click()

	// Dashboards Page
	await page.locator('span', {hasText: 'Create dashboard'}).click()
	const nameInput = page.locator('input[name="name"]')
	const descriptionInput = page.locator('textarea[name="description"]')
	const gadgetSearchBar = page.locator('input[placeholder="Search gadgets"]')
	const gadgetItem = page.locator('//*[@id="dashboard"]/div/aside/div/div/div[2]/div', { has: page.locator('strong', { hasText: gadgetName })})
	submitBtn = page.locator('button[type="submit"]')

	await nameInput.fill('GuguGaga')
	await descriptionInput.fill('GagaGugu')
	await submitBtn.click()

	await gadgetSearchBar.type('Z#')
	await gadgetItem.locator('button span', { hasText: 'Add'}).click()

	// Gadget frame
	// await page.pause()

	await page.waitForSelector('iframe')
	const frameElement = await page.$('iframe');
	console.log(await frameElement.contentFrame())

	// const sourceNameInput = frame.locator('input[placeholder="Data"]');
	// await page.frameLocator('[name="ap-iframe"]').locator('button', { hasText: 'Save' }).click();

	await page.pause();
});

// npx playwright test --grep "@E2E" --headed