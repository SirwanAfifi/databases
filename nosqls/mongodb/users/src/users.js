const mongoose = require("mongoose");
const PostSchema = require("./post");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: "Name must be longer 2 characters."
    },
    required: [true, "Name is required."]
  },
  postCount: {
    type: Number
  },
  posts: [PostSchema]
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
