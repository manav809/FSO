const { test, after, beforeEach, expect } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Users = require("../models/user");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

let res;
let addUser;

beforeEach(async () => {
  await Users.deleteMany({});
  await Blog.deleteMany({});

  const user = {
    username: "manav809",
    name: "Manav Patel",
    password: "random123",
  };
  addUser = await api.post("/api/users").send(user);

  res = await api
    .post("/api/login")
    .send({ username: "manav809", password: "random123" });

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${res._body.token}`)
    .send({
      title: "The Alchemist",
      author: addUser._body.id,
      url: "google.com",
      likes: 1,
    });
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
    url: "amazon.com",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${res._body.token}`)
    .send({ ...newBlog, author: addUser._body.id })
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
    url: "microsoft.com",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${res._body.token}`)
    .send({ ...newBlog, author: addUser._body.id })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await helper.blogsInDb();

  assert("likes" in response[1]);
});

test("new blogs with no title or url are rejected", async () => {
  const newBlog = {
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${res._body.token}`)
    .send({ ...newBlog, author: addUser._body.id })
    .expect(400);
});

test("blogs can be deleted", async () => {
  const response = await helper.blogsInDb();
  const blog = response[0];
  await api
    .delete(`/api/blogs/${blog.id}`)
    .set("Authorization", `Bearer ${res._body.token}`)
    .expect(204);
  const afterDeletion = await helper.blogsInDb();
  assert.strictEqual(afterDeletion.length, helper.initialBlogs.length - 1);
});

test("blogs can be updated", async () => {
  const response = await helper.blogsInDb();
  const id = response[0].id;
  const updated = {
    title: "The Alchemist",
    url: "google.com",
    likes: 2,
  };
  await api.put(`/api/blogs/${id}`).send(updated).expect(201);
  const newResponse = await helper.blogsInDb();
  assert.strictEqual(updated.likes, newResponse[0].likes);
});

after(async () => {
  await mongoose.connection.close();
});
