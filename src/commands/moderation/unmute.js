const muteModel = require("../../models/mute");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unmute",
  aliases: ["um"],
  description: "Unmutes a member",
  usage: "<member> <reason>",
  botPerms: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
  userPerms: ["MANAGE_ROLES"],
  async execute(client, message, args) {
    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    const muteRole = message.guild.roles.cache.find((r) => r.name == "Muted");

    if (
      !message.guild.me.permissions.has(["MANAGE_ROLES", "MANAGE_CHANNELS"])
    ) {
      return message.channel.send(
        "I need MANAGE_ROLES and MANAGE_CHANNELS permissions"
      );
    } else if (!muteRole) {
      return message.channel.send(
        "This server doesn't have a `muted` role! The role will be created once you mute someone ;)"
      );
    } else if (!target) {
      return message.channel.send("Please mention someone!");
    } else if (message.mentions.members.first().id === `521311050193436682`) {
      return message.channel.send(
        "Don't touch my dad <a:sh_daddy:799392400735862825>"
      );
    } else if (target.id === `${message.client.user.id}`) {
      return message.channel.send("You will never silence me bitvh ;)");
    }

    const muteDoc = await muteModel.findOne({
      guildID: message.guild.id,
      memberID: target.id,
    });

    if (!muteDoc) {
      return message.channel.send("That member is not muted!");
    } else if (
      target.roles.highest.position >= message.guild.me.roles.highest.position
    ) {
      return message.channel.send(
        "I can't unmute that member beacuse his highest role is equal/higher than mine"
      );
    } else if (muteRole.position >= message.guild.me.roles.highest.position) {
      return message.channel.send(
        "I can't unmute that member beacuse the `Muted` role is higher than mine"
      );
    }

    target.roles.remove(muteRole.id).catch((err) => console.log(err));

    for (const role of muteDoc.memberRoles) {
      target.roles.add(role).catch((err) => console.log(err));
    }

    await muteDoc.deleteOne();

    const reason = args.slice(1).join(" ");

    let newEmbed = new MessageEmbed()
      .setColor("#8ee680")
      .setDescription(
        `${target} has been unmuted!  ${reason ? `Reason: ${reason}` : ""}`
      );
    message.channel.send(newEmbed);
  },
};
