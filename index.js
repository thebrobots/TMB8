const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });
const chalk = require("chalk");
const { TOKEN, PREFIX } = require("./util/sharkyUtil");

client.on("ready", () => {

  let statuses = [
    `revamping`,
    `new features`,
    `don't kick me`,
    `better than ever`,
  ];
  
  let index = 0;
  let nums = [0, 1, 2, 3];
  setInterval(() => {
    client.user.setActivity(statuses[index], { type: "WATCHING" });
    index = nums[index + 1] ? index + 1 : 0;
  }, 30000);

  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);

  console.log(
    chalk.bgYellowBright.black(
      ` ${client.user.username} online and ready to serve ${client.guilds.cache.size} servers! `
    )
  );
  
});

client.login(TOKEN);
