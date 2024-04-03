const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (req, res) => {
  Blog.find({}).then((result) => {
    res.status(200).json(result);
  });
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;
  if (!("likes" in body)) {
    body.likes = 0;
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });
  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(() => res.status(400).send("Not Found"));
});

blogRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  Blog.deleteOne({ _id: id })
    .then(() => res.sendStatus(204).end())
    .catch((error) => next(error));
});

module.exports = blogRouter;
