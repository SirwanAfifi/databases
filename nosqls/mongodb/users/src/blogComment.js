const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const treeHelper = require("../utils/treeHelper");

const BlogCommentSchema = new Schema({
  body: String,
  dateTime: { type: Date, default: Date.now },
  replies: [this]
});

BlogCommentSchema.virtual("total").get(function() {
  return treeHelper(this) + 1;
});

const BlogComment = mongoose.model("blogComments", BlogCommentSchema);

module.exports = BlogComment;
