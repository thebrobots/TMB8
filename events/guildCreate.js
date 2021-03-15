const config = require("../config.json");
const { PREFIX } = require("../util/sharkyUtil");
const { MessageEmbed } = require("discord.js");

module.exports = (guild) => {
 let found = 0;
    guild.channels.cache.map((c) => {
        if (found === 0) {
          if (c.type === "text") {
            if (c.permissionsFor(guild.me).has("VIEW_CHANNEL") === true) {
              if (c.permissionsFor(guild.me).has("SEND_MESSAGES") === true) {
                if (c.permissionsFor(guild.me).has("EMBED_LINKS") === true) {
                  if (c.permissionsFor(guild.me).has("USE_EXTERNAL_EMOJIS") === true) {
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
  c.send(newEmbed);
                
                found = 1;
              }
            }
          }
        }
      }
    }
      });
  
};
