const guard = require("../../models/guard");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "word",
  description: "Manage bad words of the server",
  subCommands: ["add", "remove", "list"],
  userPerms: ["MANAGE_GUILD"],
  botPerms: ["EMBED_LINKS"],
  async execute(client, message, args) {
    let action = args[0]?.toLowerCase();
    let input = args[1]?.toLowerCase();

    let bw = await guard.findOne({
      Guild: message.guild.id,
    });
    if (!bw) {
      bw = new guard({
        Guild: message.guild.id,
      });
    }

    if (!action)
      return message.reply("What do you want to do? (add, remove, list)");

    if (action === "add") {
      words = bw.Words;

      if (!input)
        return message.reply("please type what word you want to blacklist");

      await words.push(input);
      await bw.save().catch((e) => console.log(e));
      return message.reply(`Added \`${input}\` to the bad words list`);
    }

    if (action === "remove") {
      words = bw.Words;

      if (!input)
        return message.reply(
          "please type what word you want to remove from the list"
        );
      let yes = words.includes(input);
      if (!yes) return message.reply("That word is not blacklisted");

      const index = words.indexOf(input);
      if (index > -1) {
        words.splice(index, 1);
      }
      await bw.save().catch((e) => console.log(e));
      return message.reply(`Removed \`${input}\` from the bad words list`);
    }

    if (action === "list") {
      words = bw.Words;
      const data = [];

      for (let i = 0; words.length > i; i++) {
        data.push(`${words[i]}`);
      }

      let newEmbed = new MessageEmbed()
        .setColor("#FF2C4B")
        .setDescription(data.join("\n"));
      message.channel.send(newEmbed);
    }
  },
};
