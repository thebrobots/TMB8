require("dotenv").config({ path: "src/.env" });

const { Client, Collection, Intents } = require("discord.js");
const client = new Client({
  allowedMentions: { parse: ["users", "roles"] },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

const { loadCommands } = require("./utilities/loadcmds.js");
const { loadEmojis } = require("./utilities/loademojis.js");
const { loadEvents } = require("./utilities/loadevents.js");

const { prefix, support_server, tmb8_invite } = require("./json/config.json");

require("./functions/checkmute")(client);

client.login(process.env.token);

client.prefix = prefix;
client.invite = tmb8_invite;
client.support = support_server;
client.queue = new Map();
client.commands = new Collection();
client.myemojis = new Collection();

loadCommands(client);
loadEvents(client);
loadEmojis(client);

process.on("unhandledRejection", console.error);