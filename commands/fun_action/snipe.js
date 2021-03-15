const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "snipe",
  description:
    "Send the last message of an user or the channel you're sending the command in.",
  aliases: ["last-message"],
  async execute(client, message, args) {
    const member = message.mentions.members.first();
    if (!member)
      return message.channel.send("Command Usage: `lastmessage <@user>`");

    const lastMsg = message.guild.member(member).lastMessage;
    if (!lastMsg)
      return message.channel.send(
        "This user's last message could not be found, or they simply may not have sent any messages here."
      );

    const embed = new MessageEmbed()
      .setColor(message.guild.member(member).displayColor)
      .setAuthor(
        member.user.tag,
        member.user.displayAvatarURL({ size: 1024, dynamic: true })
      )
      .setDescription(`*${lastMsg}*`)
      .setFooter(`#${message.channel.name}`)
      .setTimestamp();
    message.channel.send({ embed });
  },
};
