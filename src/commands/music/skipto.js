
module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Skip to the selected queue number",
  botPerms: ["USE_EXTERNAL_EMOJIS"],
  async execute(client, message, args) {
    if (!args.length || isNaN(args[0]))
      return message.channel
        .send(
          `Usage: ${message.client.prefix}${module.exports.name} <Queue Number>`
        )
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel
        .send("<:sh_delete:799677313762983986> There is no queue.")
        .catch(console.error);

    if (args[0] > queue.songs.length)
      return message.channel
        .send(
          `<:sh_playlist:799392374869852161>  The queue is only ${queue.songs.length} songs long!`
        )
        .catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }

    queue.connection.dispatcher.end();
    queue.textChannel
      .send(`<:sh_skip:799392380750659604> Skipped ${args[0] - 1} songs`)
      .catch(console.error);
  },
};
