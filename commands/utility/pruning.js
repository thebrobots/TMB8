const fs = require("fs");
let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

module.exports = {
  name: "pruning",
  description: "Toggle pruning of bot messages",
  execute(client, message, args) {
    if (!config) return;
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel
          .send(
            "<:sh_delete:799677313762983986> There was an error writing to the file."
          )
          .catch(console.error);
      }

      return message.channel
        .send(
          `<:sh_clear:799392396517310464> Message pruning is ${
            config.PRUNING ? "**enabled**" : "**disabled**"
          }`
        )
        .catch(console.error);
    });
  },
};
