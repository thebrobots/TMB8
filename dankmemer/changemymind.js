const DankMemer = require("dankmemer");
const Discord = require("discord.js");

const memer = new DankMemer("Dank Memer Api Key");

module.exports = {
  name: "changemymind",
  description: "Change someone's mind with a beautiful text",

  async execute(message, args) {
    if (!args) {
      return message.channel.send(
        "<:sh_wait:817144214667132949> You need to write something to put on the banner!"
      );
    }

    let text = args.join(" ");
    let image = await memer.changemymind(text);
    let attachment = new Discord.MessageAttachment(image, "changemymind.png");

    return message.channel.send(attachment);
  },
};
