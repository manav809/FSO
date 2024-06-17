import { useState } from "react";
import PropTypes from "prop-types";

const Create = ({ handleCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    handleCreate(event, title, author, url);
  };

  return (
    <form onSubmit={handleSubmit}>
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

Create.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};

export default Create;
