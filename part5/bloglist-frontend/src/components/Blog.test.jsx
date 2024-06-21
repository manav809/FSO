import Blog from "./Blog";
import { render, screen } from "@testing-library/react";

test("Renders Blog", async () => {
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
  const mockHandler = vi.fn();
  const mockSetCreateToggle = vi.fn();
  const mockSetBlogs = vi.fn();

  render(
    <Blog
      blog={blogs[0]}
      blogs={blogs}
      createToggle={mockHandler}
      setCreateToggle={mockSetCreateToggle}
      setBlogs={mockSetBlogs}
    />
  );
  const blogText =  screen.queryByText("Hello World");
  const authorText =  screen.queryByText("Author: Manav Patel");
  
  expect(blogText).toBeDefined();
  expect(authorText).toBeDefined();
});
