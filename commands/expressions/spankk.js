const Discord = require("discord.js");
const { nonsfw } = require("../../util messages/nsfw");
const client = require("nekos.life");
const neko = new client();

module.exports = {
  name: "spankk",
  description: "Spank someone on the ass!",
  cooldown: 5,

  async execute(client, message, args) {
    if (!message.channel.nsfw) {
      return nonsfw(message);
    }
    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Please mention someone!");
    }

    async function work() {
      let owo = await neko.nsfw.spank();

      const trap = new Discord.MessageEmbed()
        .setDescription(
          `**${message.author.username}** spanked **${user.username}**`
        )
        .setImage(owo.url)
        .setColor("#FF2C4B")
        .setURL(owo.url);
      message.channel.send(trap);
    }
    work();
  },
};
