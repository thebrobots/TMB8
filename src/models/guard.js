const mongoose = require("mongoose");

const guard = new mongoose.Schema(
  {
    Guild: String,
    Words: Array,
    Invites: Boolean,
    Links: Boolean,
  },
  { versionKey: false }
);

module.exports = mongoose.model("guard", guard);
