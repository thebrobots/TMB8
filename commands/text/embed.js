const Discord = require("discord.js");

module.exports = {
  name: "embed",
  aliases: ["em"],
  description: "Send an embed",
  usage: `<message>`,
  execute(client, message, args) {
    const sayContent = args.join(" ");
    message.delete();
    const newEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(sayContent);
    message.channel.send(newEmbed);
  },
};
