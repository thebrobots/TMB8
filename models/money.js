const mongoose = require("mongoose");

const money = new mongoose.Schema({
  guild: String,
  id: String,
  money: String,
});

module.exports = mongoose.model("money", money);
