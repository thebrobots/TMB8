const DankMemer = require("dankmemer");
const Discord = require("discord.js");

const memer = new DankMemer("Dank Memer Api Key");

module.exports = {
  name: "abandon",
  description: "Make the baby say something!",

  async execute(message, args) {
    let text = args.join(" ");

    if (!args) {
      return message.channel.send(
        "<:sh_wait:817144214667132949> You have to write add something that the baby will say!"
      );
    }

    let image = await memer.abandon(text);
    let attachment = new Discord.MessageAttachment(image, "abandon.png");

    return message.channel.send(attachment);
  },
};
