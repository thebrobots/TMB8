const mongoose = require("mongoose");

const command = new mongoose.Schema(
  {
    Guild: String,
    Command: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("command", command);
