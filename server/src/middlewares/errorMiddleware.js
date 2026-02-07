const handleErrors = (error, req, res, next) => {
  try {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong. Plesae try again.";
    res.status(statusCode).json({ message: message });
    next();
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

module.exports = handleErrors;
