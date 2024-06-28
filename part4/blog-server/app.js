const config = require("./utils/config");
const middleware = require("./utils/middleware");
const express = require("express");
require("express-async-errors"); // we dont need try and catch now
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

require("dotenv").config();

const app = express();

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error Connecting: ", err.message));

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);


if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler);

module.exports = app;
