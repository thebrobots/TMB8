const cmdModel = require("../../models/nocmd");
const setup = require("../../models/setup");

module.exports = {
  name: "disable",
  description: "disable a previous set channel or a command",
  subCommands: ["logs", "anti-invites", "anti-bad-links"],
  botPerms: ["USE_EXTERNAL_EMOJIS"],
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args) {

    const type = args[0]?.toLowerCase();
    const input = args.slice(1).join(" ");
    const query = input.toLowerCase();

    const sb = await setup.findOne({
      Guild: message.guild.id,
    });

    if (!type) {
      return message.reply("Please specify what you want to disable!");
    }

    if (type === "channel") {
      if (!query) {
        return message.reply(
          "Please specify what channel you want to disable (suggesstions, level up...)"
        );
      }

      if (query === "levelup") {
        if (sb) {
          const lvl = sb.Lvlchannel;
          if (lvl) {
            await setup.updateOne(
              {
                Guild: message.guild.id,
              },
              { $unset: { Lvlchannel: "" } }
            );

            message.reply(
              `<a:sh_clap:839512083761987604> Level up channel has been disabled in this server`
            );
          } else {
            message.reply(`Level up channel is not enabled in this server`);
          }
        }
      }

      if (query === "suggestions") {
        if (sb) {
          const sgs = sb.Sgchannel;
          if (sgs) {
            await setup.updateOne(
              {
                Guild: message.guild.id,
              },
              { $unset: { Sgchannel: "" } }
            );

            message.reply(
              `<a:sh_clap:839512083761987604> Suggestions have been disabled in this server`
            );
          } else {
            message.reply(`Suggestions are not enabled in this server`);
          }
        }
      }

      if (query === "logs") {
        if (sb) {
          const logged = sb.Logchannel;
          if (logged) {
            await setup.updateOne(
              {
                Guild: message.guild.id,
              },
              { $unset: { Logchannel: "" } }
            );

            message.reply(
              `<a:sh_clap:839512083761987604> Logs have been disabled in this server`
            );
          } else {
            message.reply(`Logs are not enabled in this server`);
          }
        }
      }

      if (query === "chatbot") {
        if (sb) {
          const chb = sb.Cbchannel;
          if (chb) {
            await setup.updateOne(
              {
                Guild: message.guild.id,
              },
              { $unset: { Cbchannel: "" } }
            );

            message.reply(
              `<a:sh_clap:839512083761987604> Chatbot has been disabled in this server`
            );
          } else {
            message.reply(`Chatbot is not enabled in this server`);
          }
        }
      }
    }

    if (type === "command") {
      if (!query) {
        return message.reply("Please specify what command you want to disable");
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
        return message.reply("That command is alredy disabled!");
      } else {
        let newDoc = new cmdModel({
          Guild: message.guild.id,
          Command: query,
        });

        await newDoc.save().catch((err) => console.log(err));
        message.reply(
          `<a:sh_clap:839512083761987604> The command \`${query}\` has been disabled`
        );
      }
    }
  },
};
