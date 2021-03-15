const muteModel = require("../../models/mute");
const ms = require("ms");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  aliases: ["m"],
  description: "Mutes a member",
  usage: "<member> <time> [reason]",
  async execute(client, message, args) {
    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    const msRegex = RegExp(/(\d+(s|m|h|w))/);
    let muteRole = message.guild.roles.cache.find((r) => r.name == "Muted");

    if (!message.member.permissions.has("MANAGE_ROLES")) {
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );
    } else if (
      !message.guild.me.hasPermission(["MANAGE_ROLES", "MANAGE_CHANNELS"])
    ) {
      return message.channel.send(
        "I need MANAGE_ROLES and MANAGE_CHANNELS permissions"
      );
    } else if (!target) {
      return message.channel.send("Please mention someone!");
    } else if (!msRegex.test(args[1])) {
      return message.channel.send("Enter a valid amount of time");
    } else if (target.id === message.author.id) {
      return message.channel.send("I can't let you self-harm");
    } else if (message.mentions.members.first().id === `521311050193436682`) {
      return message.channel.send(
        "Don't touch my dad <a:sh_daddy:799392400735862825>"
      );
    } else if (target.id === `${message.client.user.id}`) {
      return message.channel.send("You will never silence me bitch ;) ");
    }

    if (!muteRole) {
      muteRole = await message.guild.roles
        .create({
          data: {
            name: "Muted",
            color: "RED",
          },
        })
        .catch((err) => console.log(err));
    }
    if (
      target.roles.highest.position >= message.guild.me.roles.highest.position
    ) {
      return message.channel.send(
        "I can't mute that member beacuse his highest role is equal/higher than mine"
      );
    } else if (muteRole.position >= message.guild.me.roles.highest.position) {
      return message.channel.send(
        "I can't mute that member beacuse the `Muted` role is higher than mine"
      );
    } else if (ms(msRegex.exec(args[1])[1]) > 2592000000) {
      return message.channel.send("You can't mute a member more than a month");
    }

    const isMuted = await muteModel.findOne({
      guildID: message.guild.id,
      memberID: target.id,
    });

    if (isMuted) {
      return message.channel.send("That member is alredy muted");
    }

    for (const channel of message.guild.channels.cache) {
      channel[1]
        .updateOverwrite(muteRole, {
          SEND_MESSAGES: false,
          CONNECT: true,
          TALK: false,
        })
        .catch((err) => console.log(err));
    }

    const noEveryone = target.roles.cache.filter((r) => r.name !== "@everyone");

    await target.roles.add(muteRole.id).catch((err) => console.log(err));

    for (const role of noEveryone) {
      await target.roles.remove(role[0]).catch((err) => console.log(err));
    }

    const muteDoc = new muteModel({
      guildID: message.guild.id,
      memberID: target.id,
      lenght: Date.now() + ms(msRegex.exec(args[1])[1]),
      memberRoles: noEveryone.map((r) => r),
    });

    await muteDoc.save().catch((err) => console.log(err));

    const reason = args.slice(2).join(" ");

    let newEmbed = new MessageEmbed()
      .setColor("#e96969")
      .setDescription(
        `${target} has been muted for **${msRegex.exec(args[1])[1]}**! ${
          reason ? `Reason: ${reason}` : ""
        }`
      );
    message.channel.send(newEmbed);
  },
};
