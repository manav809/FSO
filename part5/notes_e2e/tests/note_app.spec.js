// @ts-nocheck
const {
  test,
  describe,
  expect,
  beforeEach,
  request,
} = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

describe("Note App", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");

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
      await loginWith(page, "root", "123");

      await expect(
        page.getByText("Welcome Root, below are your notes")
      ).toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "root", "123");
    });

    test("note creation", async ({ page }) => {
      await createNote(page, "Playwright Testing is Cool")

      await expect(page.getByText("Playwright Testing is Cool")).toBeVisible();
    });

    test("toggle importance", async ({ page }) => {
      await createNote(page, "Playwright Testing is not Cool")

      await page.getByRole("button", { name: "make not important" }).click();
      await expect(page.getByText("make important")).toBeVisible();
    });
  });

  describe("failed login", () => {
    test("failed login displays red banner", async ({ page }) => {
      await loginWith(page, "root", "wrong");
      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText("Wrong Credentials");
    });
  });
});
