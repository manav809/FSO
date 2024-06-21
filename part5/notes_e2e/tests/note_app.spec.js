// @ts-nocheck
const { test, describe, expect } = require('@playwright/test')

describe("Note App", () => {
  test("get started link", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    const locator = await page.getByRole("heading", { name: "Notes" });
    await expect(locator).toBeVisible();

    await expect(page.getByText("Hey Willie")).toBeVisible();
  });
});
