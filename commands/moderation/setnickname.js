const Discord = require("discord.js");

module.exports = {
  name: "setnickname",
  aliases: ["setnick"],
  description: "Set a user nickname.",
  usage: "<user> <nick>",
  async execute(client, message, args) {
    if (!message.member.permissions.has("MANAGE_NICKNAMES")) {
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );
    } else if (!message.guild.me.permissions.has("MANAGE_NICKNAMES")) {
      return message.channel.send(
        "I don't have permissions to manage nicknames!"
      );
    }

    if (!message.mentions.users.size) {
      const user = message.author;

      let nick = args.slice(0).join(" ");
      if (!nick) return message.channel.send("Please type a nickname!");

      let member = message.guild.members.cache.get(user.id);

      const memberPosition = message.member.roles.highest.position;
      const clientPosition = message.guild.me.roles.highest.position;

      if (memberPosition >= clientPosition) {
        return message.channel.send(
          "I can't change your nickname beacuse your highest role is equal/higher than mine"
        );
      }

      await member.setNickname(nick).catch((err) => console.log(err));
      return message.channel.send(
        `Successfully changed your nickname to **${nick}**`
      );
    } else {
      const user = message.mentions.users.first();

      const targetPosition = user.roles.highest.position;
      const memberPosition = message.member.roles.highest.position;
      const clientPosition = message.guild.me.roles.highest.position;

      if (memberPosition <= targetPosition) {
        return message.channel.send(
          "You can't change that member's nickname beacuse his highest role is equal/higher than yours"
        );
      } else if (clientPosition <= targetPosition) {
        return message.channel.send(
          "I can't change that member's nickname beacuse his highest role is equal/higher than mine"
        );
      }

      let nick = args.slice(1).join(" ");
      if (!nick) return message.channel.send("Please type a nickname!");

      let member = message.guild.members.cache.get(user.id);

      await member.setNickname(nick).catch((err) => console.log(err));
      return message.channel.send(
        `Successfully changed **${user.tag}** nickname to **${nick}**`
      );
    }
  },
};
