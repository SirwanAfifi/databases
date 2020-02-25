const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogCommentSchema = new Schema({
  body: String,
  dateTime: Date,
  replies: [this]
});

const BlogComment = mongoose.model("blogComments", BlogCommentSchema);

module.exports = BlogComment;
