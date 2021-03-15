module.exports = async (guild) => {
  const prefixModel = require("../models/prefix");

  await prefixModel.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      await prefixModel
        .findOneAndDelete({ Guild: guild.id })
        .then(console.log("deleted data."));
    }
  });
};
