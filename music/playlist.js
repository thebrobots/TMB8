const { MessageEmbed } = require("discord.js");
const { play } = require("../../include/play");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader").default;
const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID, MAX_PLAYLIST_SIZE, DEFAULT_VOLUME } = require("../../util/sharkyUtil");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
  name: "playlist",
  cooldown: 5,
  async execute( message, args) {
    const { channel } = message.member.voice;
    const serverQueue = message.client.queue.get(message.guild.id);

    const search = args.join(" ");
    const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = pattern.test(args[0]);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: DEFAULT_VOLUME || 100,
      playing: true
    };

    let playlist = null;
    let videos = [];

    if (urlValid) {
      message.channel.send(`**<:sh_search:799392386564227103>  Searching \`${args.join(" ")}\`**`);
      try {
        playlist = await youtube.getPlaylist(url, { part: "snippet" });
        videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 1000, { part: "snippet" });
      } catch (error) {
        console.error(error);
        return message.channel.send("<:sh_delete:799677313762983986> Playlist not found :(").catch(console.error);
      }
    } else if (scdl.isValidUrl(args[0])) {
      if (args[0].includes("/sets/")) {
        message.channel.send(`**<:sh_search:799392386564227103>  Searching \`${args.join(" ")}\`**`);
        playlist = await scdl.getSetInfo(args[0], SOUNDCLOUD_CLIENT_ID);
        videos = playlist.tracks.map((track) => ({
          title: track.title,
          url: track.permalink_url,
          duration: track.duration / 1000
        }));
      }
    } 

    const newSongs = videos.map((video) => {
      return (song = {
        title: video.title,
        url: video.url,
        duration: video.durationSeconds
      });
    });

    
    serverQueue ? serverQueue.songs.push(...newSongs) : queueConstruct.songs.push(...newSongs);

    if (!serverQueue) {
      message.client.queue.set(message.guild.id, queueConstruct);

      try {
        queueConstruct.connection = await channel.join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(error);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`<:sh_nomic:799392379614134324> Could not join the channel: ${error.message}`).catch(console.error);
      }
    }
    
    let playlistEmbed = new MessageEmbed()
      .setAuthor(`${message.author.username} added a playlist`, message.member.user.displayAvatarURL({ dynamic: true }))
      .setTitle(`${playlist.title}`)
      .setDescription(newSongs.map((song, index) => `${index + 1}. ${song.title}`))
      .setURL(playlist.url)
      .setThumbnail(playlist.img)
      .setColor('')
      return message.channel.send(playlistEmbed);


      
  }
};
