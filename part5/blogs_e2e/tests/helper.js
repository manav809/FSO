const loginWith = async (page, username, password) => {
  const textboxes = await page.getByRole("textbox").all();
  await textboxes[0].fill(username);
  await textboxes[1].fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, url) => {
  await page.getByRole("button", { name: "create new blog" }).click();
  const textboxes = await page.getByRole("textbox").all();
  const myValue = await page.evaluate(() => {
    return JSON.parse(localStorage.getItem("logged_user"));
  });
  console.log(typeof(myValue));
  await textboxes[0].fill(title);
  await textboxes[1].fill(myValue.id);
  await textboxes[2].fill(url);
  await page.getByRole("button", { name: "create" }).click();
};

export { loginWith, createBlog };
