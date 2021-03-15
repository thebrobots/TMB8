const prefixModel = require("../../models/prefix");
const { Message } = require("discord.js");

module.exports = {
  name: "prefix",
  aliases: ["setprefix"],
  Description: "Change the server's prefix",
  /**
   * @param {Message} message
   */
  async execute(client, message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER"))
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );

    const res = await args.join(" ");
    if (!res)
      return message.channel.send("Please specify a prefix to change to.");

    await prefixModel.findOne(
      { Guild: message.guild.id },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          await prefixModel.findOneAndDelete({
            Guild: message.guild.id,
          });
          data = new prefixModel({
            Guild: message.guild.id,
            Prefix: res,
          });
          await data.save().catch((err) => console.log(err));
          message.channel.send(`The prefix has been set to \`${res}\` `);
        } else {
          data = new prefixModel({
            Guild: message.guild.id,
            Prefix: res,
          });
          await data.save().catch((err) => console.log(err));
          message.channel.send(`The prefix has been set to \`${res}\` `);
        }
      }
    );
  },
};
