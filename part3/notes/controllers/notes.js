const notesRouter = require("express").Router();
const Notes = require("../models/note");

//Root
notesRouter.get("/info", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

//Get all Notes
notesRouter.get("/", (req, res) => {
  Notes.find({}).then((notes) => {
    res.json(notes);
  });
});

//Get all Notes by Id
notesRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Notes.findById(id)
    .then((notes) => {
      if (notes) {
        res.json(notes);
      } else {
        res.json({ error: "Note Not Found" });
        res.sendStatus(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

//Delete a Note by ID
notesRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Notes.deleteOne({ _id: id })
    .then(() => res.sendStatus(204).end())
    .catch((error) => next(error));
});

//Add a Note
notesRouter.post("/", (req, res, next) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: "Missing Content" });
  }

  const note = new Notes({
    content: body.content,
    important: Boolean(body.important) || false,
  });
  note
    .save()
    .then((saved) => {
      res.json(saved);
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const { content, important } = req.body;

  Notes.findByIdAndUpdate(
    { _id: id },
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((update) => res.json(update))
    .catch((error) => next(error));
});

module.exports = notesRouter;
