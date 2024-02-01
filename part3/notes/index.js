const express = require("express");
const app = express();
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
app.use(cors());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
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
  res.json(notes);
});

//Get all Notes by Id
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => {
    return note.id === id;
  });
  note ? res.json(note) : res.status(404).end();
});

//Delete a Note by ID
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.send(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};
//Add a Note
app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({ error: "Missing Content" });
  }
  const note = {
    id: generateId(),
    content: body.content,
    important: Boolean(body.important) || false,
  };

  notes = notes.concat(note);

  res.json(note);
});
app.put('/api/notes/:id', (req, res) => {
  const body = req.body;
  notes.map((note) => {
    if (note.id === body.id){
      note.important === body.important
    }
  })
  res.json(body)
})
const PORT = 3001;

app.listen(PORT);

console.log(`Server is running on port ${PORT}`);

console.table(listEndpoints(app));
