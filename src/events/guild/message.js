module.exports = async (message, cooldowns) => {
  const Discord = require("discord.js");

  const setup = require("../../models/setup");

  if (message.author.bot) return;
  if (!message.guild) return;

  const sb = await setup.findOne({ Guild: message.guild.id });

  if (!sb) {
    const newServer = new setup({
      Guild: message.guild.id,
      Prefix: "y/",
      Pruning: false,
    });

    await newServer.save().catch((err) => console.log(err));
  }

  let client = message.client;

  // prefix definition
  let p = sb ? sb.Prefix : client.prefix;

  if (!message.content.startsWith(p)) return;

  const args = message.content.substring(p.length).trim().split(" ");
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;
  
  // user permissions handler
  if (!message.member.permissions.has(command.userPerms || []))
    return message.reply(
      "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
    );

  // bot permissions handler
  if (!message.guild.me.permissions.has(command.botPerms || []))
    return message.reply(
      `Ups :/  I need ${command.botPerms} to run this command correctly`
    );

  // disabled commands
  const cdmdModel = require("../../models/nocmd");

  const cmDoc = await cdmdModel.findOne({
    Guild: message.guild.id,
    Command: command.name,
  });

  if (cmDoc) return;

  // cooldowns
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
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    // async execute(client, message, args, prefix)
    command.execute(client, message, args, p, cooldowns);
  } catch (error) {
    console.error(error);
    message.channel
      .send("There was an error executing that command.")
      .then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      })
      .catch(console.error);
  }
};
