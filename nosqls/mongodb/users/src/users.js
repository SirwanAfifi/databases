const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."]
  },
  postCount: {
    type: Number
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
