const ms = require("ms");

module.exports = {
  name: "slowmode",
  aliases: ["slow"],
  description: "Slowing down the channel.",
  usage: "slowmode [channel] <time>",
  async execute(client, message, args) {
    if (!message.member.permissions.has(["MANAGE_CHANNELS"])) {
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );
    }

    let channel = message.mentions.channels.first(),
      time = args.slice(1).join(" ");

    if (!channel) (time = args.join(" ")), (channel = message.channel);

    if (args === "off") {
      channel.setRateLimitPerUser(0);
      return message.channel.send(
        `<#${channel.id}> slowmode has been disabled.`
      );
    }

    if (!time) return message.channel.send("Please include the time format.");

    let convert = ms(time);
    let toSecond = Math.floor(convert / 1000);

    if (!toSecond || toSecond == undefined)
      return message.channel.send("Please insert a valid time format!");

    if (toSecond > 21600)
      return message.channel.send(
        "Timer should be less than or equal to 6 hours."
      );
    else if (toSecond < 1)
      return message.channel.send(
        "Timer should be more than or equal to 1 second."
      );

    await channel.setRateLimitPerUser(toSecond);
    return message.channel.send(
      `Set the slowmode of <#${channel.id}> to **${ms(ms(time), {
        long: true,
      })}**.`
    );
  },
};
