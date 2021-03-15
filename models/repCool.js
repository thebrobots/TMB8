const mongoose = require("mongoose");

const repcool = new mongoose.Schema({
  guildID: String,
  memberID: String,
  cool: Number,
});

module.exports = mongoose.model("repcool", repcool);
