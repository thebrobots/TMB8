const Util = require("../../util/MitUtil.js");
const request = require("request");
const { nonsfw } = require("../../util messages/nsfw");
let subreddit = [
  "Boobies",
  "TittyDrop",
  "boobbounce",
  "boobs",
  "homegrowntits",
  "tits",
  "handbra",
  "PerfectTits",
];

module.exports = {
  name: "boobs",
  description: "Sends a random picture of tits",
  aliases: ["boob", "tits"],
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
