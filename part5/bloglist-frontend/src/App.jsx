import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Create from "./components/Create";
import axios from "axios";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [createToggle, setCreateToggle] = useState(false);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [createToggle]);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("logged_user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("logged_user", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("Some Error");
    }
  };
  const handleLogout = async () => {
    setUser(null);
    window.localStorage.clear();
    localStorage.removeItem("logged_user");
    axios.defaults.headers.common["Authorization"] = null;
  };
  return (
    <div>
      <h2>blogs</h2>
      {!user ? <p>Please Log In</p> : <p>{user.name} Logged In</p>}
      {user ? <button onClick={handleLogout}>logout</button> : null}
      {!user ? (
        <form onSubmit={handleLogin}>
          <div>
            username{" "}
            <input
              type="text"
              value={username}
              name="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            password{" "}
            <input
              type="text"
              value={password}
              name="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      ) : (
        <div>
          <Create
            setBlogs={setBlogs}
            blogs={blogs}
            setCreateToggle={setCreateToggle}
            createToggle={createToggle}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
