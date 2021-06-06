const chalk = require("chalk");
const mongoose = require("mongoose");
const { MONGO_URL } = require("../util/sharkyUtil");
 const fetch = require("node-fetch");
module.exports = (client) => {
 setInterval(() => {
  let statuses = [
    `@TMB8 | ${client.guilds.cache.size} servers 🎉`,
    `@TMB8 | v21.0`,
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
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(console.log(chalk.bgRedBright.black(` ${client.user.username} connected to Mongo DB! `)))
    .catch((err) =>
      console.log(err)
    );
};
