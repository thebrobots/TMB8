const DankMemer = require("dankmemer");
const Discord = require("discord.js");

const memer = new DankMemer("Dank Memer Api Key");

module.exports = {
  name: "boo",
  description: "So scary :o",
  async execute(message, args) {
    if (!args) {
      return message.channel.send(
        "<:sh_wait:817144214667132949> You have to write something that the ghost will say! Separated with a comma `,`"
      );
    }

    if (!args.includes(",")) {
      let text = "Separate the text, with a comma!";
      let image = await memer.boo(text);

      let attachment = new Discord.MessageAttachment(image, "boo.png");

      return message.channel.send(attachment);
    }

    let text = args.join(" ");
    let image = await memer.boo(text);
    let attachment = new Discord.MessageAttachment(image, "boo.png");

    return message.channel.send(attachment);
  },
};
