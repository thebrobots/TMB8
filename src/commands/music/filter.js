const ytsr = require("youtube-sr");
const { MessageEmbed } = require("discord.js");
const { play } = require("../../include/play");
module.exports = {
  name: "filter",
  description: "Set Audio - Effects",
  aliases: ["f"],
  cooldown: 3,
  botPerms: ["EMBED_LINKS"],
  async execute(client, message, args) {
    if (!message.guild) return;

    const { channel } = message.member.voice;

    const queue = message.client.queue.get(message.guild.id);

    if (message.channel.activeCollector)
      return message.reply("There is a search active!");
    if (!message.member.voice.channel)
      return message.reply("Please join a Voice Channel first");

    if (queue && channel !== message.guild.me.voice.channel)
      return message.reply(`You must be in the same Voice Channel as me`);
    //Define all filters with ffmpeg    https://ffmpeg.org/ffmpeg-filters.html
    const filters = [
      "bass=g=20,dynaudnorm=f=200", //bassboost
      "apulsator=hz=0.08", //8D
      "aresample=48000,asetrate=48000*0.8", //vaporwave
      "aresample=48000,asetrate=48000*1.25", //nightcore
      "aphaser=in_gain=0.4", //phaser
      "tremolo", //tremolo
      "vibrato=f=6.5", //vibrato
      "surround", //surrounding
      "apulsator=hz=1", //pulsator
      "asubboost", //subboost
      "chorus=0.5:0.9:50|60|40:0.4|0.32|0.3:0.25|0.4|0.3:2|2.3|1.3", //chorus of 3
      "stereotools=mlev=0.015625", //karaoke
      "sofalizer=sofa=/path/to/ClubFritz12.sofa:type=freq:radius=2:rotation=5", //sofa
      "silenceremove=window=0:detection=peak:stop_mode=all:start_mode=all:stop_periods=-1:stop_threshold=0", //desilencer
      "remove",
    ];
    //set some temporary variables
    let varforfilter;
    let choice;
    //get user input
    switch (args[0]) {
      case "bassboost":
        varforfilter = 0;
        break;
      case "8D":
        varforfilter = 1;
        break;
      case "vaporwave":
        varforfilter = 2;
        break;
      case "nightcore":
        varforfilter = 3;
        break;
      case "phaser":
        varforfilter = 4;
        break;
      case "tremolo":
        varforfilter = 5;
        break;
      case "vibrato":
        varforfilter = 6;
        break;
      case "surrounding":
        varforfilter = 7;
        break;
      case "pulsator":
        varforfilter = 8;
        break;
      case "subboost":
        varforfilter = 9;
        break;
      case "chorus":
        varforfilter = 10;
        break;
      case "karaoke":
        varforfilter = 11;
        break;
      case "sofa":
        varforfilter = 12;
        break;
      case "desilencer":
        varforfilter = 13;
        break;
      case "clear":
        varforfilter = 14;
        break;
      default:
        //fires if not valid input
        varforfilter = 404;
        message.channel.send(
          new MessageEmbed()
            .setColor("")
            .setTitle("Not a valid Filter, use one of those:")
            .setDescription(
              `
        \`bassboost\`
        \`8D\`
        \`vaporwave\`
        \`nightcore\`
        \`phaser\`
        \`tremolo\`
        \`vibrato\`
        \`surrounding\`
        \`pulsator\`
        \`subboost\`
        \`chorus\`
        \`karaoke\`
        \`sofa (makes audio suitable for earphone/headset)\`
        \`desilencer (removes silence in the song automatically)\`
        \`clear\`   ---  removes all filters`
            )
            .setFooter(`Example: filter bassboost`)
        );
        break;
    }

    choice = filters[varforfilter];
    if (varforfilter === 404) return;
    try {
      const song = queue.songs[0];

      message.channel.send("Applying: " + args[0]).then((msg) => {
        msg.delete({ timeout: 2000 });
      });
      play(song, message, client, choice);
    } catch (error) {
      console.error(error);

      message.channel.activeCollector = false;
    }
  },
};
