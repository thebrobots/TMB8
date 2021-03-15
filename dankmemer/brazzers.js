const DankMemer = require("dankmemer");
const Discord = require("discord.js");

const memer = new DankMemer("Dank Memer Api Key");

module.exports = {
  name: "brazzers",
  description: "You are on the trending top of the page!",

  async execute(message, args) {
    const user = message.mentions.users.first() || message.author;

    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });

    let image = await memer.brazzers(avatar);
    let attachment = new Discord.MessageAttachment(image, "brazzers.png");

    return message.channel.send(attachment);
  },
};
