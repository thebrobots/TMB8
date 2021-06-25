const fs = require("fs");

module.exports = {
  name: "reload",
  description: "Reloads a command",
  execute(client, message, args) {
    if (message.author.id !== "521311050193436682") return;

    if (!args.length) return message.channel.send(`Type a command to reload!`);
    const commandName = args[0].toLowerCase();
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command)
      return message.channel.send(`No \`${commandName}\` command found!`);

    const commandFolders = fs.readdirSync("./commands");
    const folderName = commandFolders.find((folder) =>
      fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`)
    );

    delete require.cache[
      require.resolve(`../${folderName}/${command.name}.js`)
    ];

    try {
      const newCommand = require(`../${folderName}/${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);
    } catch (error) {
      console.error(error);
      message.channel.send(
        `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
      );
    }

    message.channel.send(`Command \`${command.name}\` was reloaded!`);
  },
};
