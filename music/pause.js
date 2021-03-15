const { canModifyQueue } = require("../../util/sharkyUtil");

module.exports = {
  name: "pause",
  description: "Pause the currently playing music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("<:sh_delete:799677313762983986> There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`<:sh_pause:799392368846438460> Paused the music!`).catch(console.error);
    }
  }
};
