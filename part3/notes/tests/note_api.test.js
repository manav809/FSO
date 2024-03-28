const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there is 1 note", async () => {
  const res = await api.get("/api/notes");
  assert.strictEqual(res.body.length, 1);
});

test("the note is s greeting", async () => {
  const res = await api.get("/api/notes");

  assert.strictEqual(res.body[0].content, "Hey");
  
});

after(async () => {
  await mongoose.connection.close();
});
