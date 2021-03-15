const DankMemer = require("dankmemer");
const memer = new DankMemer("Dank Memer Api Key");

const Discord = require("discord.js");

module.exports = {
  name: "balloon",
  description: "Nothing is harder than that ;(",

  async execute(message, args) {
    let text = args.join(" ");

    if (!args) {
      return message.channel.send(
        "<:sh_wait:817144214667132949> You have to write something to put on the meme! Separated with a comma `,`"
      );
    }

    if (!args.includes(",")) {
      let text = "Separate the text, with a comma!";
      let image = await memer.balloon(text);
      let attachment = new Discord.MessageAttachment(image, "balloon.png");

      return message.channel.send(attachment);
    }

    let image = await memer.balloon(text);
    let attachment = new Discord.MessageAttachment(image, "balloon.png");

    return message.channel.send(attachment);
  },
};
