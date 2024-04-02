const { test, after, beforeEach, expect } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blogs = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blogs.deleteMany({});
  const blogObjs = helper.initialBlogs.map((blog) => new Blogs(blog));
  const promiseBlogs = blogObjs.map((blog) => blog.save());

  await Promise.all(promiseBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await helper.blogsInDb();
  assert.strictEqual(helper.initialBlogs.length, response.length);
});

test("blogs have id attribute", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await helper.blogsInDb();
  assert("id" in response[0]);
});

test("blogs can be added to db", async () => {
  const newBlog = {
    title: "Kite Runner",
    author: "Khaled Hosseini",
    url: "amazon.com",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await helper.blogsInDb();

  assert.strictEqual(response.length, helper.initialBlogs.length + 1);

  const titles = response.map((blog) => blog.title);

  assert(titles.includes("Kite Runner"));
});

test("new blogs with no likes default to 0", async () => {
  const newBlog = {
    title: "We are not free",
    author: "Traci Chee",
    url: "microsoft.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await helper.blogsInDb();

  assert("likes" in response[2]);
});

after(async () => {
  await mongoose.connection.close();
});
