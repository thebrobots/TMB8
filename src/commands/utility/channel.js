const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "channel",
  description: "Displays information about the current channel.",
  usage: "channel",
  aliases: ["channelinfo", "cinfo"],
  botPerms: ["EMBED_LINKS"],
  async execute(client, message, args) {
    const chan = message.channel;

    let topic;
    if (chan.topic && chan.topic.length > 2048)
      topic = "[Too long to display!]";
    else topic = chan.topic;

    const createdTimestamp = moment.utc(chan.createdAt).format("DDMMYYYY");

    const embed = new MessageEmbed()
      .setColor("#FF2C4B")
      .setThumbnail("https://vgy.me/9fSC7k.png")
      .setTitle(`Channel Information for #${chan.name}`)
      .addField("Created", chan.createdAt, true)
      .addField(
        "Age",
        moment(createdTimestamp, "DDMMYYYY").fromNow().slice(0, -4),
        true
      )
      .addField("Type", chan.type.toLowerCase(), true)
      .addField("Position", chan.calculatedPosition, true)
      .addField("Category", !chan.parent ? "None" : chan.parent.name, true)
      .addField("NSFW", chan.nsfw.toString().toLowerCase(), true)
      .addField(" Deletable", chan.deletable.toString().toLowerCase(), true)
      .addField("Topic", !topic ? "No topic set." : topic, true)
      .setFooter(`Channel ID: ${chan.id}`, "https://vgy.me/167efD.png");
    message.channel.send({ embed });
  },
};
