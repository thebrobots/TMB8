const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });
const { loadCommands } = require("./commandLoader");
const { TOKEN, PREFIX } = require("./util/sharkyUtil");
const express = require("express");

require("./util/eventLoader")(client);
require("./util/nqn")(client);
require("./util/muteHelper")(client);

const app = express();
const cors = require("cors");
const port = 8080;
const chalk = require("chalk");

app.use(cors());

app.get("/bot/guilds", (req, res) => {
  let guild = client.guilds.cache.size;
  res.json(guild);
});

app.get("/bot/users", (req, res) => {
  let members = client.users.cache.size;
  res.json(members);
});

app.get("/bot/channels", (req, res) => {
  let channels = client.channels.cache.size;
  res.json(channels);
});
app.listen(port, () => {
  console.log(
    chalk.bgBlueBright.black(` YMF8 is listening to http://localhost:${port} `)
  );
});

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();

loadCommands(client);
