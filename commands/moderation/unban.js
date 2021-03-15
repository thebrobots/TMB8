const userReg = RegExp(/<@!?(\d+)>/);

module.exports = {
  name: "unban",
  aliases: ["ub"],
  description: "Unban a member from the server",
  usage: "<member> <reason>",
  async execute(client, message, args) {
    const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0];
    const target = await message.client.members
      .fetch(userID)
      .catch(() => null);

    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );
    } else if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send("I don't have permissions to ban members");
    } else if (!target) {
      return message.channel.send("Please mention someone!");
    } else if (target.id === message.author.id) {
      return message.channel.send("I can't let you self-harm");
    } else if (target.id === `521311050193436682`) {
      return message.channel.send(
        "Don't touch my dad <a:sh_daddy:799392400735862825>"
      );
    } else if (target.id === `${message.client.user.id}`) {
      return message.channel.send(
        "Rlly trying to make me ban myself!? hipocrite "
      );
    }

    const allBans = await message.guild.fetchBans();
    const bannedUser = allBans.get(target.id);

    if (!bannedUser) {
      message.channel.send("That user is not banned!");
    }

    const reason = args.slice(1).join(" ");

    message.guild.unban(target.id, [reason]).catch((err) => console.log(err));

    let newEmbed = new MessageEmbed()
      .setColor("#8ee680")
      .setDescription(
        `${target.username} has been unbanned! ${
          reason ? `Reason: ${reason}` : ""
        }`
      );
    message.channel.send(newEmbed);
  },
};
