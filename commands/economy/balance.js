const Discord = require("discord.js");

module.exports = {
  name: "balance",
  aliases: ["bal"],
  Description: "Check how much money do you have!",

  async execute(client, message, args) {
    if (message.mentions.users.first()) {
      const user = message.mentions.users.first();

      const bal = (message.guild.id, user.id);

      let newembed = new Discord.MessageEmbed()
        .setColor("#FF2C4B")
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Balance: ${bal} coins`);
      message.channel.send(newembed);
    } else {
      const user = message.author;
      const bal = client.bal(message.guild.id, user.id);

      let newembed = new Discord.MessageEmbed()
        .setColor("#FF2C4B")
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Balance: ${bal} coins`);
      message.channel.send(newembed);
    }
  },
};
