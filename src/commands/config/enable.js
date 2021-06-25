const cmdModel = require("../../models/nocmd");
const setup = require("../../models/setup");
const guard = require("../../models/guard");

module.exports = {
  name: "enable",
  description:
    "Enable functions like suggestions or commands previously disabled",
  subCommands: ["logs", "anti-invites", "anti-bad-links"],
  botPerms: ["USE_EXTERNAL_EMOJIS"],
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args) {

    const type = args[0]?.toLowerCase();
    const input = args.slice(1).join(" ");
    const query = input.toLowerCase();
    if (!type)
      return message.reply(
        "What you want to enable? (logs, anti-invites, anti-bad-links)"
      );
    const channels = message.mentions.channels.first() || message.channel;
    const channel = channels.id;

    const sb = await setup.findOne({
      Guild: message.guild.id,
    });

    let gu = await guard.findOne({
      Guild: message.guild.id,
    });

    if (type === "channel") {
      if (!query) {
        return message.reply(
          "Please type the type of channel you want to set (level up, suggestions...)"
        );
      }

      if (query === "logs") {
        const logged = sb.Sgchannel;

        if (logged) {
          sb.Logchannel = channel;

          await sb.save().catch((err) => console.log(err));
          message.reply(
            `<a:sh_clap:839512083761987604> Logs have been moved to <#${channel}>`
          );
        } else {
          sb.Logchannel = channel;

          await sb.save().catch((err) => console.log(err));
          message.reply(
            `<a:sh_clap:839512083761987604> Logs have been enabled in <#${channel}>`
          );
        }
      }
    }

    if (type === "command") {
      if (!query) {
        return message.reply("Please type the command you want to enable");
      }

      const { commands } = message.client;

      const command =
        commands.get(query) ||
        commands.find((c) => c.aliases && c.aliases.includes(query));

      if (!command) {
        return message.reply("that's not a valid command!");
      }

      const cmDoc = await cmdModel.findOne({
        Guild: message.guild.id,
        Command: query,
      });

      if (cmDoc) {
        await cmdModel.findOneAndDelete({
          Guild: message.guild.id,
          Command: query,
        });

        message.reply(
          `<a:sh_clap:839512083761987604> The command \`${query}\` has been enabled!`
        );
      } else {
        return message.reply("That command is not disabled!");
      }
    }

    if (type === "anti-invites") {
      if (gu) {
        const mongo = gu.Invites;

        if (mongo === true) {
          return message.channel.send(
            "Anti invites is alredy enabled in this server"
          );
        } else {
          gu.Invites = true;
          await gu.save().catch((e) => console.log(e));
          return message.reply("Succesfully enabled anti invites!");
        }
      } else {
        let newGuard = new guard({
          Guild: message.guild.id,
          Invites: true,
        });
        await newGuard.save().catch((e) => console.log(e));
        return message.reply("Succesfully enabled anti invites!");
      }
    }
    if (type === "anti-bad-links") {
      if (gu) {
        const mongo = gu.Links;

        if (mongo === true) {
          return message.channel.send(
            "Anti bad links is alredy enabled in this server"
          );
        } else {
          gu.Links = true;
          await gu.save().catch((e) => console.log(e));
          return message.reply("Succesfully enabled anti bad links!");
        }
      } else {
        let newGuard = new guard({
          Guild: message.guild.id,
          Links: true,
        });
        await newGuard.save().catch((e) => console.log(e));
        return message.reply("Succesfully enabled anti bad links!");
      }
    }
  },
};
