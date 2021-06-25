const chalk = require("chalk");
const mongoose = require("mongoose");
 const fetch = require("node-fetch");
module.exports = (client) => {
 setInterval(() => {
  let statuses = [
    `@TMB8 | ${client.guilds.cache.size} servers 🎉`,
    `@TMB8 | v2.0`,
    `Invite my bro! | y/invite`,
  ];

  let index = 0;
  let nums = [0, 1];
  setInterval(() => {
    client.user.setActivity(statuses[index], { type: "WATCHING" });
    index = nums[index + 1] ? index + 1 : 0;
  }, 30000);
}, 300000)
  console.log(
    chalk.bgYellowBright.black(
      ` ${client.user.username} online and ready to serve ${client.guilds.cache.size} servers! `
    )
  );
  mongoose
    .connect(process.env.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(console.log(chalk.bgRedBright.black(` ${client.user.username} connected to Mongo DB! `)))
    .catch((err) =>
      console.log(chalk.bgRed.black(` Unable to connect to Mongo DB! `))
    );
  
  /*
 setInterval(() => {
  let allMembers = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.members.cache.forEach((member) => {
      allMembers.add(member.user.id);
    });
  });
  
  fetch("https://top.gg/api//bots/800074066949832714/stats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwMDA3NDA2Njk0OTgzMjcxNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE2MDk2NjgyfQ.xPq_ioJ14Xj2rvOfl-9qYxoDnUznBQ_ZYQMojFqw4PE",
    },
    body: JSON.stringify({ server_count: client.guilds.cache.size }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .then(console.log("posted stats to topgg"));
  fetch("https://space-bot-list.xyz/api/bots/800074066949832714", {
    method: "POST",
    headers: {
      Authorization: "atJCiI68Z0VeuUAsk3rudckWcBVlNWNpbwsoaBv3FvSWgg-NzC",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      guilds: client.guilds.cache.size,
      users: allMembers.size,
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .then(console.log("posted stats to space bots"));
  fetch("https://discord.bots.gg/api/v1/bots/800074066949832714/stats", {
    method: "POST",
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGkiOnRydWUsImlkIjoiNTIxMzExMDUwMTkzNDM2NjgyIiwiaWF0IjoxNjE3ODkxMDkzfQ.X6Jjvlxf9MsSQ0lf5A_9QVDOf-OR1BnVV7rQXEjdEu4",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ guildCount: client.guilds.cache.size }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .then(console.log("posted stats to discord bots"));
  fetch("https://api.infinitybotlist.com/bot/800074066949832714", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
      authorization:
        "uFH3YWFu8RekGoH8evrE5KG4evFlNb3ScNVAYs6OFjsvfVT2SLBjUI8p2j6IEPoguvb5uUURqcJCnO7qE8aglpjeVjcFCDcizL7j",
    },
    body: JSON.stringify({ servers: client.guilds.cache.size, shards: 1 }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .then(console.log("posted stats to infinity bot list"));
}, 900000);
*/
};
