const express = require("express");
const listEndpoints = require("express-list-endpoints");
const app = express();

app.use(express.json()); // this is a middleware that we use without realizing: when recieving the HTTP request, parse it like a json

const checkIfManav = (req, res, next) => {
  const name = req.body.name;
  if (name === "Manav") {
    res.json({ error: "Yo we already have you on db" });
  } else {
    next();
  }
};

app.use((req, res, next) => {
  console.log("Middleware Called");
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.post("/", checkIfManav, (req, res) => {
  res.send("You logged in");
});

app.listen(3001, () => {
  console.log("Server running");
});

console.table(listEndpoints(app));
