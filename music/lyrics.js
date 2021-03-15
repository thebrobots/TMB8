const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Get lyrics for the currently playing song",
  async execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    

    let lyrics = null;

    if(!args[0]) {
    try {
      if (!queue) return message.channel.send("<:sh_delete:799677313762983986> There is nothing playing.").catch(console.error);
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `<:sh_ly:799392375394795571> No lyrics found for ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `<:sh_ly:799392375394795571> No lyrics found for ${queue.songs[0].title}.`;
    }
   }
   else {
    try {
      lyrics = await lyricsFinder(args[0], "");
      if (!lyrics) lyrics = `<:sh_ly:799392375394795571> No lyrics found for ${args.join(' - ')}.`;
    } catch (error) {
      lyrics = `<:sh_ly:799392375394795571> No lyrics found for ${args.join(' - ')}.`;
    }
   }
    let lyricsEmbed = new MessageEmbed()
      .setTitle(`${args.join(' - ')}`)
      .setDescription(lyrics)
      .setColor('')
  

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};