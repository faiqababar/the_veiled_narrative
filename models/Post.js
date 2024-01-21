const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = {
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  image: {
    type: String,
  },
  imageWidth: {
    type: String,
  },
  imageHeight: {
    type: String,
  },
  publish: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
};

const PostSchema = new Schema(post);

module.exports = mongoose.model("posts", PostSchema);
