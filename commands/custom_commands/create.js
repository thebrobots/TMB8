const cmdModel = require("../../models/ccommands");

module.exports = {
  name: "cc-create",
  aliases: ["ccc"],
  async execute(client, message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER"))
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );

    const name = args[0];
    const response = args.slice(1).join(" ");

    if (!name) return message.channel.send("Please specify a command name");
    if (!response) return message.channel.send("Please specify a response");

    const data = await cmdModel.findOne({
      Guild: message.guild.id,
      Command: name,
    });

    if (data)
      return message.channel.send("This custom command already exists!");

    const newData = new cmdModel({
      Guild: message.guild.id,
      Command: name,
      Response: response,
    });
    await newData.save();
    message.channel.send(`Saved **${name}** as a custom command!`);
  },
};
