const { MessageEmbed } = require("discord.js");
const { tmb8_invite } = require("../../json/config.json") 
module.exports = {
  name: "invite",
  description: "Send invite links",
  botPerms: ["EMBED_LINKS"],
  execute(client, message, args) {
    const newEmbed = new MessageEmbed()
      .setColor("#FF2C4B")
      .addField(
        "<:sh_ymf8:820734376894529537> __Add TMB8 to your Server__",
        `[Click here!!](${tmb8_invite})`
      )
      .addField(
        "<:sh_yhf8:820734376714174494> __Add THB8 to your Server__",
        `[Click here!!](${client.invite})`
      )
      .addField(
        "<:sh_discord:799392381854154763> __Join the Support Server__",
        `[Click here!!](${client.support})`
      );
    message.channel.send(newEmbed);
  },
};
