module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Resume currently playing music",
  botPerms: ["USE_EXTERNAL_EMOJIS"],
  async execute(client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message
        .reply("<:sh_delete:799677313762983986> There is nothing playing.")
        .catch(console.error);

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume(true);
      return queue.textChannel
        .send(`<:sh_play:799392398278131712> Resumed the music!`)
        .catch(console.error);
    }

    return message.channel
      .send("<:sh_delete:799677313762983986> The queue is not paused.")
      .catch(console.error);
  },
};
