const mongoose = require("mongoose");

const kiss = new mongoose.Schema({
  memberID: String,
  memberID2: String,
  kisses: Number,
});

module.exports = mongoose.model("kiss", kiss);
