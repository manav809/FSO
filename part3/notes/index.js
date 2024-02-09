const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
require("dotenv").config();
const Notes = require("./models/note");
const app = express();

app.use(cors());

const requestLogger = (req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Body: ", req.body);
  console.log("---");
  next();
};

app.use(requestLogger);
//Header to know that the request will be dealing with JSON
app.use(express.json());

app.use(express.static("build"));
//Root
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

//Get all Notes
app.get("/api/notes", (req, res) => {
  Notes.find({}).then((notes) => {
    res.json(notes);
  });
});

//Get all Notes by Id
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  Notes.findById(id)
    .then((notes) => {
      res.json(notes);
    })
    .catch((error) => res.sendStatus(404));
});

//Delete a Note by ID
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  Notes.deleteOne({ _id: id }).then(() => res.sendStatus(204));
});

//Add a Note
app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: "Missing Content" });
  }
  const note = new Notes({
    content: body.content,
    important: Boolean(body.important) || false,
  });
  note.save().then((saved) => {
    res.json(saved);
  });
});

app.put("/api/notes/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Notes.findByIdAndUpdate({ _id: id }, body).then((body) => res.json(body));
});
const PORT = 3001;

app.listen(PORT);

console.log(`Server is running on port ${PORT}`);

console.table(listEndpoints(app));
