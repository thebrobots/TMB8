
module.exports = {
  name: "pause",
  description: "Pause the currently playing music",
  botPerms: ["USE_EXTERNAL_EMOJIS"],
  async execute(client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel
        .send("<:sh_delete:799677313762983986> There is nothing playing.")
        .catch(console.error);

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel
        .send(`<:sh_pause:799392368846438460> Paused the music!`)
        .catch(console.error);
    }
  },
};
