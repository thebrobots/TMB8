const config = require("../config.json");
const { PREFIX } = require("../util/sharkyUtil");
const { MessageEmbed } = require("discord.js");

module.exports = (guild) => {
  var channel = guild.channels.cache
    .filter((chx) => chx.type === "text")
    .find((x) => x.position === 0);
  let newEmbed = new MessageEmbed()
    .setColor("#FF2C4B")
    .setTitle(
      "Thanks for inviting me into this server <a:sh_like:812742588439593000>"
    )
    .setURL("")
    .setDescription(
      `- My default prefix is \`${PREFIX}\`\r\n\r\n- To change my prefix type \`${PREFIX}prefix <prefix>\`\r\n\r\n- Type \`${PREFIX}help\` to get a list of avaliable commands\r\n\r\n- Feel free to join our support server if you need help [Click here!!](https://discord.com/invite/J8RNPvsKPc)`
    )
    .setImage("")
    .setFooter("");
  channel.send(newEmbed);
};
