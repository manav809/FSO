import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, createToggle, setCreateToggle, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [expand, setExpand] = useState(false);

  const expandMore = (event) => {
    event.preventDefault();
    setExpand(!expand);
  };

  const increment = () => {
    const BLOG = blogs.find((BLOG) => BLOG.id === blog.id);
    BLOG.likes += 1;
    blogService.update(blog.id, BLOG).then((updated) => {
      setBlogs(blogs.map((n) => (n.id != blog.id ? n : updated)));
      setCreateToggle(!createToggle);
    });
  };

  const deleteBlog = () => {
    if (window.confirm("Are you sure you want to delete")) {
      blogService.deleteBlog(blog.id).then(() => {
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      });
    }
  };

  const label = expand ? "hide" : "view";
  console.log(blogs)
  return (
    <div style={blogStyle} className={blog.title}>
      {blog.title} <button onClick={expandMore}>{label}</button>
      {expand ? (
        <>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button className='like' onClick={increment}>like</button>
          </p>
          <p>{blog.author?.name}</p>
          {user.name === blog.author?.name ? <button onClick={deleteBlog}>remove</button> : <></>}
        </>
      ) : (
        <>Author: {blog.author?.name}</>
      )}
    </div>
  );
};

export default Blog;
