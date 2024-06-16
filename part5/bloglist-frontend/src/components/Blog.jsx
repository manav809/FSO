import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, createToggle, setCreateToggle, setBlogs }) => {
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
    const BLOG = blogs.find((BLOG) => BLOG.id === blog.id)
    BLOG.likes += 1
    blogService.update(blog.id, BLOG).then((updated) => {
      setBlogs(blogs.map((n) => n.id != blog.id ? n : updated))
      setCreateToggle(!createToggle )
    })
  }


  const label = expand ? "hide" : "view"
  return (
    <div style={blogStyle}>
      {blog.title} {" "}
      <button onClick={expandMore}>{label}</button>
      {expand ? (
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={increment}>likes</button></p>
          <p>{blog.author?.name} </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Blog;
