const { MessageEmbed } = require("discord.js");
const client = require("nekos.life");
const neko = new client();

module.exports = {
  name: "tickle",
  description: "Tickle someone!",
  async execute(client, message, args) {
    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Please mention someone!");
    }

    async function work() {
      let owo = await neko.sfw.tickle();

      let newEmbed = new MessageEmbed()
        .setDescription(
          `**${message.author.username}** started tickling **${user.username}** `
        )
        .setColor("#ffe6FF2C4B5d")
        .setImage(owo.url);
      message.channel.send(newEmbed);
    }

    work();
  },
};
