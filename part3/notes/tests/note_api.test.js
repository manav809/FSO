const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const Note = require("../models/note");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});

  const noteObjs = helper.initialNotes.map((note) => new Note(note));

  const promiseNotes = noteObjs.map((note) => note.save());

  await Promise.all(promiseNotes);
});

// Basic Functionality
test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const res = await api.get("/api/notes");
  assert.strictEqual(res.body.length, helper.initialNotes.length);
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

  const notes = await helper.notesInDb();

  assert.strictEqual(notes.length, helper.initialNotes.length + 1);

  const contents = notes.map((r) => r.content);

  assert(contents.includes("async/await simplifies making async calls"));
});

test("note without content is not added", async () => {
  const newNote = {
    important: true,
  };

  await api.post("/api/notes").send(newNote).expect(400);

  const response = helper.notesInDb();
  assert.strictEqual((await response).length, helper.initialNotes.length);
});

test("a specific note can be viewed", async () => {
  const notes = await helper.notesInDb();

  const noteToView = notes[0];

  const getSpecificNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.deepStrictEqual(getSpecificNote.body, noteToView);
});

test("a note can be deleted", async () => {
  const notesStart = await helper.notesInDb();
  const notesToDelete = notesStart[0];

  await api.delete(`/api/notes/${notesToDelete.id}`).expect(204);

  const notesEnd = await helper.notesInDb();

  const contents = notesEnd.map((note) => note.content);
  assert(!contents.includes(notesToDelete.content));

  assert.strictEqual(notesEnd.length, helper.initialNotes.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});
