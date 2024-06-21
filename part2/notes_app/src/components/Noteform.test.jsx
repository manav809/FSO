import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect } from "vitest";
import NoteForm from "./NoteForm";

test('<Noteform>', async () => {
    const addNote = vi.fn(e => e.preventDefault())
    const user = userEvent.setup()

    render(<NoteForm addNote={addNote} />)
    const input = screen.getByRole('textbox')
    const sendButton = screen.getByText('save')

    await user.type(input, 'testing this out')
    await user.click(sendButton)

    expect(addNote.mock.calls).toHaveLength(1)
    expect(addNote.mock.calls[0][1]).toBe('testing this out')
})