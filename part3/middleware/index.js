const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.join({ message: "Hello World" });
});

app.listen(3001, () => {
    console.log("Server running");
})
