const clientEvent = (event) => require(`../events/client/${event}`);
const guildEvent = (event) => require(`../events/guild/${event}`);
const otherEvent = (event) => require(`../events/other/${event}`);
const Discord = require("discord.js");

function loadEvents(client) {
  const cooldowns = new Discord.Collection();
  const inVoice = new Discord.Collection();

  // client events
  client.on("ready", () => clientEvent("ready")(client));
  client.on("message", (m) => clientEvent("mention")(m, client));

  // guild events
  client.on("message", (m) => guildEvent("message")(m, cooldowns));
  client.on("guildCreate", (g) => guildEvent("guildCreate")(g, client));
  client.on("guildDelete", guildEvent("guildDelete"));
  client.on("guildMemberAdd", guildEvent("guildMemberAdd"));
  client.on("guildMemberRemove", guildEvent("guildMemberRemove"));
  client.on("voiceStateUpdate", (os, ns) =>
    guildEvent("voiceStateUpdate")(os, ns)
  );

  // other events
  client.on("message", otherEvent("invites"));
  client.on("message", otherEvent("badurl"));
  client.on("message", otherEvent("badwords"));

  // warnings and errors
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
}

module.exports = {
  loadEvents,
};
