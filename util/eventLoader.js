const reqEvent = (event) => require(`../events/${event}`);
const Discord = require("discord.js");
module.exports = (client) => {
  const cooldowns = new Discord.Collection();
  client.on("ready", () => reqEvent("ready")(client));
  client.on("message", (m) => reqEvent("message")(m, cooldowns));
  client.on("guildCreate", reqEvent("guildCreate"));
  client.on("guildDelete", reqEvent("guildDelete"));
};
