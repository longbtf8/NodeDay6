function responseFormat(req, res, next) {
  res.success = (data, status = 200) => {
    res.status(status).json({
      status: "success",
      data,
    });
  };
  res.error = (status = 500, message, error = null) => {
    res.status(status).json({
      status: "error",
      error,
      message,
    });
  };
  next();
}
module.exports = responseFormat;
