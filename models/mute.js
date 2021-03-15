const mongoose = require("mongoose");

const mute = mongoose.Schema({
  guildID: String,
  memberID: String,
  lenght: Date,
  memberRoles: Array,
});

module.exports = mongoose.model("mute", mute);
