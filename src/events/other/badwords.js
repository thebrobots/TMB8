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
    let word = gu.Words;

    let confirm = false;

    var i;
    for (i = 0; i < word.length; i++) {
      if (message.content.toLowerCase().includes(word[i].toLowerCase()))
        confirm = true;
    }

    if (confirm) {
      await message.delete();
      warnDoc.warnings.push("Posted a blacklisted word");
      warnDoc.date.push(Date.now());
      await warnDoc.save().catch((err) => console.log(err));
    }
  }
};
