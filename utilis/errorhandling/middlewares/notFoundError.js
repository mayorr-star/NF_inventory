const handleNotFoundError = (err, req, res, next) => {
  if (err.name === "NotFoundError") {
    console.log(`NotFoundError: ${err.statusCode} ${err.message}`);
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err.stack);
    next(err);
  }
};

module.exports = handleNotFoundError;