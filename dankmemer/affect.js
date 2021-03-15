const DankMemer = require("dankmemer");
const Discord = require("discord.js");

const memer = new DankMemer("Dank Memer Api Key");

module.exports = {
  name: "affect",
  description: "It doesn't affect my baby!",

  async execute(message, args) {
    const user = message.mentions.users.first() || message.author;

    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });

    let image = await memer.affect(avatar);
    let attachment = new Discord.MessageAttachment(image, "affect.png");

    return message.channel.send(attachment);
  },
};
