const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const Note = require("../models/note");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser executes JavaScript",
    important: true,
  },
];

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObj = new Note(initialNotes[0]);
  await noteObj.save();
  noteObj = new Note(initialNotes[1]);
  await noteObj.save();
});
// Basic Functionality
test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there is 1 note", async () => {
  const res = await api.get("/api/notes");
  assert.strictEqual(res.body.length, initialNotes.length);
});

test("the first note is about HTTP methods", async () => {
  const res = await api.get("/api/notes");
  const contents = res.body.map((obj) => obj.content);
  assert.strictEqual(contents[0], "HTML is easy");
});

test("a valid note can be added", async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);

  assert.strictEqual(response.body.length, initialNotes.length + 1);

  assert(contents.includes("async/await simplifies making async calls"));
});

test("note without content is not added", async () => {
  const newNote = {
    important: true,
  };

  await api.post("/api/notes").send(newNote).expect(400);

  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, initialNotes.length);
});

after(async () => {
  await mongoose.connection.close();
});
