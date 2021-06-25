const links = require("../../json/websites.json");
module.exports = {
  name: "test",
  async execute(client, message, args) {
    for (const key of links) {
      if (message.content.includes(key)) {
        message.channel.send("found");
      }
    }
  },
};
