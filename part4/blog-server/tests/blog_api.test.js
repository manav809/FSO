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
  assert('id' in response[0])
});

after(async () => {
  await mongoose.connection.close();
});
