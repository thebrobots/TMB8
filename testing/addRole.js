const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "give-role",
  aliases: ["add-role"],
  description: "Give someone a role",
  async execute(message, args) {
    message.delete();

    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const roleName = message.guild.roles.cache.find(
      (r) =>
        r.name === args[1].toString() ||
        r.id === args[1].toString().replace(/[^\w\s]/gi, "")
    );

    if (!message.member.permissions.has("MANAGE_ROLES")) {
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );
    } else if (!target) {
      return message.channel.send("Please mention someone!");
    } else if (!roleName) {
      return message.channel.send("Please mention the role you want to give!");
    }

    try {
      const alreadyHasRole = target._roles.includes(roleName.id);

      if (alreadyHasRole)
        return message.channel
          .send("User already has that role")
          .then((m) => m.delete({ timeout: 5000 }));

      const embed = new MessageEmbed()
        .setAuthor(message.author)
        .setTitle(`Role Name: ${roleName.name}`)
        .setDescription(
          `Successfully added the role ${roleName} to ${target.user}`
        )
        .setColor("f3f3f3")
        .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
        .setFooter(new Date().toLocaleString());

      return target.roles.add(roleName).then(() => message.channel.send(embed));
    } catch (err) {
      return message.channel
        .send("Next time try to give a role that exists...")
        .then((m) => m.delete({ timeout: 5000 }))
        .then(() => console.log(err));
    }
  },
};
