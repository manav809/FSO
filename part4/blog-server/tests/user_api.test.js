const { test, after, beforeEach, expect } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Users = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Users.deleteMany({});
  const userObjs = helper.initialUsers.map((user) => new Users(user));
  const promiseUsers = userObjs.map((user) => user.save());

  await Promise.all(promiseUsers);
});

test("users are returned as json", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await helper.usersInDb();
  assert.strictEqual(helper.initialUsers.length, response.length);
});

test("duplicate users are not added", async () => {
  const dupUser = {
    username: "manav809",
    name: "Manav Patel",
    password: "random123",
  };
  await api.post("/api/users").send(dupUser).expect(400);
});

test("username or password do not fit the length", async () => {
  const invalidPassword = {
    username: "tom809",
    name: "Tom",
    password: "12",
  };
  await api.post("/api/users").send(invalidPassword).expect(401).expect({
    error:
      "Invalid Authentication: Username or Password Must be at least 3 Characters",
  });

  const invalidUsername = {
    username: "Je",
    name: "Jerry",
    password: "123",
  };
  await api.post("/api/users").send(invalidUsername).expect(401).expect({
    error:
      "Invalid Authentication: Username or Password Must be at least 3 Characters",
  });
});

after(async () => {
  await mongoose.connection.close();
});
