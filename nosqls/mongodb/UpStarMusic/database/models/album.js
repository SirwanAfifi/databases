const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: String,
  date: Date,
  copiesSold: Number,
  numberOfTracks: Number,
  image: String,
  revenue: Number
});

module.exports = Album;
