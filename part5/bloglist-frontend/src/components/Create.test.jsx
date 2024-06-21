import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import Create from "./Create";

test("<Create>", async () => {
  const handleCreate = vi.fn((e) => e.preventDefault());
  const user = userEvent.setup();

  render(<Create handleCreate={handleCreate} />);
  screen.debug();
  const titleInput = screen.getByLabelText("title", {
    name: /title/i,
  });
  const authorInput = screen.getByLabelText("author", {
    name: /author/i,
  });
  const urlInput = screen.getByLabelText("url", {
    name: /url/i,
  });
  const submitButton = screen.getByRole("button", { name: /create/i });
  await user.type(titleInput, "Hey Friends");
  await user.type(authorInput, "Vidhi");
  await user.type(urlInput, "instagram.com");
  await user.click(submitButton);

  expect(handleCreate.mock.calls).toHaveLength(1);
  expect(handleCreate.mock.calls[0][1]).toBe("Hey Friends");
});
