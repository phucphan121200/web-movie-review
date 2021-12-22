const mongoose = require("mongoose");


const GenreSchema = new mongoose.Schema({
    name: {
      type: String,
      time: true,
      unique: true,
      index: true,
    },
    status: {type: Boolean, default: true}
  },
  { timestamps: true }
);

const Genre = mongoose.model("Genre", GenreSchema);

module.exports = {Genre, GenreSchema};