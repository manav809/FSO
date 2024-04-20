const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    url: "google.com",
    likes: 1,
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    url: "facebook.com",
    likes: 1,
  },
];

const initialUsers = [
  {
    username: "manav809",
    name: "Manav Patel",
  },
  {
    username: "minesh809",
    name: "Minesh Patel",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
};
