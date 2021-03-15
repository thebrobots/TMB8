const ytdl = require("discord-ytdl-core");
const scdl = require("soundcloud-downloader").default;
const { canModifyQueue } = require("../util/sharkyUtil");
const { MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util messages/attentionembed");
const createBar = require("../util messages/string-progressbar");

module.exports = {
  async play(song, client, message, filters) {
    const { SOUNDCLOUD_CLIENT_ID } = require("../util/sharkyUtil");

    let config;

    try {
      config = require("../config.json");
    } catch (error) {
      config = null;
    }

    const PRUNING = config ? config.PRUNING : process.env.PRUNING;

    const queue = message.client.queue.get(message.guild.id);

    const voiceCh = queue.channel;

    if (!song) {
      setTimeout(function () {
        if (queue.connection.dispatcher && message.guild.me.voice.channel)
          return;
        queue.channel.leave();
        queue.textChannel.send(
          "<:sh_esc:812741612274188348> Don't want to listen more music? Am leaviiing, byeeee!"
        );
      }, 300000);
      queue.textChannel
        .send("<:sh_playlist:799392374869852161> Music queue ended!")
        .catch(console.error);
      return message.client.queue.delete(message.guild.id);
    } else if (voiceCh.members.size === 1) {
      setTimeout(function () {
        if (message.guild.me.voice.channel) return;
        queue.channel.leave();
        queue.textChannel.send(
          "<:sh_esc:812741612274188348>  5 mins alone? Am leaviiing, byeeee!"
        );
        return message.client.queue.delete(message.guild.id);
      }, 10000);
    }

    let stream = null;
    let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
    let isnotayoutube = false;
    let seekTime = 0;
    let oldSeekTime = queue.realseek;
    let encoderArgstoset;
    if (filters === "remove") {
      queue.filters = ["-af", "dynaudnorm=f=200"];
      encoderArgstoset = queue.filters;
      try {
        seekTime =
          (queue.connection.dispatcher.streamTime -
            queue.connection.dispatcher.pausedTime) /
            1000 +
          oldSeekTime;
      } catch {
        seekTime = 0;
      }
      queue.realseek = seekTime;
    } else if (filters) {
      try {
        seekTime =
          (queue.connection.dispatcher.streamTime -
            queue.connection.dispatcher.pausedTime) /
            1000 +
          oldSeekTime;
      } catch {
        seekTime = 0;
      }
      queue.realseek = seekTime;
      queue.filters.push(filters);
      encoderArgstoset = ["-af", queue.filters];
    }

    try {
      if (song.url.includes("youtube.com")) {
        stream = ytdl(song.url, {
          filter: "audioonly",
          opusEncoded: true,
          encoderArgs: encoderArgstoset,
          bitrate: 320,
          seek: seekTime,
          quality: "highestaudio",
          liveBuffer: 40000,
          highWaterMark: 1 << 25,
        });
      } else if (song.url.includes("soundcloud.com")) {
        try {
          stream = await scdl.downloadFormat(
            song.url,
            scdl.FORMATS.OPUS,
            SOUNDCLOUD_CLIENT_ID
          );
        } catch (error) {
          stream = await scdl.downloadFormat(
            song.url,
            scdl.FORMATS.MP3,
            SOUNDCLOUD_CLIENT_ID
          );
          streamType = "unknown";
        }
      } else if (
        song.url.includes(".mp3") ||
        song.url.includes("baseradiode")
      ) {
        stream = song.url;
        isnotayoutube = true;
      }
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      console.error(error);
      return attentionembed(
        message,
        `Error: ${error.message ? error.message : error}`
      );
    }

    queue.connection.on("disconnect", () =>
      message.client.queue.delete(message.guild.id)
    );

    if (isnotayoutube) {
      console.log("TEST");
      const dispatcher = queue.connection
        .play(stream)
        .on("finish", () => {
          if (collector && !collector.ended) collector.stop();

          if (queue.loop) {
            let lastSong = queue.songs.shift();
            queue.songs.push(lastSong);
            module.exports.play(queue.songs[0], message);
          } else {
            queue.songs.shift();
            module.exports.play(queue.songs[0], message);
          }
        })
        .on("error", (err) => {
          console.error(err);
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        });
      dispatcher.setVolumeLogarithmic(queue.volume / 100);
    } else {
      const dispatcher = queue.connection
        .play(stream, { type: streamType })
        .on("finish", () => {
          if (collector && !collector.ended) collector.stop();

          if (queue.loop) {
            let lastSong = queue.songs.shift();
            queue.songs.push(lastSong);
            module.exports.play(queue.songs[0], message);
          } else {
            queue.songs.shift();
            module.exports.play(queue.songs[0], message);
          }
        })
        .on("error", (err) => {
          console.error(err);
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        });
      dispatcher.setVolumeLogarithmic(queue.volume / 100);
    }

    try {
      let message = `<:sh_music:799392370164236308> **Started playing** \`${song.title}\``;
      var playingMessage = await queue.textChannel.send(message);
      await playingMessage.react("<:sh_skip:799392380750659604>");
      await playingMessage.react("<:sh_pause:799392368846438460>");
      await playingMessage.react("<:sh_mute:799392371267338260>");
      await playingMessage.react("<:sh_lowvol:799392393619177514>");
      await playingMessage.react("<:sh_vol:799392383997444117>");
      await playingMessage.react("<:sh_shuffle:799392378497925130>");
      await playingMessage.react("<:sh_loop:799392367681208330>");
      await playingMessage.react("<:sh_stop:799392388576968724>");
      await playingMessage.react("<:sh_np:812824625720590367>");
    } catch (error) {
      console.error(error);
    }

    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000,
    });

    collector.on("collect", async (reaction, user) => {
      if (!queue) return;
      const member = message.guild.member(user);

      switch (reaction.emoji.name) {
        case "sh_skip":
          queue.playing = true;
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.connection.dispatcher.end();
          queue.textChannel
            .send(`<:sh_skip:799392380750659604> Skipped the song!`)
            .catch(console.error);
          collector.stop();
          break;

        case "sh_pause":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if (queue.playing) {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.pause(true);
            queue.textChannel
              .send(`<:sh_pause:799392368846438460> Paused the music!`)
              .catch(console.error);
          } else {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.resume();
            queue.textChannel
              .send(`<:sh_play:799392398278131712> Resumed the music!`)
              .catch(console.error);
          }
          break;

        case "sh_mute":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if (queue.volume <= 0) {
            queue.volume = 100;
            queue.connection.dispatcher.setVolumeLogarithmic(100 / 100);
            queue.textChannel
              .send(`<:sh_vol:799392383997444117> Unmuted the music!`)
              .catch(console.error);
          } else {
            queue.volume = 0;
            queue.connection.dispatcher.setVolumeLogarithmic(0);
            queue.textChannel
              .send(`<:sh_mute:799392371267338260> Muted the music!`)
              .catch(console.error);
          }
          break;

        case "sh_lowvol":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member) || queue.volume == 0) return;
          if (queue.volume - 10 <= 0) queue.volume = 0;
          else queue.volume = queue.volume - 10;
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
          queue.textChannel
            .send(
              `<:sh_lowvol:799392393619177514> Set the volume to ${queue.volume}%`
            )
            .catch(console.error);
          break;

        case "sh_vol":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member) || queue.volume == 100) return;
          if (queue.volume + 10 >= 100) queue.volume = 100;
          else queue.volume = queue.volume + 10;
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
          queue.textChannel
            .send(
              `<:sh_vol:799392383997444117> Set the volume to ${queue.volume}%`
            )
            .catch(console.error);
          break;

        case "sh_shuffle":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          let songs = queue.songs;
          for (let i = songs.length - 1; i > 1; i--) {
            let j = 1 + Math.floor(Math.random() * i);
            [songs[i], songs[j]] = [songs[j], songs[i]];
          }
          queue.textChannel
            .send(`<:sh_shuffle:799392378497925130> Shuffled the queue!`)
            .catch(console.error);
          break;

        case "sh_loop":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.loop = !queue.loop;
          queue.textChannel
            .send(
              `<:sh_loop:799392367681208330> Loop is now ${
                queue.loop ? "**on**!" : "**off*!*"
              }`
            )
            .catch(console.error);
          break;

        case "sh_np":
          reaction.users.remove(user).catch(console.error);
          const song = queue.songs[0];
          const seek =
            (queue.connection.dispatcher.streamTime -
              queue.connection.dispatcher.pausedTime) /
            1000;

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
              return `${s}s`;
            } else if (h <= 0) {
              return `${m}:${s}`;
            } else {
              return `${h}:${m}:${s}`;
            }
          }
          const seekr = Math.round(seek);

          let tpast;

          if (seek < 10) {
            tpast = Math.round(seek) + "s";
          } else {
            tpast = readTime(seekr);
          }

          let time;

          if (song.duration == 86400) {
            time = sf.convert(song.duration).format("D day");
          } else if (song.duration >= 3600) {
            time = sf.convert(song.duration).format("H:MM:SS");
          } else {
            time = sf.convert(song.duration).format("M:SS");
          }

          let nowPlaying = new MessageEmbed()
            .setDescription(`[${song.title}](${song.url})`)

            .setColor("#ffe65d")

          if (song.duration > 0) {
            nowPlaying.setFooter(
              createBar(
                song.duration == 0 ? seek : song.duration,
                seek,
                20
              )[0] +
                " " +
                tpast +
                " " +
                "/" +
                " " +
                time
            );
          } else {
            nowPlaying.setFooter(
              createBar(
                song.duration == 0 ? seek : song.duration,
                seek,
                20
              )[0] +
                " " +
                tpast +
                " " +
                "/" +
                " " +
                "LIVE"
            );
          }

          return message.channel.send(nowPlaying);
          break;

        case "sh_stop":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.songs = [];
          queue.textChannel
            .send(`<:sh_stop:799392388576968724> Stopped the music!`)
            .catch(console.error);
          try {
            queue.connection.dispatcher.end();
          } catch (error) {
            console.error(error);
            queue.connection.disconnect();
          }
          collector.stop();
          break;

        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
    });

    collector.on("end", () => {
      playingMessage.reactions.removeAll().catch(console.error);
      if (PRUNING && playingMessage && !playingMessage.deleted) {
        playingMessage.delete({ timeout: 3000 }).catch(console.error);
      }
    });
  },
};
