const Util = require("../../util/MitUtil.js");
const request = require("request");
const { nonsfw } = require("../../util messages/nsfw");
let subreddit = ["cat_girls", "fursuitsex", "sexybunnies", "furryfemdom"];

module.exports = {
  name: "furry",
  description: "Sends a random furry images",
  aliases: ["furries"],
  usage: "",
  cooldown: 2,
  args: 0,
  catergory: "NSFW",
  async execute(client, message, args) {
    try {
      if (!message.channel.nsfw) {
        return nonsfw(message);
      } else {
        Util.subredditimage(subreddit, message);
      }
    } catch (err) {
      console.log(err);
      return message.reply(`Oh no, an error occurred. Try again later!`);
    }
  },
};
