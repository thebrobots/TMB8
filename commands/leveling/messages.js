const Discord = require("discord.js");
const msgModel = require("../../models/messages");

module.exports = {
  name: "messages",
  aliases: ["msg"],
  description: "Show your messages count in the server!",
  async execute(client, message, args) {
    let target;
    if (message.mentions.users.first()) {
      target = message.mentions.users.first();
    } else {
      target = message.author;
    }

    const msgDoc = await msgModel.findOne({
      guildID: message.guild.id,
      memberID: target.id,
    });

    let msgs;
    if (!msgDoc) {
      msgs = 0;
    } else {
      msgs = msgDoc.messages;
    }

    let msgBadges;

    if (msgs < 100) {
      msgBadges =
        `\`${100 - msgs}\`` + " messages to get `bronze messager` badge!";
    } else if (msgs > 100 && msgs < 500) {
      msgBadges =
        `\`${500 - msgs}\`` + " messages to get `silver messager` badge!";
    } else if (msgs > 100 && msgs > 500 && msgs < 1000) {
      msgBadges =
        `\`${1000 - msgs}\`` + " messages to get `golden messager` badge!";
    } else if (msgs > 100 && msgs > 500 && msgs > 1000 && msgs < 5000) {
      msgBadges =
        `\`${5000 - msgs}\`` + " messages to get `diamond messager` badge!";
    }
    let messagesEmbed = new Discord.MessageEmbed()
      .setColor("#FF2C4B")
      .setTitle("<:sh_chat:816782070063431740> Messages")
      .setDescription(
        `${target} has \`${msgs}\` messages!\r\n\r\n${msgBadges}`
      );
    message.channel.send(messagesEmbed);
  },
};
