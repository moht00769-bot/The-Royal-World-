const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: "Too many requests"
  }
});