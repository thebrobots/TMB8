const Discord = require("discord.js");

module.exports = {
  name: "update",
  description: "Send the latest update details",
  async execute(client, message, args) {
    let newEmbed = new Discord.MessageEmbed()
      .setColor("#FF2C4B")
      .setTitle(
        `<:sh_alarm:816052378075791401> UPDATE 11/03/21 <:sh_alarm:816052378075791401>`
      )
      .setDescription(
        "These are the new features implemented on today's update"
      )
      .addField(
        "Music :/",
        "The music is still not working. We are trying to fix it as soon as possible"
      )
      .addField(
        "Fixed many MANY bugs",
        "We fixed rank card, expression/action commands and a bug that makes the bot send a nsfw attention without any reason"
      )
      .addField(
        "New messages",
        "When you get a badge or levelup, the bot will send a special image ;)"
      )
      .addField(
        "Attention messages",
        "Now, the attention messages as the cooldown or the only nsfw channel will auto delete after 5 sec so they don't fill your chat"
      )
      .addField(`Stay tuned for next updates!!!`, `\u200b`)
      .setFooter("att: elttayman");
    message.channel.send(newEmbed);
  },
};
