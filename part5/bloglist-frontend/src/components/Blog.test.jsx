import Blog from "./Blog";
import { render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";
import userEvent from "@testing-library/user-event"

const blogs = [
    {
      title: "Hello World",
      author: {
        name: "Manav Patel",
        id: "asdfghjkl",
      },
      url: "google.com",
      likes: 1,
    },
    {
      title: "Hello World",
      author: {
        name: "Vidhi Patel",
        id: "qwertyuiop",
      },
      url: "facebook.com",
      likes: 1,
    },
];

describe('<Blog/>', () => {
    let container;

    const mockHandler = vi.fn();
    const mockSetCreateToggle = vi.fn();
    const mockSetBlogs = vi.fn();

    beforeEach(() => {
        container = render(
            <Blog
            blog={blogs[0]}
            blogs={blogs}
            createToggle={mockHandler}
            setCreateToggle={mockSetCreateToggle}
            setBlogs={mockSetBlogs}
          /> 
        )
    })
    test("Renders Blog", async () => {
        const blogText =  screen.queryByText("Hello World");
        const authorText =  screen.queryByText("Author: Manav Patel");
        
        expect(blogText).toBeDefined();
        expect(authorText).toBeDefined();
      });
    test("when you click view", async () => {
        const user = userEvent.setup()
        const viewButton = screen.queryByText("view")
        await user.click(viewButton)
        
        const url = screen.queryByText(/.com/)
        expect(url).toBeDefined()

        const likes = screen.queryByText("likes 1")
        expect(likes).toBeDefined()
    })   
})
