import { useState } from "react";

const Blog = ({ blog }) => {
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
  
  const label = expand ? "hide" : "view"
  return (
    <div style={blogStyle}>
      {blog.title} {" "}
      <button onClick={expandMore}>{label}</button>
      {expand ? (
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button>likes</button></p>
          <p>{blog.author?.name} </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Blog;
