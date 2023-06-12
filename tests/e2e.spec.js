import { test } from "@playwright/test";
import "dotenv/config";
import { POmanager } from "./PageObjects/POmanager";

test("@E2E Login to Jira", async ({ page }) => {
	await page.goto("https://narasyst-interns.atlassian.net");

	//Define global and evironment variables
	const email = process.env.USER_EMAIL;
	const password = process.env.USER_PASSWORD;
	const dashboardName = "Test Dashboard";
	const gadgetName = "Z# Performance Objectives";

	// Login To Page
	const emailField = page.locator('[type="email"]');
	const passwordField = page.locator('[type="password"]');
	let submitBtn = page.locator("#login-submit");

	await emailField.fill(email);
	await submitBtn.click();
	await passwordField.fill(password);
	await submitBtn.click();

	// Homepage
	await page
		.locator("button", { has: page.locator("span", { hasText: "Dashboards" }) })
		.click();
	await page
		.locator('[role="group"]', {
			has: page.locator("span", { hasText: "View all dashboards" }),
		})
		.click();

	// Dashboards Page
	await page.locator("span", { hasText: "Create dashboard" }).click();
	const nameInput = page.locator('input[name="name"]');
	const descriptionInput = page.locator('textarea[name="description"]');
	const gadgetSearchBar = page.locator('input[placeholder="Search gadgets"]');
	const gadgetItem = page.locator(
		'//*[@id="dashboard"]/div/aside/div/div/div[2]/div',
		{ has: page.locator("strong", { hasText: gadgetName }) }
	);
	submitBtn = page.locator('button[type="submit"]');

	await nameInput.fill(dashboardName);
	await descriptionInput.fill("Test description");
	await submitBtn.click();

	await gadgetSearchBar.type("Z#");
	await gadgetItem.locator("button span", { hasText: "Add" }).click();

	// Gadget frame
	await page.waitForSelector("iframe");
	const iframeSN = page.frameLocator("iframe").locator("#data-set-name");
	await iframeSN.clear();
	await iframeSN.fill("Narasyst Data");
	await page
		.frameLocator("iframe")
		.getByText("Save", { exact: true })
		.nth(1)
		.click({ force: true });
	await page.locator('[aria-label="Minimize"]').click({ force: true });

	await page.locator('[aria-label="Expand"]').click({ force: true });
	await page
		.frameLocator("iframe")
		.getByText("Save", { exact: true })
		.nth(1)
		.click({ force: true });

	// Navigate back to Dashboards
	await page
		.locator("button", { has: page.locator("span", { hasText: "Dashboards" }) })
		.click();
	await page
		.locator('[role="group"]', {
			has: page.locator("span", { hasText: "View all dashboards" }),
		})
		.click();

	// Delete Dashboard
	await page.reload({ waitUntil: "domcontentloaded" });
	await page
		.locator("tbody tr", {
			has: page.locator("td a", { hasText: dashboardName }),
		})
		.locator("td")
		.last()
		.click();
	await page
		.locator('div[role="group"] button', {
			has: page.locator("span", { hasText: "Move to trash" }),
		})
		.click();
	await page
		.locator("section button span", { hasText: "Move to trash" })
		.click();

	await page.pause();
});

test("@OOP Jira Test", async ({ page }) => {
	// Define Test Payload
	const email = process.env.USER_EMAIL;
	const password = process.env.USER_PASSWORD;
	const dashboardName = "Test Dashboard Test";
	const gadgetName = "Z# Performance Objectives";

	// Define Page Objects
	const poManager = new POmanager(page);
	const loginPage = poManager.getLoginPage();
	const naviagteTo = poManager.getNavigateTo();
	const dashboardPage = poManager.getDashboardPage();
	const gadgetFrame = poManager.getGadgetFrame();

	// Mount on page
	await page.goto("https://narasyst-interns.atlassian.net");

	// Login To Page
	await loginPage.logIn(email, password);

	// Navigate Dashboards Page
	await naviagteTo.dashboardsPage();

	// Create Dashboard
	await dashboardPage.createDashboard(dashboardName, "Test Descriasdsdption");

	// Add Gadget
	await dashboardPage.addGadget(gadgetName);

	// Configure Gadget
	await gadgetFrame.editName("Narasyst Data");
	await gadgetFrame.selectDateRange("2023-05-01", "2023-05-31");
	await page.pause();
	await gadgetFrame.saveGadget();

	// Navigate Back Dashboards Page
	await naviagteTo.dashboardsPage();

	// Delete Dashboard
	await dashboardPage.deleteDashboard(dashboardName);
});

// npm run testE2E / testOOP
