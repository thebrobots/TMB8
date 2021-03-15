const DankMemer = require("dankmemer");
const Discord = require("discord.js");

const memer = new DankMemer("Dank Memer Api Key");

module.exports = {
  name: "cheating",
  description: "What's the answer to the 3rd question?",

  async execute(message, args) {
    if (!args) {
      return message.channel.send(
        "<:sh_wait:817144214667132949> You need to write something to put on the citation! Separated with 2 commas `,`"
      );
    }

    if (!args.includes(", ,")) {
      let text =
        "COMMA CITATION, Due to wrong structure of the text, you will need to re-send the message, but now separated with commas, COMMAS!!! ";
      let image = await memer.cheating(text);
      let attachment = new Discord.MessageAttachment(image, "cheating.png");
      return message.channel.send(attachment);
    }

    let text = args.join(" ");
    let image = await memer.cheating(text);
    let attachment = new Discord.MessageAttachment(image, "cheating.png");

    return message.channel.send(attachment);
  },
};
