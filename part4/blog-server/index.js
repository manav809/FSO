const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const listEndpoints = require("express-list-endpoints");
require("dotenv").config();

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = process.env.MONGO_URL;

mongoose.set("strictQuery", false);

mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (req, res) => {
  console.log(req);
  Blog.find({}).then((result) => {
    res.status(201).json(result);
  });
});

app.post("/api/blogs", async (req, res) => {
  console.log("Hey")
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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.table(listEndpoints(app))