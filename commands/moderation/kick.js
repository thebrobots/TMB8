const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  aliases: ["k"],
  description: "kick a member from the server",
  usage: "<member> <reason>",
  async execute(client, message, args) {
    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!message.member.permissions.has("KICK_MEMBERS")) {
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );
    } else if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.channel.send("I don't have permissions to kick members");
    } else if (!target) {
      return message.channel.send("Please mention someone!");
    } else if (target.id === message.author.id) {
      return message.channel.send("I can't let you self-harm");
    } else if (message.mentions.members.first().id === `521311050193436682`) {
      return message.channel.send(
        "Don't touch my dad <a:sh_daddy:799392400735862825>"
      );
    } else if (target.id === `${message.client.user.id}`) {
      return message.channel.send(
        "Rlly trying to make me kick myself!? hipocrite "
      );
    }

    const targetPosition = target.roles.highest.position;
    const memberPosition = message.member.roles.highest.position;
    const clientPosition = message.guild.me.roles.highest.position;

    if (memberPosition <= targetPosition) {
      return message.channel.send(
        "You can't kick that member beacuse his highest role is equal/higher than yours"
      );
    } else if (clientPosition <= targetPosition) {
      return message.channel.send(
        "I can't kick that member beacuse his highest role is equal/higher than mine"
      );
    }

    const reason = args.slice(1).join(" ");

    try {
      await target.kick([reason]);

      let newEmbed = new MessageEmbed()
        .setColor("#e96969")
        .setDescription(
          `${target} has been kicked! ${reason ? `Reason: ${reason}` : ""}`
        );
      message.channel.send(newEmbed);
    } catch (error) {
      console.log(error);
      message.channel.send("There was an error while kicking thar member :/");
    }
  },
};
