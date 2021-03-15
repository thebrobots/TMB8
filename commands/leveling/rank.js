const Levels = require("discord-xp");
const Canvas = require("discord-canvas"),
  Discord = require("discord.js");
const msgModel = require("../../models/messages");
const { MONGO_URL } = require("../../util/sharkyUtil");

module.exports = {
  name: "rank",
  description: "Show your level card",
  async execute(client, message, args) {
    Levels.setURL(MONGO_URL);

    let target;
    if (message.mentions.users.first()) {
      target = message.mentions.users.first();
    } else {
      target = message.author;
    }

    const repModel = require("../../models/rep");

    const repDoc = await repModel.findOne({
      guildID: message.guild.id,
      memberID: target.id,
    });

    let points;
    if (!repDoc) {
      points = 0;
    } else {
      points = repDoc.reps;
    }

    const msgDoc = await msgModel.findOne({
      guildID: message.guild.id,
      memberID: target.id,
    });

    let messages;

    if (msgDoc) {
      messages = msgDoc.messages;
    } else {
      messages = 0;
    }

    let msgBadges;

    if (messages > 100 && messages < 500) {
      msgBadges = "bronze";
    } else if (messages > 500 && messages < 1000) {
      msgBadges = "silver";
    } else if (messages > 1000 && messages < 5000) {
      msgBadges = "gold";
    } else if (messages > 5000) {
      msgBadges = "diamond";
    }

    const user = await Levels.fetch(target.id, message.guild.id, true);

    if (user) {
      
      const neededXP = Levels.xpFor(parseInt(user.level) + 1);

  

      let image = await new Canvas.RankCard()
        .setAddon("xp", true)
        .setAddon("rank", true)
        .setXP("current", user.xp)
        .setXP("needed", neededXP)
        .setBadge(1, msgBadges)
        .setRank(user.position)
        .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
        .setLevel(user.level)
        .setReputation(points)
        .setRankName("Your text here!")
        .setUsername(`${target.username}#${target.discriminator}`)
        /*
.setBadge(3, "diamond")
.setBadge(5, "silver")
.setBadge(6, "bronze")
*/
        .setBackground("https://i.imgur.com/YRlFuaY.png")
        .toAttachment();

      let attachment = new Discord.MessageAttachment(
        image.toBuffer(),
        "rank-card.png"
      );

      message.channel.send(attachment);
    } else {
     

      let image = await new Canvas.RankCard()
        .setAddon("xp", true)
        .setAddon("rank", true)
        .setXP("current", 0)
        .setXP("needed", 100)
        .setBadge(1, msgBadges)
        .setRank("0")
        .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
        .setLevel(0)
        .setReputation(points)
        .setRankName("Your text here!")
        .setUsername(`${target.username}#${target.discriminator}`)
        /*
  .setCurrentXP(user.xp)
          .setRequiredXP(neededXP)
  .setBadge(1, "gold")
  .setBadge(3, "diamond")
  .setBadge(5, "silver")
  .setBadge(6, "bronze")
  */
        .setBackground("https://i.imgur.com/YRlFuaY.png")
        .toAttachment();

      let attachment = new Discord.MessageAttachment(
        image.toBuffer(),
        "rank-card.png"
      );

      message.channel.send(attachment);
    }
  },
};
