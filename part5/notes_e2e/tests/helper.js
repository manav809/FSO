const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "login" }).click();
  const textboxes = await page.getByRole("textbox").all();
  await textboxes[0].fill(username);
  await textboxes[1].fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createNote = async (page, content) => {
    await page.getByRole("button", { name: "new note" }).click();
    const textboxes = await page.getByRole("textbox").all();
    await textboxes[0].fill(content);
    await page.getByRole("button", { name: "save" }).click();
    await page.getByText(content).waitFor()
}
export { loginWith, createNote };
