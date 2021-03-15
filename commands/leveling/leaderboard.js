const Levels = require("discord-xp");
const { MessageEmbed } = require("discord.js");
const { MONGO_URL } = require("../../util/sharkyUtil");

module.exports = {
  name: "leaderboard",
  aliases: ["lb"],
  description: "Show the guild xp leaderboard",
  async execute(client, message, args) {
    Levels.setURL(MONGO_URL);

    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

    if (rawLeaderboard.length < 1)
      return reply(
        "Nobody's in leaderboard yet. Be the first one to climb to the top!"
      );

    const leaderboard = await Levels.computeLeaderboard(
      client,
      rawLeaderboard,
      true
    ); // We process the leaderboard.

    const lb = leaderboard.map(
      (e) => `${e.position}. ${e.username}  LVL ${e.level}`
    ); // We map the outputs.

    let lbEmbed = new MessageEmbed()
      .setColor("#FF2C4B")
      .setTitle(`${message.guild.name}'s leaderboard`)
      .addField(lb.join("\n\n"), `\u200b`);
    message.channel.send(lbEmbed);
  },
};
