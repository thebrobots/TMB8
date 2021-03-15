const { MessageEmbed } = require("discord.js");

module.exports = {
  async nonsfw(message) {
    let newEmbed = new MessageEmbed()
      .setTitle("EY EY EY... NO NSFW HERE!")
      .setColor("#FF2C4B")
      .setDescription(
        "Use NSFW commands in a NSFW channel (look in channel settings)"
      )
      .setImage("https://i.imgur.com/oe4iK5i.gif");
    return message.channel.send(newEmbed).then(msg => {
      msg.delete({timeout: 5000})
    })
  },
};
