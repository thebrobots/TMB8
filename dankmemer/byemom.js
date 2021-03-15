const DankMemer = require("dankmemer");
const Discord = require("discord.js");

const memer = new DankMemer("Dank Memer Api Key");

module.exports = {
  name: "byemom",
  description: "What you doing son!?",

  async execute(message, args) {
    const user = message.mentions.users.first() || message.author;

    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let usernam = user.username;

    if (!args) {
      return message.channel.send(
        "<:sh_wait:817144214667132949> You have to write something that the person will search!"
      );
    }

    let text = args.shift();

    let image = await memer.byemom(avatar, usernam, text);
    let attachment = new Discord.MessageAttachment(image, "byemom.png");

    return message.channel.send(attachment);
  },
};
