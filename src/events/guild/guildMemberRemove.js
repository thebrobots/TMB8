module.exports = async (member) => {

  const warnModel = require("../../models/warn");

  await warnModel.find(
    { guildID: member.guild.id, memberID: member.id },
    async (err, data) => {
      if (err) throw err;
      if (data) {
        await warnModel.deleteMany({
          guildID: member.guild.id,
          memberID: member.id,
        });
      }
    }
  );


};
