// @ts-nocheck
const { test, describe, expect, beforeEach } = require("@playwright/test");

describe("Note App", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("get started link", async ({ page }) => {
    const locator = await page.getByRole("heading", { name: "Notes" });
    await expect(locator).toBeVisible();

    await expect(page.getByText("Hey Willie")).toBeVisible();
  });

  test("login form can be opened", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill('vidhi809')
    await textboxes[1].fill('123')
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText('Welcome Vidhi, below are your notes')).toBeVisible()
  });

  describe("when logged in", () => {
    beforeEach(async ({page}) => {
      await page.getByRole("button", { name: "login" }).click();
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('vidhi809')
      await textboxes[1].fill('123')
      await page.getByRole("button", { name: "login" }).click();
    })
    test("note creation", async ({page}) => {
      await page.getByRole("button", {name: "new note"}).click();
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('Playwright Testing is Cool')
      await page.getByRole('button', {name: "save"}).click()

      await expect(page.getByText('Playwright Testing is Cool')).toBeVisible()
    })
  })
});
