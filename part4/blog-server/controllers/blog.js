const blogRouter = require("express").Router();
const { request } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", (req, res) => {
  Blog.find({})
    .populate("author", { name: 1 })
    .then((result) => {
      res.status(200).json(result);
    });
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  if (!("likes" in body)) {
    body.likes = 0;
  }
  const user = await User.findById(body.author);

  const blog = new Blog({
    title: body.title,
    author: user.id,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((result) => {
      user.blogs = user.blogs.concat(result._id);
      user.save();
      res.status(201).json(result);
    })
    .catch(() => res.status(400).send("Not Found"));
});

blogRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Blog.deleteOne({ _id: id })
    .then(() => res.sendStatus(204).end())
    .catch((error) => next(error));
});

blogRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const { likes } = req.body;
  Blog.findByIdAndUpdate(
    { _id: id },
    { likes },
    { new: true, runValidators: true, context: "query" }
  )
    .then((update) => res.status(201).json(update))
    .catch((error) => next(error));
});

module.exports = blogRouter;
