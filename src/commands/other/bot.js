const Discord = require("discord.js");

module.exports = {
  name: "bot",
  description: "Send suggestions or feedback directly to the devs",
  cooldown: 15,
  async execute(client, message, args) {
    const query = args[0]?.toLowerCase();
    const sgs = args.slice(1).join(" ");

    if (!query)
      return message.reply(
        "Specify what you want to do `bot suggest`or `bot report` "
      );

    if (query === "suggest") {
      if (!sgs) return message.reply("Please explain the suggestion!");
      const channel = client.channels.cache.get("814969674608410704");

      const webhooks = await channel.fetchWebhooks();
      const webhook = webhooks.first();

      const embed = new Discord.MessageEmbed()
        .setTitle("Suggestion")
        .setColor("#FF2C4B")
        .setDescription(sgs)
        .setFooter(`server: ${message.guild.name}`)
        .setTimestamp(new Date());

      await webhook.send({
        username: message.author.username,
        avatarURL: message.author.displayAvatarURL({ dynamic: true }),
        embeds: [embed],
      });

      return message.channel.send("The suggestion has been sent! thanks ;)");
    }

    if (query === "report") {
      if (!sgs) return message.reply("Please explain the report!");
      const channel = client.channels.cache.get("814969700861739059");

      const webhooks = await channel.fetchWebhooks();
      const webhook = webhooks.first();

      const embed = new Discord.MessageEmbed()
        .setTitle("Bug report")
        .setColor("#FF2C4B")
        .setDescription(sgs)
        .setFooter(`server: ${message.guild.name}`)
        .setTimestamp(new Date());

      await webhook.send({
        username: message.author.username,
        avatarURL: message.author.displayAvatarURL({ dynamic: true }),
        embeds: [embed],
      });

      return message.channel.send("The report has been sent! thanks ;)");
    }
  },
};
