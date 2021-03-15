const Util = require("../../util/MitUtil.js");
const superagent = require("superagent");
const { nonsfw } = require("../../util messages/nsfw");
module.exports = {
  name: "anal",
  description: "Sends a random anal images",
  aliases: ["butthole"],
  usage: "",
  cooldown: 2,
  args: 0,
  catergory: "NSFW",
  async execute(client, message, args) {
    if (!message.channel.nsfw) {
      return nonsfw(message);
    }

    superagent
      .get("https://nekobot.xyz/api/image")
      .query({ type: "anal" })
      .end((err, response) => {
        return message.channel.send({
          embed: {
            title: "🍑",
            image: {
              url: response.body.message,
            },
            color: "#FF2C4B",
          },
        });
      });
  },
};
