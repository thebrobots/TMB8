const mongoose = require("mongoose");

const mute = mongoose.Schema(
  {
    guildID: String,
    memberID: String,
    lenght: Date,
    memberRoles: Array,
  },
  { versionKey: false }
);

module.exports = mongoose.model("mute", mute);
