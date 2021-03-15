const DankMemer = require("dankmemer");
const Discord = require("discord.js");

const memer = new DankMemer("Dank Memer Api Key");

module.exports = {
  name: "armor",
  description: "Are they still living?",

  async execute(message, args) {
    if (!args) {
      return message.channel.send(
        "<:sh_wait:817144214667132949> You have to write something that the boy will say!"
      );
    }

    let text = args.join(" ");

    let image = await memer.armor(text);
    let attachment = new Discord.MessageAttachment(image, "armor.png");

    return message.channel.send(attachment);
  },
};
