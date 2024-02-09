const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const morgan = require("morgan");

const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

require("dotenv").config();

const app = express();

app.use(cors());

const username = process.argv[2];
const password = process.argv[3];

const url = `mongodb+srv://${username}:${password}@cluster0.cse4eeb.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

personSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.ObjectId = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

const Person = mongoose.model("Phonenumbers", personSchema);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.use(express.json());

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms - :body"
  )
);

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

// morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, "content-length"),
//     "-",
//     tokens["response-time"](req, res),
//     "ms",

//   ].join(" ");
// });

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/info", (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people <br /> ${Date()}`);
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  console.log(persons);
  res.send(204).end();
});

const generateId = () => {
  // const id = Math.floor(Math.random() * 111);
  // return id;
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    res.sendStatus(400).json({ error: "Missing Content" });
    return;
  }
  if (persons.find((person) => person.name === body.name)) {
    res.sendStatus(400).json({ error: "Already Included" });
    return;
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);

  res.json(persons);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.table(listEndpoints(app));
