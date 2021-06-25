const { MessageEmbed } = require("discord.js");
const help = require("../../json/helpMsgs.json");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  async execute(client, message, args, prefix) {
    if (!message.guild.me.permissions.has("ADD_REACTIONS" || "EMBED_LINKS")) {
      return message.channel.send(
        "Please make sure I have permission to `ADD_REACTIONS` and `EMBED_LINKS`"
      );
    }

    let pr = prefix

    await message.delete();

    if (!args[0]) {
      let embed = new MessageEmbed()
        .setTitle("TMB8 commands")
        .setColor("#FF2C4B")
        .setDescription("React with the emoji of your choice")
        .addFields(
          {
            name: "<:sh_mods:813491189780971542> Moderation commands",
            value: `\u200b`,
            inline: true,
          },
          {
            name: "<:sh_np:812824625720590367> Music commands",
            value: `\u200b`,
            inline: true,
          },
          {
            name: "<:sh_utils:813491190069461082> Useful commands",
            value: `\u200b`,
            inline: true,
          },
          {
            name: "<:sh_config:813491189705736333> Config commands",
            value: `\u200b`,
            inline: true,
          },
          {
            name: "<:sh_ymf8:820734376894529537> Other commands",
            value: `\u200b`,
            inline: true,
          }
        );

      var helpMessage = await message.channel.send(embed);

      helpMessage.react("<:sh_mods:813491189780971542>");
      helpMessage.react("<:sh_np:812824625720590367>");
      helpMessage.react("<:sh_utils:813491190069461082>");
      helpMessage.react("<:sh_config:813491189705736333>");
      helpMessage.react("<:sh_ymf8:820734376894529537>");

      const filter = (reaction, user) =>
        user.id !== message.client.user.id && user.id == message.author.id;
      var collector = helpMessage.createReactionCollector(filter, {
        time: 180000,
      });

      collector.on("collect", async (reaction, user) => {
        const member = message.guild.members.cache.get(user.id);

        switch (reaction.emoji.name) {
          case "sh_mods":
            reaction.users.remove(member).catch(console.error);

            let modsMessage = new MessageEmbed()
              .setColor("#FF2C4B")
              .setTitle("<:sh_mods:813491189780971542> Moderation commands")
              .setDescription(
                "Moderation commands are used to keep the server safe and clean!"
              )
              .addField("available commands", help.helpMsg1)
              .addField(
                `\u200b`,
                `Type \`${pr}help <command>\` to get detailed info about that command`
              );
            await helpMessage.edit(modsMessage);

            break;

          case "sh_np":
            reaction.users.remove(member).catch(console.error);
            let musicMessage = new MessageEmbed()
              .setColor("#FF2C4B")
              .setTitle("<:sh_np:812824625720590367> Music commands")
              .setDescription(
                `Music commands are used to play songs in a voice channel!\rMusic commands have been fixed, but if you find any issue please use \`${prefix}bot report\` to send the issue`
              )
              .addField("available commands", help.helpMsg2)
              .addField(
                `\u200b`,
                `Type \`${pr}help <command>\` to get detailed info about that command`
              );
            await helpMessage.edit(musicMessage);

            break;
    
          case "sh_utils":
            reaction.users.remove(member).catch(console.error);
            let usefulMessage = new MessageEmbed()
              .setColor("#FF2C4B")
              .setTitle("<:sh_utils:813491190069461082> Useful commands")
              .setDescription(
                "Useful commands are used to get info about someone, translating something..."
              )
              .addField("available commands", help.helpMsg3)
              .addField(
                `\u200b`,
                `Type \`${pr}help <command>\` to get detailed info about that command`
              );
            await helpMessage.edit(usefulMessage);

            break;

          case "sh_config":
            reaction.users.remove(member).catch(console.error);
            let configMessage = new MessageEmbed()
              .setColor("#FF2C4B")
              .setTitle("<:sh_config:813491189705736333> Config commands")
              .setDescription(
                "Config commands are used to garant a better experience of the bot in the server!"
              )
              .addField("available commands", help.helpMsg4)
              .addField(
                `\u200b`,
                `Type \`${pr}help <command>\` to get detailed info about that command`
              );
            await helpMessage.edit(configMessage);

            break;

          case "sh_ymf8":
            reaction.users.remove(member).catch(console.error);
            let otherMessage = new MessageEmbed()
              .setColor("#FF2C4B")
              .setTitle("<:sh_ymf8:820734376894529537> Other commands")
              .setDescription(
                "Other commands are used to get info about the bot,inviting it to other server..."
              )
              .addField("available commands", help.helpMsg5)
              .addField(
                `\u200b`,
                `Type \`${pr}help <command>\` to get detailed info about that command`
              );
            await helpMessage.edit(otherMessage);

            break;

          default:
            reaction.users.remove(member).catch(console.error);
            break;
        }
      });

      collector.on("end", () => {
        if (helpMessage) {
          helpMessage.delete().catch(console.error);
        }
      });
    } else {
      const { commands } = message.client;

      const name = args[0].toLowerCase();
      const command =
        commands.get(name) ||
        commands.find((c) => c.aliases && c.aliases.includes(name));

      if (!command) {
        return message.reply("that's not a valid command!");
      }

      const embed = new MessageEmbed()
        .setTitle(command.name)
        .setColor("#FF2C4B")
        .setDescription(command.description);

      if (command.aliases) {
        embed.addField("Aliases", command.aliases);
      }
      if(command.subCommands) {
        embed.addField("Sub commands", command.subCommands)
      }
      if (command.cooldown) {
        embed.addField("Cooldown", `${command.cooldown} seconds`);
      } else {
        embed.addField("Cooldown", `3 seconds`);
      }

      embed.addField("Example", "soon...");

      message.channel.send(embed);
    }
  },
};
