const exceptionHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }
  const message = err.message || "Internal Server Error";
  const status = err.statusCode || 500;
  const error = process.env.NODE_ENV === "development" ? err.stack : undefined;
  res.error(status, error, message);
};

module.exports = exceptionHandler;
