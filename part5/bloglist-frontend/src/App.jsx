import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("logged_user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

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
  };
  return (
    <div>
      <h2>blogs</h2>
      {!user ? <p>Please Log In</p> : <p>{user.name} Logged In</p>}
      <button onClick={handleLogout}>logout</button>
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
        blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
      )}
    </div>
  );
};

export default App;
