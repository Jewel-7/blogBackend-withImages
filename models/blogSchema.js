const mongoose = require("mongoose");
const uniqid = require("uniqid");

const blogSchema = new mongoose.Schema(
  {
    blogHeader: {
      type: String,
      required: [true, "please enter"],
    },
    blogContent: {
      type: String,
      required: [true, "please enter"],
    },
    imageUrl: {
      type: String,
      required: [true, "please enter"],
    },
    relatedLinks: [{}, {}],
  },
  {
    versionKey: false,
  }
);

const Task = mongoose.model("Data", blogSchema);

module.exports = Task;
