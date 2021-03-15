const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "invite",
  description: "Send bot invite link",
  execute(client, message, args) {
    const inviteURL = `https://discord.com/oauth2/authorize?client_id=800074066949832714&scope=bot&permissions=993390022`;
    const inviteURL2 = `https://discord.com/oauth2/authorize?client_id=820636341788344321&scope=bot&permissions=993390022`;
    const newEmbed = new MessageEmbed()
      .setColor("#FF2C4B")
      .setTitle("")
      .setURL("")
      .setDescription("")
      .setImage("")
      .setFooter("")
      .addField(
        "<:sh_ymf8:820734376894529537> __Add YMF8 to your Server__",
        `[Click here!!](${inviteURL2})`
      )
      .addField(
        "<:sh_yhf8:820734376714174494> __Add YHF8 to your Server__",
        `[Click here!!](${inviteURL})`
      )
      .addField(
        "<:sh_discord:799392381854154763> __Join the Support Server__",
        "[Click here!!](https://discord.gg/J8RNPvsKPc)"
      );
    message.channel.send(newEmbed);
  },
};
