const router = require("express").Router();

router.get("/", async (req, res) => {
  res.json({ message: "Anime endpoint coming next 👑" });
});

module.exports = router;