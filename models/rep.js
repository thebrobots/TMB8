const mongoose = require("mongoose");

const rep = new mongoose.Schema({
  guildID: String,
  memberID: String,
  reps: Number,
});

module.exports = mongoose.model("rep", rep);
