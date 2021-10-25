const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // first_name: { type: String },
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  cart: { type: Array },
});

module.exports = mongoose.model("users", userSchema);
