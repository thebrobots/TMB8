const mongoose = require("mongoose");

const warn = mongoose.Schema(
  {
    guildID: String,
    memberID: String,
    warnings: Array,
    date: Array,
  },
  { versionKey: false }
);

module.exports = mongoose.model("warn", warn);
