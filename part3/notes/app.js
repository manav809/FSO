const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const express = require("express");
require("express-async-errors"); // we dont need try and catch now
const cors = require("cors");
const mongoose = require("mongoose");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
require("dotenv").config();

const app = express();

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error Connecting: ", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

app.use(middleware.errorHandler);

module.exports = app;
