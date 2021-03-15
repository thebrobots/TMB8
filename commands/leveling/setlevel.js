const Levels = require("discord-xp");
const { MessageEmbed } = require("discord.js");
const { MONGO_URL } = require("../../util/sharkyUtil");

module.exports = {
  name: "setlevel",
  description: "Change a member's level",
  async execute(client, message, args) {
    Levels.setURL(MONGO_URL);

    let member;
    if (message.mentions.users.first()) {
      member = message.mentions.users.first();
    } else {
      member = message.author;
    }

    let argsLevel;
    if (message.mentions.users.first()) {
      argsLevel = args[1];
    } else {
      argsLevel = args[0];
    }

    const user = await Levels.fetch(member.id, message.guild.id);

    if (user.level > argsLevel) {
      Levels.setLevel(member.id, message.guild.id, `-${argsLevel}`);
    } else {
      Levels.setLevel(member.id, message.guild.id, argsLevel);
    }

    message.channel.send(`Set ${member}'s level to ${argsLevel}`);
  },
};
