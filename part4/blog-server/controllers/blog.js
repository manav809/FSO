const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (req, res) => {
  Blog.find({}).then((result) => {
    res.status(200).json(result);
  });
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });
  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogRouter