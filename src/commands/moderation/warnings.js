const warnModel = require("../../models/warn");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "warnings",
  aliases: ["warns"],
  description: "Show the warnings of a member",
  usage: "[member]",
  botPerms: ["EMBED_LINKS"],
  async execute(client, message, args) {
    const target =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    const warnDoc = await warnModel
      .findOne({
        guildID: message.guild.id,
        memberID: target.id,
      })
      .catch((err) => console.log(err));

    if (!warnDoc || !warnDoc.warnings.length) {
      return message.channel.send(`${target} doesn't have warnings!`);
    }

    const data = [];

    for (let i = 0; warnDoc.warnings.length > i; i++) {
      data.push(`**ID:** ${i + 1}`);
      data.push(`**Warn:** ${warnDoc.warnings[i]}`);
      data.push(
        `**Date:** ${new Date(warnDoc.date[i]).toLocaleDateString()}\n`
      );
    }

    let newEmbed = new MessageEmbed()
      .setColor("#FF2C4B")
      .setDescription(data.join("\n"));
    message.channel.send(newEmbed);
  },
};
