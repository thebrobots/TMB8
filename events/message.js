const { PREFIX } = require("../util/sharkyUtil");

module.exports = async (message, cooldowns) => {
  const Discord = require("discord.js");
  const request = require("node-superfetch");
  const prefixModel = require("../models/prefix");

  let client = message.client;

  // messages counter
  const msgModel = require("../models/messages");

  const msgDoc = await msgModel.findOne({
    guildID: message.guild.id,
    memberID: message.author.id,
  });

  if (!msgDoc) {
    const newUser = new msgModel({
      guildID: message.guild.id,
      memberID: message.author.id,
      messages: 1,
    });

    await newUser.save().catch((e) => console.log(`Failed to save new user.`));
  } else {
    msgDoc.messages += 1;

    await msgDoc
      .save()
      .catch((e) => console.log(`Failed to save a member's messages: ${e}`));
  }

  if(msgDoc) {
  const msgss = msgDoc.messages
  if (msgss === 100) {
    const { body } = await request.get(
      "https://ybf8-mcgen.herokuapp.com/a.php?i=19&h=Unlocked+Badge%21&t=Bronze+messager"
    );

    const attach = new Discord.MessageAttachment(body, "achiev.png");
    message.reply(attach);
  }

  if (msgss === 500) {
    const { body } = await request.get(
      "https://ybf8-mcgen.herokuapp.com/a.php?i=22&h=Unlocked+Badge%21&t=Silver+messager"
    );

    const attach = new Discord.MessageAttachment(body, "achiev.png");
    message.reply(attach);
  }

  if (msgss === 1000) {
    const { body } = await request.get(
      "https://ybf8-mcgen.herokuapp.com/a.php?i=23&h=Unlocked+Badge%21&t=Golden+messager"
    );

    const attach = new Discord.MessageAttachment(body, "achiev.png");
    message.reply(attach);
  }

  if (msgss === 5000) {
    const { body } = await request.get(
      "https://ybf8-mcgen.herokuapp.com/a.php?i=2&h=Unlocked+Badge%21&t=Diamond+messager"
    );

    const attach = new Discord.MessageAttachment(body, "achiev.png");
    message.reply(attach);
  }
  }
  
  let custom;

  const data = await prefixModel
    .findOne({ Guild: message.guild.id })
    .catch((err) => console.log(err));

  if (data) {
    custom = data.Prefix;
  } else {
    custom = PREFIX;
  }

  let p = custom;

  if (message.content.startsWith(`<@${message.client.user.id}>`)) {
    return message.channel.send(
      `My prefix in this server is \`${p}\`\n\nTo get a list of commands, type \`${p}help\``
    );
  }

  if (message.author.bot) return;
  if (!message.guild) return;

  if (!message.content.startsWith(p)) return;

  const args = message.content.substring(p.length).trim().split(" ");
  const commandName = args.shift().toLowerCase();
  const { MONGO_URL } = require("../util/sharkyUtil");

  //leveling system
  const Levels = require("discord-xp");
  Levels.setURL(MONGO_URL);

  const randomXp = Math.floor(Math.random() * 29) + 1;
  const hasLeveledUp = await Levels.appendXp(
    message.author.id,
    message.guild.id,
    randomXp
  );
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    const { body } = await request.get(
      `https://ybf8-mcgen.herokuapp.com/a.php?i=40&h=Level+up%21&t=You+are+now+level+${user.level}%21`
    );

    const attach = new Discord.MessageAttachment(body, "levelUp.png");
    message.reply(attach);
  }

  // economy system
  const moneyModel = require("../models/money");

  client.bal = async (guild, id) =>
    new Promise(async (ful) => {
      const data = await moneyModel.findOne({ guild, id });
      if (!data) return ful(0);
      ful(data.money);
    });

  client.add = async (guild, id, money) => {
    await moneyModel.findOne({ guild, id }),
      async (err, data) => {
        if (err) throw err;
        if (data) {
          data.money += money;
          await data.save();
        } else {
          data = new moneyModel({ guild, id, money });
          await data.save();
        }
      };
  };

  client.rmv = async (guild, id, money) => {
    await moneyModel.findOne({ guild, id }),
      async (err, data) => {
        if (err) throw err;
        if (data) {
          data.money -= money;
        } else {
          return message.channel.send("That member doesn't have any money :/");
        }
        await data.save();
      };
  };

  // custom commands
  const cmdModel = require("../models/ccommands");

  const ccmds = await cmdModel.findOne({
    Guild: message.guild.id,
    Command: commandName,
  });

  if (ccmds) message.channel.send(ccmds.Response);

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;

      function readTime(t) {
        let s = t % 60;
        t -= s;
        let m = (t / 60) % 60;
        t -= m * 60;
        let h = (t / 3600) % 24;

        if (m <= 0) {
          return `${s} seconds`;
        } else if (h <= 0) {
          return `${m} min`;
        } else {
          return `${h}h`;
        }
      }
      const tleft1 = Math.round(timeLeft.toFixed(3));
      let tleft = readTime(tleft1);

      return message.channel
        .send(`Please wait ${tleft} before using \`${command.name}\` again.`)
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(client, message, args, cooldowns);
  } catch (error) {
    console.error(error);
    message.channel
      .send("There was an error executing that command.")
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      })
      .catch(console.error);
  }
};
