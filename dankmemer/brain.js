const DankMemer = require("dankmemer");
const Discord = require("discord.js");

const memer = new DankMemer("Dank Memer Api Key");

module.exports = {
  name: "brain",
  description: "My brain explodes",

  async execute(message, args) {
    if (!args) {
      return message.channel.send(
        "<:sh_wait:817144214667132949> You have to write something to put on the 4 brain meme! Separated with 3 commas `,`"
      );
    }

    if (!args.includes(", , ,")) {
      let text = "Separate, the text, with 3, commas!";

      let image = await memer.brain(text);
      let attachment = new Discord.MessageAttachment(image, "brain.png");

      return message.channel.send(attachment);
    }

    let text = args.join(" ");
    let image = await memer.brain(text);
    let attachment = new Discord.MessageAttachment(image, "brain.png");

    return message.channel.send(attachment);
  },
};
