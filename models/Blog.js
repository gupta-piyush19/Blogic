const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter some blog title"],
  },
  image: {
    type: String,
    required: [true, "Please insert some relevant image"],
  },
  body: {
    type: String,
    default:
      '{"blocks":[{"key":"3eesq","text":"A Text-editor with super cool features built in Draft.js.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":19,"length":6,"style":"BOLD"},{"offset":25,"length":5,"style":"ITALIC"},{"offset":30,"length":8,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"9adb5","text":"Tell us a story!","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
