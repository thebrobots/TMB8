const { canModifyQueue } = require("../../util/sharkyUtil");

module.exports = {
  name: "shuffle",
  description: "Shuffle queue",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("<:sh_delete:799677313762983986> There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    message.client.queue.set(message.guild.id, queue);
    queue.textChannel.send(`<:sh_shuffle:799392378497925130> Shuffled the queue`).catch(console.error);
  }
};
