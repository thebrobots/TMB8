const Discord = require("discord.js");

module.exports = {
  name: "remove-money",
  aliases: ["rmvmn"],
  Description: "Remove an amount of money from someone's balance!",

  async execute(client, message, args) {
    if (message.mentions.users.first()) {
      const user = message.mentions.users.first();

      const amount = args[1];

      if (isNaN(amount)) {
        return message.channel.send("Please type a valid number!");
      }

      client.rmv(message.guild.id, user.id, amount);

      let newembed = new Discord.MessageEmbed()
        .setColor("#FF2C4B")
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(`Succefully removed ${amount} to ${user}'s balance`);
      message.channel.send(newembed);
    } else {
      const user = message.author;

      const amount = args[0];

      if (isNaN(amount)) {
        return message.channel.send("Please type a valid number!");
      }

      client.rmv(message.guild.id, user.id, amount);

      let newembed = new Discord.MessageEmbed()
        .setColor("#FF2C4B")
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(`Succefully removed ${amount} to ${user}'s balance`);
      message.channel.send(newembed);
    }
  },
};
