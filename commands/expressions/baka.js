const { MessageEmbed } = require("discord.js");
const client = require("nekos.life");
const neko = new client();

module.exports = {
  name: "baka",
  description: "STUPID!",
  async execute(client, message, args) {
    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Please mention someone!");
    }

    async function work() {
      let owo = await neko.sfw.baka();

      let newEmbed = new MessageEmbed()
        .setDescription(`**BBAKAAAAAA**${user.username}** ୧༼ಠ益ಠ༽୨`)
        .setColor("#FF2C4B")
        .setImage(owo.url);
      message.channel.send(newEmbed);
    }

    work();
  },
};
