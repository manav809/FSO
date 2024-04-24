const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (req, res, next) => {
  logger.info("------");
  logger.info("Method: ", req.method);
  logger.info("Path", req.path);
  logger.info("Body: ", req.body);
  logger.info("------");
  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  if (error.name === "CastError") {
    return res.status(404).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(400).json({ error: "JWT is incorrect" });
  }
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ", "")) {
    req.token = authorization.replace("Bearer ", "");
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ", "")) {
    req.token = authorization.replace("Bearer ", "");
    const user = jwt.verify(req.token, process.env.SECRET);
    req.user = user;
  } else {
    req.token = null;
    req.user = null;
  }

  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
