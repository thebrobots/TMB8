const warnModel = require('../../models/warn')
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "warn",
  aliases: [],
  description: "warn a member in the server",
  usage: "<member> <reason>",
  botPerms: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
  userPerms: ["MANAGE_ROLES"],
  async execute(client, message, args) {
    const target =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);

    if (!target) {
      return message.channel.send("Please mention someone!");
    } else if (target.id === message.author.id) {
      return message.channel.send("I can't let you self-harm");
    } else if (target.id === message.guild.owner.id) {
      return message.channel.send("You can't warn the owner of the server >:(");
    } else if (message.mentions.members.first().id === `521311050193436682`) {
      return message.channel.send(
        "Don't touch my dad <a:sh_daddy:799392400735862825>"
      );
    } else if (target.id === `${message.client.user.id}`) {
      return message.channel.send(
        "Rlly trying to make me warn myself!? hipocrite "
      );
    }

    const mentionedPosition = target.roles.highest.position;
    const memberPosition = message.member.roles.highest.position;

    if (memberPosition <= mentionedPosition) {
      return message.channel.send(
        "You can't warn that member beacuse his highest role is equal/higher than yours"
      );
    }

    const reason = args.slice(1).join(" ");

    let warnDoc = await warnModel
      .findOne({
        guildID: message.guild.id,
        memberID: target.id,
      })
      .catch((err) => console.log(err));

    if (!warnDoc) {
      warnDoc = new warnModel({
        guildID: message.guild.id,
        memberID: target.id,
        warnings: [reason],
        date: [Date.now()],
      });

      await warnDoc.save().catch((err) => console.log(err));
    } else {
      warnDoc.warnings.push(reason);
      warnDoc.date.push(Date.now());

      await warnDoc.save().catch((err) => console.log(err));
    }

    let newEmbed = new MessageEmbed()
      .setColor("#e99d69")
      .setDescription(
        `${target} has been warned!  ${reason ? `Reason: ${reason}` : ""}`
      );
    message.channel.send(newEmbed);
  },
};