const createBar = require("../../util messages/string-progressbar");
const { MessageEmbed } = require("discord.js");
const sf = require('seconds-formater');

module.exports = {
  name: "nowplaying",
  aliases: ["np", "now-playing", "current", "current-song"],
  description: "Show current song",
  cooldown: 5,

  async execute(client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel
        .send("<:sh_delete:799677313762983986> There is nothing playing.")
        .catch(console.error);

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

      .setColor("");

    if (song.duration > 0) {
      nowPlaying.setFooter(
        createBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
          " " +
          tpast +
          " " +
          "/" +
          " " +
          time
      );
    } else {
      nowPlaying.setFooter(
        createBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
          " " +
          tpast +
          " " +
          "/" +
          " " +
          "LIVE"
      );
    }

    return message.channel.send(nowPlaying);
  },
};