const { MessageEmbed } = require("discord.js");
const { play } = require("../../include/play");
const {
  YOUTUBE_API_KEY,
  SOUNDCLOUD_CLIENT_ID,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_SECRET_ID,
} = require("../../util/sharkyUtil");

const spotifyURI = require("spotify-uri");
const Spotify = require("node-spotify-api");
const spotify = new Spotify({
  id: "a4c2a1737a8e4dfebcf05f740af41a71",
  secret: "5f855852ce9c48159c91e6b54ec62661",
});

const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

const scdl = require("soundcloud-downloader").default;
const sf = require("seconds-formater");

module.exports = {
  name: "play",
  aliases: ["p"],
  description: "Plays song from YouTube or soundcloud",
  cooldown: 1.5,

  async execute(client, message, args) {
    if (!message.guild) return;

    const { channel } = message.member.voice;

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!channel)
      return message.channel
        .send("Join a voice channel first!")
        .catch(console.error);
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.channel
        .send(
          `<:sh_bot:799392372009467935> You must be in the same channel as ${message.client.user}`
        )
        .catch(console.error);
    //If no args return
    if (!args.length)
      return message.channel
        .send(`Usage: play <YouTube URL | Video Name | Soundcloud URL>`)
        .catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send(
        "<:sh_nomic:799392379614134324> Cannot connect to voice channel, missing permissions"
      );
    if (!permissions.has("SPEAK"))
      return message.channel.send(
        "<:sh_nomic:799392379614134324> I cannot speak in this voice channel!"
      );

    const search = args.join(" ");
    const videoPattern =
      /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    const mobileScRegex = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/;
    const spotifyPattern =
      /^.*(https:\/\/open\.spotify\.com\/track)([^#\&\?]*).*/gi;
    const spotifyValid = spotifyPattern.test(args[0]);
    const spotifyPlaylistPattern =
      /^.*(https:\/\/open\.spotify\.com\/playlist)([^#\&\?]*).*/gi;
    const spotifyPlaylistValid = spotifyPlaylistPattern.test(args[0]);

    const url = args[0];
    const urlValid = videoPattern.test(args[0]);

    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.client.commands
        .get("playlist")
        .execute(client, message, args);
    } else if (scdl.isValidUrl(url) && url.includes("/sets/")) {
      return message.client.commands.get("playlist").execute(client, message, args);
    } else if (spotifyPlaylistValid) {
      return message.client.commands.get("playlist").execute(client, message, args);
    }

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      filters: [],
      realseek: 0,
      playing: true,
    };

    let songInfo = null;
    let song = null;

    
    const botch = message.guild.me.voice.channel;

    try {
      if (serverQueue) {
        
        if (spotifyValid) {
          message.channel.send(
            `**<:sh_search:799392386564227103>  Searching \`${args.join(
              " "
            )}\`** <:sh_sf:849709940732985416>  `
          );
        } else if (urlValid) {
          message.channel.send(
            `**<:sh_search:799392386564227103>  Searching \`${args.join(
              " "
            )}\`** <:sh_yt:812732223597838346>  `
          );
        } else if (scRegex.test(url)) {
          message.channel.send(
            `**<:sh_search:799392386564227103>  Searching \`${args.join(
              " "
            )}\`** <:sh_sc:812734399883116564> `
          );
        } else {
          message.channel.send(
            `**<:sh_search:799392386564227103>  Searching \`${args.join(
              " "
            )}\`** <:sh_yt:812732223597838346>  `
          );
        }
      } else if (!botch) {
        queueConstruct.connection = await channel.join();

        message.channel.send(
          `**<:sh_join:812725704437137429> Joined \`${channel.name}\` and <:sh_bound:812725758329487381> bound to \`#${message.channel.name}\`**`
        );

        if (spotifyValid) {
          message.channel.send(
            `**<:sh_search:799392386564227103>  Searching \`${args.join(
              " "
            )}\`** <:sh_sf:849709940732985416>  `
          );
        } else if (urlValid) {
          message.channel.send(
            `**<:sh_search:799392386564227103>  Searching \`${args.join(
              " "
            )}\`**<:sh_yt:812732223597838346>  `
          );
        } else if (scRegex.test(url)) {
          message.channel.send(
            `**<:sh_search:799392386564227103>  Searching \`${args.join(
              " "
            )}\`** <:sh_sc:812734399883116564> `
          );
        } else if (mobileScRegex.test(url)) {
          message.channel.send(
            `**<:sh_search:799392386564227103>  Searching \`${args.join(
              " "
            )}\`** <:sh_sc:812734399883116564> `
          );
        } else {
          message.channel.send(
            `**<:sh_search:799392386564227103>  Searching \`${args.join(
              " "
            )}\`** <:sh_yt:812732223597838346> `
          );
        }

        queueConstruct.connection.voice.setSelfDeaf(true);
      } else if (!serverQueue) {
        queueConstruct.connection = await channel.join();

        if (spotifyValid) {
          message.channel.send(
            `**<:sh_search:799392386564227103>  Searching \`${args.join(
              " "
            )}\`** <:sh_sf:849709940732985416>  `
          );
        } else if (urlValid) {
          message.channel.send(
            `**<:sh_search:799392386564227103>  Searching \`${args.join(
              " "
            )}\`** <:sh_yt:812732223597838346>  `
          );
        } else if (scRegex.test(url)) {
          message.channel.send(
            `**<:sh_search:799392386564227103>  Searching \`${args.join(
              " "
            )}\`** <:sh_sc:812734399883116564> `
          );
        } else {
          message.channel.send(
            `**<:sh_search:799392386564227103>  Searching \`${args.join(
              " "
            )}\`** <:sh_yt:812732223597838346>  `
          );
        }

        queueConstruct.connection.voice.setSelfDeaf(true);
      }
    } catch {}

    if (spotifyValid) {
      let spotifyTitle, spotifyArtist;
      const spotifyTrackID = spotifyURI.parse(url).id;
      const spotifyInfo = await spotify
        .request(`https://api.spotify.com/v1/tracks/${spotifyTrackID}`)
        .catch((err) => {
          return message.channel.send(`Oops... \n` + err);
        });
      spotifyTitle = spotifyInfo.name;
      spotifyArtist = spotifyInfo.artists[0].name;

      try {
        const final = await youtube.searchVideos(
          `${spotifyTitle} - ${spotifyArtist}`,
          1,
          { part: "snippet" }
        );
        songInfo = await ytdl.getInfo(final[0].url);
        song = {
          channel: songInfo.player_response.videoDetails.author,
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds,
          img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0]
            .url,
        };
      } catch (err) {
        console.log(err);
        return message.channel.send(`Oops.. There was an error! \n ` + err);
      }
    } else if (urlValid) {
      try {
        songInfo = await ytdl.getInfo(url);
        song = {
          channel: songInfo.player_response.videoDetails.author,
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds,
          img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0]
            .url,
        };
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      }
    } else if (scRegex.test(url)) {
      try {
        const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
        song = {
          channel: trackInfo.user.username,
          title: trackInfo.title,
          url: trackInfo.permalink_url,
          duration: Math.ceil(trackInfo.duration / 1000),
          img: trackInfo.artwork_url,
        };
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      }
    } else {
      try {
        const results = await youtube.searchVideos(search, 1);
        songInfo = await ytdl.getInfo(results[0].url);
        song = {
          channel: songInfo.player_response.videoDetails.author,
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds,
          img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0]
            .url,
        };
      } catch (error) {
        console.error(error);
        return message.channel.send("No results found!").catch(console.error);
      }
    }

    if (serverQueue) {
      function readTime(t) {
        let s = t % 60;
        t -= s;
        let m = (t / 60) % 60;
        t -= m * 60;
        let h = (t / 3600) % 24;
        if (s <= 9) {
          s = `0${s}`;
        }
        if (m <= 9) {
          m = `0${m}`;
        }
        if (h <= 9) {
          h = `0${h}`;
        }

        if (m <= 0) {
          return `${s} sec`;
        } else if (h <= 0) {
          return `${m}:${s}`;
        } else {
          return `${h}:${m}:${s}`;
        }
      }

      const seek =
        (serverQueue.connection.dispatcher.streamTime -
          serverQueue.connection.dispatcher.pausedTime) /
        1000;
      const seekr = Math.round(seek);
      let estimatedtime = 0;
      for (let i = 0; i < serverQueue.songs.length; i++) {
        estimatedtime += parseInt(serverQueue.songs[i].duration);
      }
      let sqd = estimatedtime - seekr;
      let tleft = readTime(sqd);

      let time;

      if (song.duration > 86400) {
        return message.channel.send(
          "<:sh_delete:799677313762983986> Cannot play a song longer than 1 day"
        );
      } else if (song.duration == 86400) {
        time = sf.convert(song.duration).format("D day");
      } else if (song.duration >= 3600) {
        time = sf.convert(song.duration).format("H:MM:SS");
      } else {
        time = sf.convert(song.duration).format("M:SS");
      }

      serverQueue.songs.push(song);

      const newsong = new MessageEmbed()
        .setAuthor(
          ` ${message.author.username} added a song`,
          message.member.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(`[${song.title}](${song.url})`)
        .setColor("")
        .setThumbnail(song.img)
        .addFields(
          { name: "Channel", value: song.channel, inline: true },
          {
            name: "Song duration",
            value: song.duration == 0 ? "LIVE" : time,
            inline: true,
          },
          { name: "Estimated time until playing", value: tleft, inline: true },
          {
            name: "Position in queue",
            value: `${serverQueue.songs.length - 1}`,
            inline: false,
          }
        );

      return serverQueue.textChannel.send(newsong).catch(console.error);
    }

    queueConstruct.songs.push(song);
    message.client.queue.set(message.guild.id, queueConstruct);

    try {
      play(queueConstruct.songs[0], client, message);
    } catch (error) {
      console.error(error);

      message.client.queue.delete(message.guild.id);

      await channel.leave();
      return message.channel.send(
        `<:sh_nomic:799392379614134324> Could not join the channel: ${error}`
      );
    }
  },
};
