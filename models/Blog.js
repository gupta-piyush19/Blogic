const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  image: {
    type: String,
    required: [true, "Please enter some relevant image"],
  },
  body: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "E-mail already exists"],
  },
  owner: {
    id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    username: String,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model(Blog, blogSchema);
