
module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Skip the currently playing song",
  botPerms: ["USE_EXTERNAL_EMOJIS"],
  async execute(client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message
        .reply(
          "<:sh_delete:799677313762983986> There is nothing playing that I could skip for you."
        )
        .catch(console.error);

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel
      .send(`<:sh_skip:799392380750659604> Skipped the song`)
      .catch(console.error);
  },
};
