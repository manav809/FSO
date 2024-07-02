// @ts-nocheck
const {
  test,
  expect,
  beforeEach,
  describe,
  request,
} = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");

    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "root",
        name: "root",
        password: "123",
      },
    });

    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "root_2",
        name: "root_2",
        password: "123",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const title = await page.getByText("Please Log In");
    const username = await page.getByTestId("username");
    const password = await page.getByTestId("password");

    await expect(title).toBeVisible();
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
  });

  describe("Checking Login Functionality", () => {
    test("with correct credentials", async ({ page }) => {
      await loginWith(page, "root", "123");
      const errorDiv = await page.locator(".added");
      await expect(errorDiv).toContainText("root Successfully Logged In!!!");
    });

    test("with incorrect credentials", async ({ page }) => {
      await loginWith(page, "root", "wrong");
      const errorDiv = await page.locator(".deleted");
      await expect(errorDiv).toContainText("Check Username and/or Password!!!");
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "root", "123");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "Hello", "wikipedia.com");
      await expect(
        page.getByRole("heading", { name: "Added Hello by" })
      ).toBeVisible();
    });

    test("a new view", async ({ page }) => {
      await createBlog(page, "Hello", "wikipedia.com");
      await page.getByRole("button", { name: "View" }).click();
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText("likes 1 like")).toBeVisible();
    });

    test("remove note after adding", async ({ page }) => {
      await createBlog(page, "Hello", "wikipedia.com");
      await page.getByRole("button", { name: "View" }).click();

      page.on("dialog", (dialog) => {
        console.log(dialog.message());
        dialog.accept();
      });

      await page.getByRole("button", { name: "remove" }).click();

      await expect(page.locator("Hello")).not.toBeVisible();
    });

    test("only see delete button for my blog", async ({ page }) => {
      await createBlog(page, "Hello", "wikipedia.com");
      await page.getByRole("button", { name: "logout" }).click();
      await loginWith(page, "root_2", "123");
      await page.getByRole("button", { name: "View" }).click();
      const removeButton = await page.$("button[name=remove]");
      expect(removeButton).toBeNull();
    });
    describe("upon creating a few blogs", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, "Hello", "wikipedia.com");
        await createBlog(page, "Hello1", "google.com");
        await createBlog(page, "Hello2", "facebook.com");
        const waiter = page.locator(".blogs").last().getByText("Hello2");

        await expect(waiter).toBeVisible();
        await page.waitForSelector(".blogs");
      });
      test("upon liking, the blog should be re-arranged", async ({ page }) => {
        await page.getByText('Hello1').getByRole('button', { name: 'view' }).click()
        await page.getByRole("button", { name: "like" }).click();
        await page.waitForSelector('text=likes 1');
        await page.getByRole("button", { name: "hide" }).click();

        const last = page.locator(".blogs").last().getByText("Hello1");

        await expect(last).toBeVisible();
      });
    });
  });
});
