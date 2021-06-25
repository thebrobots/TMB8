module.exports = async (guild) => {
  const setup = require("../../models/setup")
  
  await setup.findOneAndDelete({ Guild: guild.id})

  const warnModel = require("../../models/warn");

  await warnModel.find({ guildID: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      await warnModel
        .deleteMany({ guildID: guild.id })
    }
  });

  const muteModel = require("../../models/mute");

  await muteModel.find({ guildID: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      await muteModel
        .deleteMany({ guildID: guild.id })
    }
  });

  console.log(`server: ${guild} | action: leave | blacklisted: false | data: deleted`)
};
