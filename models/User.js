const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "E-mail already exists"],
  },
  password: {
    type: String,
    minlength: [8, "Password should be atleast 8 characters long"],
    required: [true, "Please enter some password"],
    select: false,
  },
});

module.exports = mongoose.model("User", userSchema);
