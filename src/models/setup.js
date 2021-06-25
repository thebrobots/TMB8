const mongoose = require("mongoose");

const setup = new mongoose.Schema(
  {
    Guild: String,
    Prefix: String,
    Pruning: Boolean,
    Sgchannel: String,
    Cpchannel: String,
    Cbchannel: String,
    Lvlchannel: String,
    Logchannel: String,
    Onlychannel: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("setup", setup);
