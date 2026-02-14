const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  favorites: [{
    type: String
  }],

  watchHistory: [{
    animeId: String,
    episode: Number,
    progress: Number
  }]

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);