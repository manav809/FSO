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
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "root", "123");
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, "Hello", "wikipedia.com")
      await expect(page.getByRole('heading', { name: 'Added Hello by' })).toBeVisible();
    })
  })
});
