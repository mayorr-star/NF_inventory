const handleNotFoundError = (err, req, res, next) => {
    if (err.name === "NotFoundError") {
      console.log(err.statusCode);
      res.status(err.statusCode).send(err.message);
    } else {
      next();
    }
};

module.exports = handleNotFoundError;