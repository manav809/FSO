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

test("the note first note tells us that HTML is easy", async () => {
  const res = await api.get("/api/notes");
  const contents = res.body.map(obj => obj.content);
  assert.strictEqual(contents[0], "HTML is easy");
});

after(async () => {
  await mongoose.connection.close();
});
