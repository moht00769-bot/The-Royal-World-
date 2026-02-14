const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 12);

    await User.create({
      username,
      email,
      password: hashed
    });

    res.json({ success: true, message: "User created" });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw { status: 400, message: "Invalid credentials" };

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw { status: 400, message: "Invalid credentials" };

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;