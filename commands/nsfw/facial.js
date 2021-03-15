const Util = require("../../util/MitUtil.js");
const request = require("request");
const { nonsfw } = require("../../util messages/nsfw");
let subreddit = ["FacialFun"];

module.exports = {
  name: "facial",
  description: "Sends a random facial picture",
  aliases: ["facialfun", "cumface"],
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
