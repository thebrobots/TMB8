const mongoose = require("mongoose");

const prefix = new mongoose.Schema({
  Guild: String,
  Prefix: String,
});

module.exports = mongoose.model("prefix", prefix);
