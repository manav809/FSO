const Blog = require("../models/blog");

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
