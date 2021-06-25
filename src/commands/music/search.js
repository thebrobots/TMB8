const YouTube = require("youtube-sr").default;
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "search",
  description: "Search and select videos to play",
  aliases: ["s"],
  cooldown: 3,
  botPerms: ["EMBED_LINKS"],
  async execute(client, message, args) {
    const { channel } = message.member.voice;
    //get serverqueue
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!args.length)
      return message.channel.send(
        `Usage: ${message.client.prefix}${module.exports.name} <Video Name>`
      );
    //if there is already a search return error
    if (message.channel.activeCollector)
      return message.channel.send("There is a search active!");
    //if the user is not in a voice channel return error
    if (!message.member.voice.channel)
      return message.channel.send("Please join a Voice Channel first");
    //If not in the same channel return error
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.channel.send(
        `You must be in the same Voice Channel as me`
      );
    //define search
    const search = args.join(" ");

    let resultsEmbed = new MessageEmbed()
      .setColor("")
      .setTitle(`Results for ${search}`)
      .setFooter("Type a number betwwen 1-10");

    try {
      const results = await YouTube.search(search, { limit: 10 });

      results.map((video, index) =>
        resultsEmbed.addField(
          `\u200b`,
          `[${index + 1}. ${video.title}](${video.url})`
        )
      );

      const resultsMessage = await message.channel.send(resultsEmbed);

      message.channel.activeCollector = true;

      let response;
      await message.channel
        .awaitMessages((m) => m.author.id == message.author.id, {
          max: 1,
          time: 60000,
          errors: ["time"],
        })
        .then((collected) => {
          let first = collected.first();
          if (first.content == "1") {
            return (response = 1);
          }
          if (first.content == "2") {
            return (response = 2);
          }
          if (first.content == "3") {
            return (response = 3);
          }
          if (first.content == "4") {
            return (response = 4);
          }
          if (first.content == "5") {
            return (response = 5);
          }
          if (first.content == "6") {
            return (response = 6);
          }
          if (first.content == "7") {
            return (response = 7);
          }
          if (first.content == "8") {
            return (response = 8);
          }
          if (first.content == "9") {
            return (response = 9);
          }
          if (first.content == "10") {
            return (response = 10);
          } else {
            return;
          }
        });

      const choice = resultsEmbed.fields[parseInt(response) - 1].name;

      message.channel.activeCollector = false;

      message.client.commands.get("play").execute(client, message, args);

      resultsMessage.delete().catch(console.error);
    } catch (error) {
      console.error(error);

      message.channel.activeCollector = false;
    }
  },
};
