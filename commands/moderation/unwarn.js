const warnModel = require("../../models/warn");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unwarn",
  aliases: [],
  description: "unwarn a member in the server",
  usage: "<member> <warn id> <reason>",
  async execute(client, message, args) {
    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!message.member.permissions.has("MANAGE_ROLES")) {
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );
    } else if (!target) {
      return message.channel.send("Please mention someone!");
    } else if (message.mentions.members.first().id === `521311050193436682`) {
      return message.channel.send(
        "Don't touch my dad <a:sh_daddy:799392400735862825>"
      );
    } else if (target.id === `${message.client.user.id}`) {
      return message.channel.send("Nah bro, im the untouchable ;)");
    }

    const mentionedPosition = target.roles.highest.position;
    const memberPosition = message.member.roles.highest.position;

    if (memberPosition <= mentionedPosition) {
      return message.channel.send(
        "You can't unwarn that member beacuse his highest role is equal/higher than yours"
      );
    }

    const reason = args.slice(2).join(" ");

    const warnDoc = await warnModel
      .findOne({
        guildID: message.guild.id,
        memberID: target.id,
      })
      .catch((err) => console.log(err));

    if (!warnDoc || !warnDoc.warnings.length) {
      return message.channel.send(
        "That member doesn't have any warnings. Continue like that ;)"
      );
    }

    const warningID = parseInt(args[1]);

    if (warningID <= 0 || warningID > warnDoc.warnings.length) {
      return message.channel.send("Please type a valid warning ID");
    }

    warnDoc.warnings.splice(warningID - 1, warningID !== 1 ? warningID - 1 : 1);

    await warnDoc.save().catch((err) => console.log(err));

    let newEmbed = new MessageEmbed()
      .setColor("#8ee680")
      .setDescription(
        `Removed warn \`${warningID}\` from ${target}. ${
          reason ? `Reason: ${reason}` : ""
        }`
      );
    message.channel.send(newEmbed);
  },
};
