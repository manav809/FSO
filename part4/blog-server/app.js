const config = require("./utils/config");
const middleware = require("./utils/middleware");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
require("dotenv").config();

const app = express();

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error Connecting: ", err.message));

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogRouter)

app.use(middleware.erroHandler)

module.exports = app