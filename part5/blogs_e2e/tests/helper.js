const loginWith = async (page, username, password) => {
    const textboxes = await page.getByRole("textbox").all()
    await textboxes[0].fill(username);
    await textboxes[1].fill(password);
    await page.getByRole("button", {name: "login"}).click()
}

export {loginWith}