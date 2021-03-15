const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Clear messages from the chat",
  aliases: ["cl"],
  async execute(client, message, args) {
    if (message.member.permissions.has("MANAGE_MESSAGES")) {
      if (!args[0])
        return message.channel.send(
          "Please type a number of messages to delete <a:ppvaso:794219080630140959>"
        );
      if (isNaN(args[0])) return message.channel.send("Type a **number**!");

      if (args[0] > 100)
        return message.channel.send(
          "You can only delete a maximum of 100 messages at time!"
        );
      if (args[0] < 1)
        return message.channel.send("Type a number from 1 to 100!");

      await message.channel.messages
        .fetch({ limit: args[0] })
        .then((messages) => {
          message.channel.bulkDelete(messages);
        });

      let newEmbed = new MessageEmbed()
        .setColor("#FF2C4B")
        .setTitle("")
        .setURL("")
        .setDescription(
          `<:sh_clear:799392396517310464> Correctly deleted **${args[0]}** messages!`
        )
        .setImage("")
        .setFooter("");

      message.channel.send(newEmbed).then((r) => r.delete({ timeout: 10000 }));
    } else {
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );
    }
  },
};
