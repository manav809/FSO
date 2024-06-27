// @ts-nocheck
const {
  test,
  describe,
  expect,
  beforeEach,
  request,
} = require("@playwright/test");

describe("Note App", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3001/api/testing/reset");

    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "root",
        username: "root",
        password: "123",
      },
    });

    await page.goto("http://localhost:3000/");
  });

  describe("Basic Functions", () => {
    test("get started link", async ({ page }) => {
      const locator = await page.getByRole("heading", { name: "Notes" });
      await expect(locator).toBeVisible();
    });

    test("login form can be opened", async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      const textboxes = await page.getByRole("textbox").all();
      await textboxes[0].fill("root");
      await textboxes[1].fill("123");
      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.getByText("Welcome Root, below are your notes")
      ).toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      const textboxes = await page.getByRole("textbox").all();
      await textboxes[0].fill("root");
      await textboxes[1].fill("123");
      await page.getByRole("button", { name: "login" }).click();
    });
    test("note creation", async ({ page }) => {
      await page.getByRole("button", { name: "new note" }).click();
      const textboxes = await page.getByRole("textbox").all();
      await textboxes[0].fill("Playwright Testing is Cool");
      await page.getByRole("button", { name: "save" }).click();

      await expect(page.getByText("Playwright Testing is Cool")).toBeVisible();
    });

    test("toggle importance", async ({ page }) => {
      await page.getByRole("button", { name: "new note" }).click();
      const textboxes = await page.getByRole("textbox").all();
      await textboxes[0].fill("Playwright Testing is not Cool");
      await page.getByRole("button", { name: "save" }).click();

      await page.getByRole("button", { name: "make not important" }).click();
      await expect(page.getByText("make important")).toBeVisible();
    });

    describe("failed login", () => {
      test("failed login displays red banner", async ({ page }) => {
        await page.getByRole("button", { name: "login" }).click();
        const textboxes = await page.getByRole("textbox").all();
        await textboxes[0].fill("root");
        await textboxes[1].fill("wrong password");
        await page.getByRole("button", { name: "login" }).click();

        const errorDiv = await page.locator(".error");
        await expect(errorDiv).toContainText("Wrong Credentials");
      });
    });
  });
});
