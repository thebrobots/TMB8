const move = require("array-move");
const { canModifyQueue } = require("../../util/sharkyUtil");

module.exports = {
  name: "move",
  aliases: ["mv"],
  description: "Move songs around in the queue",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("<:sh_delete:799677313762983986> There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.channel.send(`Usage: ${message.client.prefix}move <Queue Number>`);
    if (isNaN(args[0]) || args[0] <= 1) return message.reply(`Usage: ${message.client.prefix}move <Queue Number>`);

    let song = queue.songs[args[0] - 1];

    queue.songs = move(queue.songs, args[0] - 1, args[1] == 1 ? 1 : args[1] - 1);
    queue.textChannel.send(
      `<:sh_truck:799392385049427988> Moved **${song.title}** to ${args[1] == 1 ? 1 : args[1] - 1} in the queue.`
    );
  }
};