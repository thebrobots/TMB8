const Discord = require("discord.js");
const { nonsfw } = require("../../util messages/nsfw");

const client = require('nekos.life');
const neko = new client();

module.exports = {
  name: "traps",
  aliases: ["trap"],
  description: "Is it a boy, or is it a girl <:sh_thinking:818158906824065024>",
  cooldown: 5,

  async execute(client, message, args) {
    if (!message.channel.nsfw) {
      return nonsfw(message);
    }

    async function work() {
      let owo = await neko.nsfw.trap();

      const trap = new Discord.MessageEmbed()
        .setTitle("Is it a boy, or a girl <:sh_thinking:818158906824065024>")
        .setImage(owo.url)
        .setColor("#FF2C4B")
        .setURL(owo.url);
      message.channel.send(trap);
    }

    work();
  },
};
