const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// Security
app.use(helmet());
app.use(compression());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300
});
app.use(limiter);

// Body Parser
app.use(express.json());

// Health Check (مهم لـ Render + UptimeRobot)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Aeternova Alive 👑" });
});

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/anime", require("./routes/anime.routes"));
app.use("/api/manga", require("./routes/manga.routes"));

// Error Handler
app.use(errorMiddleware);

module.exports = app;