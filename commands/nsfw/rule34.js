const Discord = require("discord.js");
const { nonsfw } = require("../../util messages/nsfw");
const booru = require("booru");

module.exports = {
  name: "rule34",
  aliases: ["r34"],
  description:
    "Definition of rule 34: If it exists, there is porn of it. If there isn't, there will be.",
  cooldown: 5,

  async execute(client, message, args) {
    const { nonsfw } = require("../../util messages/nsfw");
    if (!message.channel.nsfw) {
      return nonsfw(message);
    }
    if (
      message.content.toUpperCase().includes("LOLI") ||
      message.content.toUpperCase().includes("GORE")
    )
      return message.channel.send(
        "That kind of stuff is not allowed! Not even in NSFW channels!"
      );

    var query = args.join(" ");
    booru
      .search("rule34", [query], { nsfw: true, limit: 1, random: true })
      .then(booru.commonfy)
      .then((images) => {
        for (let image of images) {
          const trap = new Discord.MessageEmbed()
            .setTitle(`Rule 34 of ${query}`)
            .setImage(image.file_url)
            .setColor("#FF2C4B")
            .setURL(image.file_url);
          message.channel.send(trap);
        }
      })
      .catch((err) => {
          return message.channel.send(`No results found for **${query}**!`);
      });
  },
};
