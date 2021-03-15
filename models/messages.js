const mongoose = require("mongoose");

const msg = new mongoose.Schema({
  guildID: String,
  memberID: String,
  messages: Number,
});

module.exports = mongoose.model("msg", msg);
