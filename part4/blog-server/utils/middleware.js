const logger = require("./logger");

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
  }
  next(error);
};

module.exports = {
  requestLogger,
  errorHandler,
};
