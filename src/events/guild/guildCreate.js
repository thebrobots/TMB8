const setup = require('../../models/setup') 
const { MessageEmbed } = require("discord.js");

module.exports = async (guild, client) => {

  const sb = new setup({
    Guild: guild.id,
    Prefix: 'y/',
    Pruning: false,
  })

  await sb.save().catch((err) => console.log(err));

  let p = client.prefix;

  var channel = guild.channels.cache
    .filter((chx) => chx.type === "text")
    .find((x) => x.position === 0);
  let newEmbed = new MessageEmbed()
    .setColor("#FF2C4B")
    .setTitle(
      "Thanks for inviting me into this server <a:sh_like:812742588439593000>"
    )
    .setDescription(
      `- My default prefix is \`${p}\`\r\n\r\n- To change my prefix type \`${p}prefix <prefix>\`\r\n\r\n- Type \`${p}help\` to get a list of avaliable commands\r\n\r\n- Feel free to join our support server if you need help [Click here!!](${client.support})\r\n\r\n*Note: this is the first upload of the bot. Lots of features are coming in next updates, and you can also suggest or report thing using \`${p}bot suggest\` or \`${p}bot suggest\``
    );
  channel.send(newEmbed);

 console.log(
   `server: ${guild} | action: join | blacklisted: false | data: created`
 );
};
