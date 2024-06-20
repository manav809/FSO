import {render, screen}    from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Togglable from "./Togglable"
import { beforeEach, expect } from "vitest";

describe('<Togglable />', () => {
    let container;

    beforeEach(() => {
        container = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv">
                    togglableContent
                </div>
            </Togglable>
        ).container
    })

    test('renders its children', async () => {
        await screen.findAllByText('togglableContent')
    })

    test('at the start children are not displayed', async () => {
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('upon clicking, children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)
        
        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('clicking cancel will hide it once again', async () => {
        const user = userEvent.setup()
        const showButton = screen.getByText('show...')
        await user.click(showButton)

        const closeButton = screen.getByText('cancel')
        await user.click(closeButton)

        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})