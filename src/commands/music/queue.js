const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  cooldown: 7,
  aliases: ["q"],
  description: "Show the music queue and now playing.",
  botPerms: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS", "MANAGE_MESSAGES"],
  async execute(client, message, args) {
  
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel.send(
        "<:sh_delete:799677313762983986> **Nothing playing in this server**"
      );

    let currentPage = 0;
    const embeds = generateQueueEmbed(message, queue.songs);

    const queueEmbed = await message.channel.send(
      `**Current Page - ${currentPage + 1}/${embeds.length}**`,
      embeds[currentPage]
    );

    try {
      await queueEmbed.react("<:sh_left:799392382549753877>");
      await queueEmbed.react("<:sh_right:799392391210991626>");
    } catch (error) {
      console.error(error);
      message.channel.send(error.message).catch(console.error);
    }

    const filter = (reaction, user) =>
      ["sh_left", "sh_right"].includes(reaction.emoji.name) &&
      message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, {
      time: 60000,
    });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "sh_right") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(
              `**Current Page - ${currentPage + 1}/${embeds.length}**`,
              embeds[currentPage]
            );
          }
        } else if (reaction.emoji.name === "sh_left") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(
              `**Current Page - ${currentPage + 1}/${embeds.length}**`,
              embeds[currentPage]
            );
          }
        }
        await reaction.users.remove(message.author.id);
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      }
    });
  },
};

function generateQueueEmbed(message, queue) {
  let embeds = [];
  let k = 10;

  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;

    const info = current.map((track) => `${++j} - [${track.title}](${track.url})`).join("\n");

    const embed = new MessageEmbed()
      .setTitle("Song Queue\n")
      .setThumbnail(message.guild.iconURL())
      .setColor('')
      .setDescription(`**Current Song - [${queue[0].title}](${queue[0].url})**\n\n${info}`)
      .setTimestamp();
    embeds.push(embed);
  }

  return embeds;
}
