
module.exports = {
  name: "loop",
  aliases: ["l"],
  description: "Toggle music loop",
  async execute(client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel
        .send("<:sh_delete:799677313762983986> There is nothing playing.")
        .catch(console.error);
  

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(
        `<:sh_loop:799392367681208330> Loop is now ${
          queue.loop ? "**on**" : "**off**"
        }`
      )
      .catch(console.error);
  },
};
