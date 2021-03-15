const { canModifyQueue } = require("../../util/sharkyUtil");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Resume currently playing music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("<:sh_delete:799677313762983986> There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`<:sh_play:799392398278131712> Resumed the music!`).catch(console.error);
    }

    return message.channel.send("<:sh_delete:799677313762983986> The queue is not paused.").catch(console.error);
  }
};
