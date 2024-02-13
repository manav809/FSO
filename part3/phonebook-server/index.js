const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const Person = require("./models/phone");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms - :body"
  )
);

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

const errorHandler = (error, req, res, next) => {
  res.status(404).send({ error: "malformatted id" });
  next(error);
};

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

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.json({ error: "Person Not Found" }).sendStatus(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:name", (req, res) => {
  const name = req.params.name;
  Person.deleteOne({ name: name })
    .then(() => res.sendStatus(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    res.sendStatus(400).json({ error: "Missing Content" });
    return;
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((saved) => res.json(saved))
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.table(listEndpoints(app));
