const { MessageEmbed } = require("discord.js");
const client = require('nekos.life');
const neko = new client();

module.exports = {
  name: "kiss",
  description: "Kiss someone!",
  async execute(client, message, args) {

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Please mention someone!");
    }

    async function work() {
      let owo = (await neko.sfw.kiss());

    let newEmbed = new MessageEmbed()
      .setDescription(
        `**${message.author.username}** has kissed **${user.username}** ︎(っ˘з(˘⌣˘ )`
      )
      .setColor("#FF2C4B")
      .setImage(owo.url);

    message.channel.send(newEmbed);

  }

  work();
  },
};
