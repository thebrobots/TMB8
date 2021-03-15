const { MessageEmbed } = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = {
  name: "translate",
  description: "Translates a specific text",
  usage: "translate <Language> <Text>",

  async execute(client, message, args) {
    try {
      if (args.length < 2) {
        return message.channel.send("Usage: `translate <Language> <Text>`");
      }

      const result = await translate(args.slice(1).join(" "), { to: args[0] });

      const embed = new MessageEmbed()
        .setTitle("Discord translator")
        .setColor("#FF2C4B")
        .addField(`Translated message [${args[0].toUpperCase()}]`, result.text)
        .addField(
          `Original message [${result.from.language.iso.toUpperCase()}]`,
          args.slice(1).join(" ")
        );
      message.channel.send({ embed });
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\``);
    }
  },
};
