const { MessageEmbed } = require("discord.js");
const { play } = require("../../include/play");
const YouTubeAPI = require("simple-youtube-api");
const { getTracks, getPreview } = require("spotify-url-info");
const ytsr = require("ytsr");
const scdl = require("soundcloud-downloader").default;

const youtube = new YouTubeAPI(process.env.yt_api);

module.exports = {
  name: "playlist",
  cooldown: 5,
  botPerms: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
  async execute(client, message, args) {
     const { channel } = message.member.voice;
     const serverQueue = message.client.queue.get(message.guild.id);

     const search = args.join(" ");
     const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
     const spotifyPlaylistPattern =
       /^.*(https:\/\/open\.spotify\.com\/playlist)([^#\&\?]*).*/gi;
     const spotifyPlaylistValid = spotifyPlaylistPattern.test(args[0]);
     const url = args[0];
     const urlValid = pattern.test(args[0]);

     const queueConstruct = {
       textChannel: message.channel,
       channel,
       connection: null,
       songs: [],
       loop: false,
       volume: 100,
       playing: true,
     };

     let playlist = null;
     let videos = [];

     if (spotifyPlaylistValid) {
       message.channel.send(
         `**<:sh_search:799392386564227103>  Searching \`${args.join(
           " "
         )}\`** <:sh_sf:849709940732985416>  `
       );
       try {
         let playlistTrack = await getTracks(url);
         if (playlistTrack > 1000) {
           playlistTrack.length = 1000;
         }
         let spDuration = new Set();
         const spotfiyPl = await Promise.all(
           playlistTrack.map(async (track) => {
             spDuration.add(track.duration_ms);
             let result;
             const ytsrResult = await ytsr(
               `${track.name} - ${track.artists ? track.artists[0].name : ""}`,
               { limit: 1 }
             );
             result = ytsrResult.items[0];
             return (song = {
               title: result.title,
               url: result.url,
               duration: undefined,
               thumbnail: result.thumbnails
                 ? result.thumbnails[0].url
                 : undefined,
             });
           })
         );
         const result = await Promise.all(
           spotfiyPl.filter(
             (song) => song.title != undefined || song.duration != undefined
           )
         );
         videos = result;

         playlist = await getPreview(url);

         playlist.songNum = playlistTrack.length;
         playlist.url = playlist.link;
         playlist.img = playlist.image;
       } catch (err) {
         console.log(err);
         return message.channel.send(err ? err.message : "There was an error!");
       }
     } else if (urlValid) {
       message.channel.send(
         `**<:sh_search:799392386564227103>  Searching \`${args.join(
           " "
         )}\`**<:sh_yt:812732223597838346>  `
       );
       try {
         playlist = await youtube.getPlaylist(url);

         videos = await playlist.getVideos(1000);
       } catch (error) {
         console.error(error);
         return message.channel
           .send("<:sh_delete:799677313762983986> Playlist not found :(")
           .catch(console.error);
       }

       playlist.songNum = playlist.videos.length;
       playlist.img = playlist.thumbnails.maxres.url;
     } else if (scdl.isValidUrl(args[0])) {
       if (args[0].includes("/sets/")) {
         message.channel.send(
           `**<:sh_search:799392386564227103>  Searching \`${args.join(
             " "
           )}\`** <:sh_sc:812734399883116564> `
         );
         playlist = await scdl.getSetInfo(args[0], process.env.sc_id);
         videos = playlist.tracks.map((track) => ({
           title: track.title,
           url: track.permalink_url,
           duration: track.duration / 1000,
         }));
       }
       playlist.songNum = playlist.tracks.length;
       playlist.title = playlist.title;
       playlist.img = playlist.artwork_url;
       playlist.url = playlist.permalink_url;
     }

     const newSongs = videos.map((video) => {
       return (song = {
         title: video.title,
         url: video.url,
         duration: video.durationSeconds,
       });
     });

     serverQueue
       ? serverQueue.songs.push(...newSongs)
       : queueConstruct.songs.push(...newSongs);

     if (!serverQueue) {
       message.client.queue.set(message.guild.id, queueConstruct);

       try {
         queueConstruct.connection = await channel.join();
         await queueConstruct.connection.voice.setSelfDeaf(true);
         play(queueConstruct.songs[0], client, message);
       } catch (error) {
         console.error(error);
         message.client.queue.delete(message.guild.id);
         await channel.leave();
         return message.channel
           .send(
             `<:sh_nomic:799392379614134324> Could not join the channel: ${error.message}`
           )
           .catch(console.error);
       }
     }
     let playlistEmbed = new MessageEmbed()
       .setAuthor(
         `${message.author.username} added a playlist`,
         message.member.user.displayAvatarURL({ dynamic: true })
       )
       .setTitle(`${playlist.title}`)
       .setURL(playlist.url)
       .setThumbnail(playlist.img)
       .addFields({
         name: "Songs",
         value: `${playlist.songNum}`,
         inline: true,
       })
       .setColor("");
     return message.channel.send(playlistEmbed);
  },
};
