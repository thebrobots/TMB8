const DankMemer = require("dankmemer");
const Discord = require("discord.js");

const memer = new DankMemer("Dank Memer Api Key");

module.exports = {
  name: "bed",
  description: "Bro things ;)!",

  async execute(message, args) {
    const user = message.mentions.users.first();
    const user2 = message.author;

    if (!user) {
      return message.channel.send(
        "<:sh_wait:817144214667132949> You have to mention someone!"
      );
    }

    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let avatar2 = user2.displayAvatarURL({ dynamic: false, format: "png" });

    let image = await memer.bed(avatar, avatar2);
    let attachment = new Discord.MessageAttachment(image, "bed.png");

    return message.channel.send(attachment);
  },
};
