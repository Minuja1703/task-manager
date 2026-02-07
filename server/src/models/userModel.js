const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
