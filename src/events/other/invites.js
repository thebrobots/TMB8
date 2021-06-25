const guard = require("../../models/guard");
const warnModel = require("../../models/warn");

module.exports = async (message) => {

  if (message.author.bot) return;
  if (!message.guild) return;
  const gu = await guard.findOne({
    Guild: message.guild.id,
  });

  let warnDoc = await warnModel
    .findOne({
      guildID: message.guild.id,
      memberID: message.author.id,
    })
    .catch((err) => console.log(err));

  warnDoc = new warnModel({
    guildID: message.guild.id,
    memberID: message.author.id,
  });

  if (gu) {
    const enabled = gu.Invites;

    if (enabled === true) {
      if (
        message.content
          .toLowerCase()
          .includes(
            "discord.gg/" ||
              "discordapp.com/invite/" ||
              "discord.com/invite" ||
              ".gg/" ||
              "gg/"
          )
      ) {
        await message.delete();
        warnDoc.warnings.push("Posted an invite link");
        warnDoc.date.push(Date.now());
        await warnDoc.save().catch((err) => console.log(err));
      }
    }
  }
};
