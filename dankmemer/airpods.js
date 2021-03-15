const DankMemer = require("dankmemer");
const Discord = require("discord.js");

const memer = new DankMemer("Dank Memer Api Key");

module.exports = {
  name: "airpods",
  description: "Show to the world your brand new airpods!",

  async execute(message, args) {
    const user = message.mentions.users.first() || message.author;

    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });

    let image = await memer.airpods(avatar);
    let attachment = new Discord.MessageAttachment(image, "airpods.png");

    return message.channel.send(attachment);
  },
};
