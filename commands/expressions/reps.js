const repModel = require("../../models/rep");
const Discord = require("discord.js");
module.exports = {
  name: "reputations",
  aliases: ["reps", "rep-points"],
  description: "See someone`s reputation points!",
  async execute(client, message, args) {
    let user;
    if (message.mentions.members.first()) {
      user = message.mentions.members.first();
    } else {
      user = message.author;
    }

    const repDoc = await repModel.findOne({
      guildID: message.guild.id,
      memberID: user.id,
    });

    let points;
    if (!repDoc) {
      points = 0;
    } else {
      points = repDoc.reps;
    }

    let rep = new Discord.MessageEmbed()
      .setTitle("<:sh_reps:816052337189322754> Reputation Points")
      .addField("User", `${user}`)
      .addField("Points", `${points}`)
      .setColor("#FF2C4B")

    message.channel.send(rep);
  },
};
