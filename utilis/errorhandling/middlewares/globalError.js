const handleGlobalError = (err, req, res, next) => {
    if (err.name === "ServerError") {
        console.log(`ServerError: ${err.statusCode} ${err.message}`);
        res.status(err.statusCode).json({ error: err.message });
      } else {
        console.error(err.stack);
      }
}

module.exports = handleGlobalError;