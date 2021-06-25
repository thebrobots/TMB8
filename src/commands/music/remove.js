
 
const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/g;

module.exports = {
  name: "remove",
  aliases: ["rm"],
  description: "Remove song from the queue",
   botPerms: ["USE_EXTERNAL_EMOJIS"],
  async execute(client, message, args, prefix) {
    
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(" <:sh_delete:799677313762983986> There is no queue.").catch(console.error);

      let pr = prefix
      

    if (!args.length) return message.channel.send(`Usage: ${pr}remove <song number>`);

    const arguments = args.join("");
    const songs = arguments.split(",").map((str) => str.trim());
    let removed = [];

    if (pattern.test(arguments) && songs.every((value) => value < queue.songs.length)) {
      queue.songs = queue.songs.filter((item, index) => {
        if (songs.every((value) => value - 1 != index)) {
          return true;
        } else {
          removed.push(item);
        }
      });

      queue.textChannel.send(
        ` <:sh_clear:799392396517310464> removed **${removed.map((song) => song.title).join("\n")}** from the queue.`
      );
    } else if (!isNaN(args[0]) && args[0] >= 1 && args[0] < queue.songs.length) {
      return queue.textChannel.send(
        ` <:sh_clear:799392396517310464> removed **${queue.songs.splice(args[0] - 1, 1)[0].title}** from the queue.`
      );
    } else {
      return message.channel.send(`Usage: ${message.client.prefix}remove <Queue Number>`);
    }
  }
};
