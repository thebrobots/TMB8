const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Clear messages from the chat",
  aliases: ["cl"],
  botPerms: ["MANAGE_MESSAGES", "USE_EXTERNAL_EMOJIS"],
  userPerms: ["MANAGE_MESSAGES"],
  async execute(client, message, args) {
    i
    if (!args[0])
      return message.channel.send("Please type a number of messages to delete");
    if (isNaN(args[0])) return message.channel.send("Type a **number**!");

    if (args[0] > 100)
      return message.channel.send(
        "You can only delete a maximum of 100 messages at time!"
      );
    if (args[0] < 1)
      return message.channel.send("Type a number from 1 to 100!");

    await message.delete();
    await message.channel.messages
      .fetch({ limit: args[0] })
      .then((messages) => {
        message.channel.bulkDelete(messages);
      });

    message.channel
      .send(
        `<a:sh_wash:840936684954845205> Correctly clean **${args[0]}** messages!`
      )
      .then((msg) =>
        setTimeout(() => {
          msg.delete();
        }, 5000)
      );
  },
};
