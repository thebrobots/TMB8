module.exports = {
  name: "leave",
  description: "Leave the current channel",
  botPerms: ["USE_EXTERNAL_EMOJIS"],
  async execute(client, message, args) {
    const { channel } = message.member.voice;
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!channel)
      return message
        .reply("You need to join a voice channel first!")
        .catch(console.error);
    if (!message.guild.me.voice.channel)
      return message.reply("I am not in a voice channel!").catch(console.error);
    if (channel.id !== message.guild.me.voice.channel.id)
      return message
        .reply(
          `<:sh_bot:799392372009467935> You must be in the same channel as ${message.client.user}#${mesage.client.discriminator}`
        )
        .catch(console.error);
    if (serverQueue) {
      serverQueue.connection.dispatcher.destroy();
      channel.leave();
      message.client.queue.delete(message.guild.id);
      serverQueue.textChannel
        .send("<:sh_esc:812741612274188348> Am leaviiing, byeeee!")
        .catch(console.error);
      return;
    }
    channel.leave();

    message.client.queue.delete(message.guild.id);
    message.channel
      .send("<:sh_esc:812741612274188348> Am leaviiing, byeeee!")
      .catch(console.error);
  },
};
    