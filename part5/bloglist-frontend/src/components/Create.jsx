import { useState } from "react";
import blogService from "../services/blogs";

const Create = ({ setBlogs, blogs, setCreateToggle, createToggle }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();
    console.log("submitted");
    const blogObject = {
      title,
      author,
      url,
    };
    blogService.create(blogObject).then((createdBlog) => {
      console.log(createdBlog);
      setCreateToggle(!createToggle)
      setBlogs(blogs.concat(createdBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
    });
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        title:{" "}
        <input
          type="text"
          value={title}
          name="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        author:{" "}
        <input
          type="text"
          value={author}
          name="Author"
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        url:{" "}
        <input
          type="text"
          value={url}
          name="Url"
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default Create;
