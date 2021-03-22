const chalk = require("chalk");
const mongoose = require("mongoose");
const { MONGO_URL } = require("../util/sharkyUtil");

module.exports = (client) => {
  let allMembers = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.members.cache.forEach((member) => {
      allMembers.add(member.user.id);
    });
  });

  let statuses = [
    `@YMF8 | ${client.guilds.cache.size} servers 🎉`,
    `@YMF8 | ${allMembers.size} members 🥂`,
    
  ];
  let index = 0;
  let nums = [0, 1];
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

  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(console.log(chalk.bgRedBright.black(` TMB8 connected to Mongo DB! `)))
    .catch((err) =>
      console.log(chalk.bgRed.black(` Unable to connect to Mongo DB! `))
    );
};
